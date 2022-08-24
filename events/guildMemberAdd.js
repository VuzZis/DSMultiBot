const { Message, GuildMember } = require("discord.js");
const { Bot, Database } = require("../classes")

module.exports = async (bot = Bot.prototype,database = Database.prototype,member = GuildMember.prototype) => {
    var guild = database.requireValue(database.filedata["guilds"],member.guild.id,{})
    var members = database.requireValue(guild,"members",{});
    var member = database.requireValue(members,member.id,{});
    database.write();
}