const fs = require("fs");
const http = require('https');
const path = require("path");
const request = require(`request`);
const Discord = require("discord.js");
const nodemailer = require("nodemailer");
const { host, port, username, password, logging, logoutput } = require("../config.json");

mattachment = null

function log(message) {
   console.log(message);
   if (logging == "true"){
    fs.appendFileSync(logoutput, message + "\n");
   }
}

process.on( "SIGINT", function() {
    console.log("Goodbye!")
    log("-----------------------------------------------------------------------------------------");
    process.exit();
});

const currentTime = getDateTime();
function getDateTime() {
        var now     = new Date(); 
        var year    = now.getFullYear();
        var month   = now.getMonth()+1; 
        var day     = now.getDate();
        var hour    = now.getHours();
        var minute  = now.getMinutes();
        var second  = now.getSeconds(); 
        if(month.toString().length == 1) {
             month = '0'+month;
        }
        if(day.toString().length == 1) {
             day = '0'+day;
        }   
        if(hour.toString().length == 1) {
             hour = '0'+hour;
        }
        if(minute.toString().length == 1) {
             minute = '0'+minute;
        }
        if(second.toString().length == 1) {
             second = '0'+second;
        }   
        var dateTime = year+'/'+month+'/'+day+' '+hour+':'+minute+':'+second;   
         return dateTime;
}

async function sendmail() {
    let transporter = nodemailer.createTransport({
        host: host,
        port: port,
        secure: false, 
        auth: {
            user: username, 
            pass: password, 
         },
        tls: {rejectUnauthorized: false},
        pool: true,
    });
    if (mattachment == null) {
        let info = await transporter.sendMail({
            from: {              
                name: nsender,
                address: ssender,
            }, 
            to: receiver,
            subject: subject, 
            text: mcontent, 
            html: mcontent, 
        });
    } else {
        let info = await transporter.sendMail({
            from: {              
                name: nsender,
                address: ssender,
            }, 
            to: receiver,
            subject: subject, 
            text: mcontent, 
            html: mcontent, 
            attachments: {  
                path: mattachment, 
            }
        });
    }
}

module.exports = {
    name: 'mail',
    description: 'Send a spoofed email with discord!',
	execute(message, args) {
        message.reply("Please provide the recipients address.");
        log("-----------------------------------------------------------------------------------------");
        log(currentTime + " " + message.author.tag +" has ran the mail command.");
        let filter = (m) => !m.author.bot;
        const collector = new Discord.MessageCollector(
        message.channel,
        (m) => m.author.id === message.author.id,
        { time: 1000000 }
        );

        var counter = 0;

        collector.on("collect", (message) => {
            if (message.content && counter == 0) {
                receiver = message.content;
                log(currentTime + " " + message.author.tag +" - Mail Recipient Address: " + message.content);
                message.reply("Please provide a sender address.");
                counter++;
            } else if (message.content && counter == 1) {
                ssender = message.content;
                log(currentTime + " " + message.author.tag +" - Mail Sender Address: " + message.content);
                message.reply("Please provide a sender name.");
                counter++;
            } else if (message.content && counter == 2) {
                message.reply("Please provide a subject.");
                nsender = message.content;
                log(currentTime + " " + message.author.tag +" - Mail Sender Name: " + message.content);
                counter++;
            } else if (message.content && counter == 3) {
                message.reply("Please provide a message.");
                subject = message.content;
                log(currentTime + " " + message.author.tag +" - Mail Subject: " + message.content);
                counter++;
            } else if (message.content && counter == 4) {
                log(currentTime + " " + message.author.tag +" - Mail Message: " + message.content);

                var EventEmitter = require("events").EventEmitter;
                var body = new EventEmitter();

                if (message.content.includes("http")) {
                    request.get(message.content, function(error, response, data) {
                        if (!error && response.statusCode == 200) {
                        body.data = data;
                        body.emit('update');
                        }
                    });
                    body.on('update', function () {
                        mcontent = body.data
                    });
                }
                else {
                    mcontent = message.content;
                }

                message.reply('Would you like to add an attachment? (yes or no)')
                counter++;
                
            } else if (message.attachments.first() && counter == 4) {
				var EventEmitter = require("events").EventEmitter;
                var body = new EventEmitter();

				request.get(message.attachments.first().url, function(error, response, data) {
					if (!error && response.statusCode == 200) {
    				body.data = data;
    				body.emit('update');
    				}
                });
                
                body.on('update', function () {
                    mcontent = body.data
                });
                
                log(currentTime + " " + message.author.tag +" - Mail Message: " + message.attachments.first().url);

                message.reply("Would you like to add an attachment? (yes or no)")
                counter++;
              }
            else if (message.content && counter == 5) {
                log(currentTime + " " + message.author.tag +" - Is there Attachment: " + message.content);
            
                if (message.content == 'yes') {
                    message.reply("Please provide an attachment.")
                    counter++;
                } else if (message.content == 'no') {
                    message.reply("How many times would you like to send this email?")
                    counter++;
                    counter++;
                } else {
                    message.reply('Invalid')
                }
            } else if (message.attachments.first() && counter == 6) {
                message.reply("How many times would you like to send this email?")
                log(currentTime + " " + message.author.tag +" - Mail Attachment Url: " +message.attachments.first().url);

                mattachment = message.attachments.first().url
                counter++;
            } else if (message.content && counter == 6) {
                message.reply("How many times would you like to send this email?")
                log(currentTime + " " + message.author.tag +" - Mail Attachment Url: " +message.content);
                mattachment = message.content
                counter++;
            } else if (counter == 7) {
                log(currentTime + " " + message.author.tag +" - Is sending email " +message.content +" times ");
                unumberT = message.content
                numberT = 0
                while (numberT < unumberT) {
                    sendmail(mattachment)
                    numberT++;
                } if (numberT == unumberT) {
                    message.reply("Email(s) Sent!");

                    log("Sent Email With Nodemail!");
                    collector.stop();
                    log("Collecter Ended.");
                } if (unumberT == 0) {
                    message.reply('No email sent!') 
                    collector.stop();
                    log("User Cancelled!");
                    log("Collecter Ended.");
                } 
            } 
        });
	},
}
