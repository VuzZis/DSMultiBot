const { SimpleDS, Command, Bot } = require('../classes');
const Discord = require('discord.js');

const cmd = new Command({
    //name : 'test',
    description : 'Test COmmand Tempalte',
    aliases : ['тест'],
    permissions : "",
    options : [{
        name : "testarg",
        desc : "Test ARgument",
        type : "STRING/NUMBER/USER",
        required : false
    }],
    run : async (bot = Bot.prototype,message = Discord.Message.prototype,others,database) => {

    }
})

module.exports = cmd;