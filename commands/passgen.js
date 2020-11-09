const fs = require("fs");
const { Client, MessageAttachment } = require('discord.js');

const currentTime = require("../events/time.js");
const log = require("../events/log.js");

module.exports = {
    name: 'passgen',
    description: 'Generates a random password',
    execute(message, args) {
        const plength = args[0] | "10";
        const randPassword = Array(plength).fill("!@$%^&*0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz").map(function(x) { return x[Math.floor(Math.random() * x.length)] }).join('');

        if (plength > "1994") {
            var buffer = Buffer.from(randPassword, "utf-8")
            const attachment = new MessageAttachment(buffer, "pass.txt");
            message.channel.send(attachment)
            log(currentTime() + " " + message.author.tag + " Generated Password: " + "More then 2000 characters!");
        }

        else {
            message.channel.send("```" + randPassword + "```");
            log(currentTime() + " " + message.author.tag + " Generated Password: " + randPassword);
        }
    },
};
