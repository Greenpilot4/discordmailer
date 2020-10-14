const fs = require("fs");
const request = require(`request`);
const Discord = require("discord.js");
const { host, port, username, password, logging, logoutput } = require("../config.json");

const nodemailer = require("nodemailer");

function log(message) {
   console.log(message);
   if (logging == "true"){
    fs.appendFileSync(logoutput, message + "\n");
   }
}

module.exports = {
    name: 'mail',
    description: 'Send a spoofed email with discord!',
	execute(message, args) {
	    message.reply("Please Enter The Recipients Address");
        log(message.author.tag + " has ran the mail command");
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
                log(message.author.tag + " - Mail Recipient Address: " + message.content);
                message.reply("Recipient Set Please Provide A Sender Address");
                counter++;
            } else if (message.content && counter == 1) {
                ssender = message.content;
                log(message.author.tag + " - Mail Sender Address: " + message.content);
                message.reply("Sender Set Please Provide A Send Name");
                counter++;
            } else if (message.content && counter == 2) {
                message.reply("Sender Name Set Please Provide A Subject");
                nsender = message.content;
                log(message.author.tag + " - Mail Sender Name: " + message.content);
                counter++;
            }else if (message.content && counter == 3) {
                message.reply("Subject Set Please Provide A Message");
                subject = message.content;
                log(message.author.tag + " - Mail Subject: " + message.content);
                counter++;
            } else if (message.content && counter == 4) {
                    mcontent = message.content;
                    log(message.author.tag + " - Mail Message: " + mcontent);
    
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
                        html: mcontent,
                        });
    
                    message.reply("Email Sent!");
                    log("Sent Email With Nodemail");
                    collector.stop();
                    log("Collecter Ended");
                }
        });
	},
}
