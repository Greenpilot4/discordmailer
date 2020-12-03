const { MessageAttachment } = require('discord.js');
const fs = require("fs");

exports.run = (client, message, args) => {
    const plength = args[0] | "10";
    const randPassword = Array(plength).fill("!@$%^&*0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz").map(function(x) { return x[Math.floor(Math.random() * x.length)] }).join('');

    if (plength > "1994") {
        var buffer = Buffer.from(randPassword, "utf-8")
        const attachment = new MessageAttachment(buffer, "pass.txt");
        message.channel.send(attachment)
        client.log(client.currentTime() + " " + message.author.tag + " Generated Password: " + "More then 2000 characters!");
    }

    else {
        message.channel.send("```" + randPassword + "```");
        client.log(client.currentTime() + " " + message.author.tag + " Generated Password: " + randPassword);
    }
}