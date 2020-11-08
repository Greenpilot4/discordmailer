const currentTime = require("../events/time.js");
const log = require("../events/log.js");

module.exports = {
    name: 'passgen',
    description: 'Generates a random password',
    execute(message, args) {
        const plength = args[0] | "10";
        const randPassword = Array(plength).fill("!@$%^&*0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz").map(function(x) { return x[Math.floor(Math.random() * x.length)] }).join('');

        message.channel.send(randPassword);
        log(currentTime() + " " + message.author.tag + " Generated Password: " + randPassword);
    },
};
