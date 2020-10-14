const fs = require("fs");
const request = require(`request`);
const Discord = require("discord.js");
const { host, port, username, password } = require("../config.json");

const nodemailer = require("nodemailer");

module.exports = {
    name: 'mail',
    description: 'Send a spoofed email with discord!',
	execute(message, args) {
	    message.reply("Please Enter The Recipients Address");
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
                console.log(receiver);
                message.reply("Recipient Set Please Provide A Sender Address");
                counter++;
            } else if (message.content && counter == 1) {
                ssender = message.content;
                console.log(message.content);
                message.reply("Sender Set Please Provide A Subject");
                counter++;
            } else if (message.content && counter == 2) {
                message.reply("Sender Name Set Please Provide A Subject");
                nsender = message.content;
                console.log(message.content);
                counter++;
            }else if (message.content && counter == 3) {
                message.reply("Subject Set Please Provide A Message");
                subject = message.content;
                console.log(message.content);
                counter++;
            } else if (message.content && counter == 4) {
                    mcontent = message.content;
                    console.log(mcontent);
    
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
                    console.log("Sent Email With Nodemail");
                    collector.stop();
                    console.log("Collecter Ended");
                }
        });
	},
}