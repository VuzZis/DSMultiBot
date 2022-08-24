const { Message } = require("discord.js");
const { Bot, Database, MessageAssisstantSimple } = require('../classes')

const dotenv = require('dotenv').config();
const datalwood = require('../alwood_game/maindata').db;

module.exports = async (bot = Bot.prototype,database = Database.prototype,message = Message.prototype) => {

    var memb = message.member;
    if(!memb) return;
    if(memb.user.bot) return;
    var guild = database.requireValue(database.filedata["guilds"],memb.guild.id,{});
    var members = database.requireValue(guild,"members",{});
    var member = database.requireValue(members,memb.id,{});
    var activity_tokens = database.requireValue(member,"activity_tokens",0);
    var messages_sended = database.requireValue(member,"messages_sended",0);
    var name = database.requireValue(member,"name",memb.user.username);
    database.write();
    MessageAssisstantSimple.reply(message);
    try{
        bot.getCommandManager().findAndRun(message,bot,database);
    } catch(e) {
        message.reply("Произошла ошибка!");
    }

    database.filedata["guilds"][memb.guild.id]["members"][memb.id]["messages_sended"] = ++messages_sended;
    database.write();
    messages_sended = database.requireValue(member,"messages_sended",0);
    while(messages_sended >= 200) {
        database.filedata["guilds"][memb.guild.id]["members"][memb.id]["messages_sended"] = messages_sended-200;
        database.filedata["guilds"][memb.guild.id]["members"][memb.id]["activity_tokens"] = ++activity_tokens;
        database.write();
        activity_tokens = database.requireValue(member,"activity_tokens",0);
        messages_sended = database.requireValue(member,"messages_sended",0);
    }

    datalwood.requireValue(
        datalwood.requireValue(
            datalwood.requireValue(
                datalwood.requireValue(datalwood.filedata,message.guildId,{}),
                'members',
                {}
            ),
            message.member.id,
            {name : message.member.user.username}
        ),
        'xp',
        [0,100]
    )

    var happiness = datalwood.requireValue(
        datalwood.requireValue(
            datalwood.requireValue(
                datalwood.requireValue(datalwood.filedata,message.guildId,{}),
                'members',
                {}
            ),
            message.member.id,
            {}
        ),
        'happiness',
        30
    )
    var member = datalwood.requireValue(
        datalwood.requireValue(
            datalwood.requireValue(datalwood.filedata,message.guildId,{}),
            'members',
            {}
        ),
        message.member.id,
        {}
    );
    var boosts = database.requireValue(member,'boosts',{});
    var speedMultiplier = database.requireValue(boosts,'speed',1);
    var gatherMultiplier = database.requireValue(boosts,'gather',1);
    var babyMultiplier = database.requireValue(boosts,'baby',1);

    if(speedMultiplier < 1) {
        datalwood.filedata[message.guildId]["members"][message.member.id]["boosts"]["speed"] = 1;
    }
    if(gatherMultiplier < 1) {
        datalwood.filedata[message.guildId]["members"][message.member.id]["boosts"]["gather"] = 1;
    }
    if(babyMultiplier < 1) {
        datalwood.filedata[message.guildId]["members"][message.member.id]["boosts"]["baby"] = 1;
    }

    if(happiness > 200) {
        datalwood.filedata[message.guildId]["members"][message.member.id]["happiness"] = 200;
    }
    if(happiness < 1) {
        datalwood.filedata[message.guildId]["members"][message.member.id]["happiness"] = 1;
    }

    datalwood.write();

    if(datalwood.filedata[message.guildId]["members"][message.member.id]["xp"][0] >= datalwood.filedata[message.guildId]["members"][message.member.id]["xp"][1]) {
        datalwood.filedata[message.guildId]["members"][message.member.id]["xp"][0] = 
        datalwood.filedata[message.guildId]["members"][message.member.id]["xp"][0] -
        datalwood.filedata[message.guildId]["members"][message.member.id]["xp"][1];
        datalwood.write();
        datalwood.filedata[message.guildId]["members"][message.member.id]["xp"][1] = 
        datalwood.filedata[message.guildId]["members"][message.member.id]["xp"][1] * 1.2;
        datalwood.write();
        datalwood.filedata[message.guildId]["members"][message.member.id]["level"] = datalwood.filedata[message.guildId]["members"][message.member.id]["level"]+1;
        datalwood.write();
        boosts = database.requireValue(member,'boosts',{});
        speedMultiplier = database.requireValue(boosts,'speed',1);
        gatherMultiplier = database.requireValue(boosts,'gather',1);
        babyMultiplier = database.requireValue(boosts,'baby',1);
        var people = datalwood.requireValue(member,'people',1);
        var babiesR = Math.floor(Math.random()*12*babyMultiplier);
        babiesR = Math.floor(babiesR*(people/1500));
        datalwood.filedata[message.guildId]["members"][message.member.id]["people"] = people + babiesR
        message.reply("Повышение уровня! Теперь у вас "+datalwood.filedata[message.guildId]["members"][message.member.id]["level"]+" уровень!")
        message.reply("В вашем городе родилось "+babiesR+" детей!");
        datalwood.write();
    }
    
}