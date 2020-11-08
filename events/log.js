const fs = require("fs");
const path = require("path");
const Discord = require("discord.js");
const { logging } = require("../config.json");
const currentTime = require("./time.js");

module.exports = function(message) {
    console.log(message);
    if (logging == "true") {
        fs.appendFileSync("./logs/" + currentTime().split(" ")[0] + ".log", message + "\n");
    }
};
