const fs = require("fs");
const Discord = require("discord.js");
const {
    prefix,
    token
} = require("./config.json");


const client = new Discord.Client();
client.commands = new Discord.Collection();

const commandFiles = fs
    .readdirSync("./commands")
    .filter((file) => file.endsWith(".js"));

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}

client.once("ready", () => {
    console.log(`${client.user.username} Ready!`);
});

client.on("message", async (message) => {
    const args = message.content.slice(prefix.length).split(/ +/);
    const commandName = args.shift().toLowerCase();
    const command = client.commands.get(commandName);
    const randPassword = Array(10).fill("0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz").map(function(x) { return x[Math.floor(Math.random() * x.length)] }).join('');

    if (message.author.bot) return;
    if (!message.content.startsWith(prefix)) return;


    try {
        if (commandName == "passgen") {
            message.channel.send(randPassword)
        } else if (commandName == "ping") {
            const m = await message.channel.send("Pinging...");
            m.edit(`Pong! Latency is ${m.createdTimestamp - message.createdTimestamp}ms. API Latency is ${Math.round(client.ws.ping)}ms`);
        } else {
            command.execute(message);
        }
    } catch (error) {
        console.error(error);
        message.reply('Something Went Wrong!');
    }
});

client.login(token);