const { Client, Collection } = require('discord.js');
const fs = require('fs');
const { token } = require("./config.json");

const client = new Client();

client.commands = new Collection();
client.log = require("./utils/log.js");
client.currentTime  = require("./utils/time.js");
client.sendmail = require("./utils/sendmail.js");

fs.readdir('./events/', (err, files) => {
    if (err) return console.error;
    files.forEach(file => {
        if (!file.endsWith('.js')) return;
        const evt = require(`./events/${file}`);
        let evtName = file.split('.')[0];
        client.on(evtName, evt.bind(null, client));
    });
});

fs.readdir('./commands/', async (err, files) => {
    if (err) return console.error;
    files.forEach(file => {
        if (!file.endsWith('.js')) return;
        let props = require(`./commands/${file}`);
        let cmdName = file.split('.')[0];
        client.commands.set(cmdName, props);
    });
});

client.login(token);
