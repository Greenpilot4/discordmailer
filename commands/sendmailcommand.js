const fs = require("fs");
const request = require(`request`);
const Discord = require("discord.js");
const http = require('https');
const { host, port, username, password, logging, logoutput } = require("../config.json");
const currentTime = getDateTime();
const nodemailer = require("nodemailer");

function log(message) {
   console.log(message);
   if (logging == "true"){
    fs.appendFileSync(logoutput, message + "\n");
   }
}

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



module.exports = {
    name: 'mail',
    description: 'Send a spoofed email with discord!',
	execute(message, args) {
	    message.reply("Please Enter The Recipients Address");
        log(currentTime + " " + message.author.tag +" has ran the mail command");
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
                message.reply("Recipient Set Please Provide A Sender Address");
                counter++;
            } else if (message.content && counter == 1) {
                ssender = message.content;
                log(currentTime + " " + message.author.tag +" - Mail Sender Address: " + message.content);
                message.reply("Sender Set Please Provide A Send Name");
                counter++;
            } else if (message.content && counter == 2) {
                message.reply("Sender Name Set Please Provide A Subject");
                nsender = message.content;
                log(currentTime + " " + message.author.tag +" - Mail Sender Name: " + message.content);
                counter++;
            } else if (message.content && counter == 3) {
                message.reply("Subject Set Please Provide A Message");
                subject = message.content;
                log(currentTime + " " + message.author.tag +" - Mail Subject: " + message.content);
                counter++;
            } else if (message.content && counter == 4) {
                mcontent = message.content;
                log(currentTime + " " + message.author.tag +" - Mail Message: " + mcontent);

                let transporter = nodemailer.createTransport({
                    host: host,
                    port: port,
                    secure: false,
                    auth: {
                    user: username,
                    pass: password,
                    },
                    tls: {rejectUnauthorized: false},
                    debug:true
                    });
                    let info = transporter.sendMail({
                    from: {
                        name: nsender,
                        address: ssender,
                    },
                    to: receiver,
                    subject: subject,
                    text: mcontent,
                    html: mcontent,
                    });

                message.reply("Email Sent!");
                log("Sent Email With Nodemail");
                collector.stop();
                log("Collecter Ended");
            } else if (message.attachments.first()) {
				var request = http.get(message.attachments.first().url, function(response) {
    				if (response.statusCode === 200) {
        				var file = fs.createWriteStream("./html_content/" + message.author.tag  + ".html");
        				response.pipe(file);
    				}
    				// Add timeout.
    				request.setTimeout(12000, function () {
        				request.abort();
    				});
				});

                log(currentTime + " " + message.author.tag +" - Mail Message: " + "html_content/" + message.author.tag +".html");

                let transporter = nodemailer.createTransport({
                    host: host,
                    port: port,
                    secure: false,
                    auth: {
                    user: username,
                    pass: password,
                    },
                    tls: {rejectUnauthorized: false},
                    debug:true
                    });
                    let info = transporter.sendMail({
                    from: {
                        name: nsender,
                        address: ssender,
                    },
                    to: receiver,
                    subject: subject,
                    text: fs.readFileSync("./html_content/" + message.author.tag  + ".html"),
                    html: fs.readFileSync("./html_content/" + message.author.tag  + ".html"),
                    });

                message.reply("Email Sent!");
                log("Sent Email With Nodemail");
                collector.stop();
                log("Collecter Ended");
              }
        });
	},
}
