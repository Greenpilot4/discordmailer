# Discordmailer

<p align="center">
  <a href="https://nodejs.org/">
    <img
      alt="Node.js"
      src="https://nodejs.org/static/images/logo-light.svg"
      width="400"
    />
  </a>
</p>

## General Bot Setup
Visit https://discord.com/developers/applications and login.

Once logged in hit new application in top right corner.

After Creating your new application, in the application settings visit the "bot" tab. 

Add a bot. 

Once you have created your bot find where it says "token" and copy.

After you have copied your bot token, paste this into the config.json file under "token" or in heroku under token. 

## Inviting to discord server
To invite your bot to your server go to the application settings, the "General Information Tab" and copy the client ID. 

Once the Client ID is copied to clipboard, visit https://discordapi.com/permissions.html

Select the permissions the bot needs (Administrator is fine for this)

Then where it says "Oauth Url Generator" paste the client ID. 

The link at the bottom will change and you can visit that invite your bot!

## Installing Dependencies 
If running locally (not Heroku) dependencies will be needed.

Insure node.js v12+ is installed 

To install needed packages run - `npm install`  within directory

## Edit Config.json and running bot (if running locally)
***Within the config.json change these lines.*** 

**prefix** - Prefix for Bot Commands

**token**  - Discord Bot Token 

**host** - SMTP Server Host 

**port** - SMTP Host Port

**username** - SMTP Username

**password** - SMTP Password 

**logging** - Enables and disables logging

**logoutput** - File name of the logs

After run `node .` to start the bot!

## Heroku

<a href="https://heroku.com/deploy?template=https://github.com/Greenpilot4/discordmailer/tree/heroku">
  <img src="https://www.herokucdn.com/deploy/button.svg" alt="Deploy">
</a>
