const fs = require("fs");
const http = require('https');
const path = require("path");
const request = require(`request`);
const Discord = require("discord.js");

const currentTime = require("../events/time.js");
const log = require("../events/log.js");
const sendmail = require("../events/sendmail.js");

mattachment = null

module.exports = {
    name: 'mail',
    description: 'Send a spoofed email with discord!',
    execute(message, args) {
        message.reply("Please provide the recipients address.");
        log("-----------------------------------------------------------------------------------------");
        log(currentTime() + " " + message.author.tag + " has ran the mail command.");
        let filter = (m) => !m.author.bot;
        const collector = new Discord.MessageCollector(
            message.channel,
            (m) => m.author.id === message.author.id, { time: 1000000 }
        );

        var counter = 0;

        collector.on("collect", (message) => {
            if (message.content && counter == 0) {
                receiver = message.content;
                log(currentTime() + " " + message.author.tag + " - Mail Recipient Address: " + message.content);
                message.reply("Please provide a sender address.");
                counter++;
            }
            else if (message.content && counter == 1) {
                ssender = message.content;
                log(currentTime() + " " + message.author.tag + " - Mail Sender Address: " + message.content);
                message.reply("Please provide a sender name.");
                counter++;
            }
            else if (message.content && counter == 2) {
                message.reply("Please provide a subject.");
                nsender = message.content;
                log(currentTime() + " " + message.author.tag + " - Mail Sender Name: " + message.content);
                counter++;
            }
            else if (message.content && counter == 3) {
                message.reply("Please provide a message.");
                subject = message.content;
                log(currentTime() + " " + message.author.tag + " - Mail Subject: " + message.content);
                counter++;
            }
            else if (message.content && counter == 4) {
                log(currentTime() + " " + message.author.tag + " - Mail Message: " + message.content);

                var EventEmitter = require("events").EventEmitter;
                var body = new EventEmitter();

                if (message.content.includes("http")) {
                    request.get(message.content, function(error, response, data) {
                        if (!error && response.statusCode == 200) {
                            body.data = data;
                            body.emit('update');
                        }
                    });
                    body.on('update', function() {
                        mcontent = body.data
                    });
                }
                else {
                    mcontent = message.content;
                }

                message.reply('Would you like to add an attachment? (yes or no)')
                counter++;

            }
            else if (message.attachments.first() && counter == 4) {
                var EventEmitter = require("events").EventEmitter;
                var body = new EventEmitter();

                request.get(message.attachments.first().url, function(error, response, data) {
                    if (!error && response.statusCode == 200) {
                        body.data = data;
                        body.emit('update');
                    }
                });

                body.on('update', function() {
                    mcontent = body.data
                });

                log(currentTime() + " " + message.author.tag + " - Mail Message: " + message.attachments.first().url);

                message.reply("Would you like to add an attachment? (yes or no)")
                counter++;
            }
            else if (message.content && counter == 5) {
                log(currentTime() + " " + message.author.tag + " - Is there Attachment: " + message.content);

                if (message.content == 'yes') {
                    message.reply("Please provide an attachment.")
                    counter++;
                }
                else if (message.content == 'no') {
                    message.reply("How many times would you like to send this email?")
                    counter++;
                    counter++;
                }
                else {
                    message.reply('Invalid')
                }
            }
            else if (message.attachments.first() && counter == 6) {
                message.reply("How many times would you like to send this email?")
                log(currentTime() + " " + message.author.tag + " - Mail Attachment Url: " + message.attachments.first().url);

                mattachment = message.attachments.first().url
                counter++;
            }
            else if (message.content && counter == 6) {
                message.reply("How many times would you like to send this email?")
                log(currentTime() + " " + message.author.tag + " - Mail Attachment Url: " + message.content);
                mattachment = message.content
                counter++;
            }
            else if (counter == 7) {
                log(currentTime() + " " + message.author.tag + " - Is sending email " + message.content + " times ");
                unumberT = message.content
                numberT = 0
                while (numberT < unumberT) {
                    sendmail(mattachment, nsender, ssender, receiver, subject, mcontent);
                    numberT++;
                }
                if (numberT == unumberT) {
                    message.reply("Email(s) Sent!");

                    log(currentTime() + " " + message.author.tag + " - Sent Email");
                    collector.stop();
                    log(currentTime() + "Collector for - " + message.author.tag + " Ended!");
                }
                if (unumberT == 0) {
                    message.reply('No email sent!')
                    collector.stop();
                    log(currentTime() + " " + message.author.tag + " Cancelled Email!")
                    log(currentTime() + " Collector for - " + message.author.tag + " Ended!");
                }
            }
        });
    },
}
