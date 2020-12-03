module.exports = client => {
    client.log(client.currentTime() + " " + `${client.user.tag} online!`)
};