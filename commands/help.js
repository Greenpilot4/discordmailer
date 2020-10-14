const Discord = require("discord.js");

module.exports = {
	name: 'help',
	description: 'help command',
	execute(message,) {
        message.channel.send({embed: {
            color: '#ffb6c1',
            title: 'Commands',
            description: "Mail - Send a spoofed email with discord\nPing - Pong \n",
            footer: {
                "text": 'Yikes Guess thats it',
              }
          }});
	},
};
