module.exports = {
	name: 'ping',
	description: 'Ping?!?!?',
	execute(message,) {
		message.channel.send("Pinging...").then(m =>{
			var ping = m.createdTimestamp - message.createdTimestamp;
			var botPing = Math.round(bot.pi);
			
			message.edit(`**:ping_pong: Pong! Your Ping Is:-**\n  ${ping}ms`);
		}).catch(() => message.edit("🆘 An unknown error occurred. Do I have permission? (Embed Links)"));
	},
};
