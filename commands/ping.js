exports.run = async (client, message) => {
    const m = await message.channel.send("Pinging...");
    m.edit(`Pong! Latency is ${m.createdTimestamp - message.createdTimestamp}ms. API Latency is ${Math.round(client.ws.ping)}ms`);
    client.log(client.currentTime() + " " + message.author.tag + " pinged the bot");
}