const { SimpleDS, Command, Bot } = require('../classes');
const Discord = require('discord.js');

const cmd = new Command({
    name : 'хелп',
    description : 'Показывает это сообщение',
    aliases : ['help','алв-хелп'],
    permissions : "",
    options : [],
    run : async (bot = Bot.prototype,message = Discord.Message.prototype,others) => {
        message.reply({ embeds : [bot.getCommandManager().helpEmbed] });
    }
})

module.exports = cmd;