const Bot = require("./classes/Bot");
const CommandManager = require("./classes/CommandManager");
const Intents = require('discord.js').Intents;

const bot = new Bot()
            .setPrefix("_")
            .setIntents({ intents : [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MEMBERS, Intents.FLAGS.DIRECT_MESSAGES] })
            .setToken('')
            .setCommandManager(new CommandManager({
                top : "",
            }))
            .createBot();

['command','event'].forEach(handler => { //Reading all handlers
    require(`./handlers/${handler}`)(bot,db);
})

bot.runBot();