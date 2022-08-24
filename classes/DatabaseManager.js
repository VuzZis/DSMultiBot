const fs = require('fs');
const DatabaseGuild = require('./DatabaseGuild');
const DatabaseUser = require('./DatabaseUser');
class Database {

    constructor() {
        fs.mkdir('./database',() => {});
        fs.mkdir('./database/guilds',() => {});
        fs.mkdir('./database/users',() => {});
    }

    readGuildList() {

    }

    readUserList(guildId) {

    }

    cloneGuild(oldGuildId,newGuildId) {
        this.writeGuild(newGuildId,this.readGuild(oldGuildId));
    }

    cloneUser(oldGuildId,newGuildId,oldUserId,newUserId) {
        this.writeUser(newGuildId,newUserId,this.readUser(oldGuildId,oldUserId));
    }

    readGuild(guildId) {
        var guild;
        var data = JSON.parse(fs.readFileSync(`./database/guilds/${guildId}.json`,'utf8'));
        if(!data) {
            let defaultData = {
                id : guildId
            }
            guild = new DatabaseGuild(defaultData);
            fs.writeFile(`./database/guilds/${guildId}.json`,JSON.stringify(guild.transferToData()),(err) => {if(err) console.log(err.message)});
        } else {
            guild = new DatabaseGuild(data);
        }
        return guild;
    }

    readUser(guildId, userId) {
        var user;
        fs.mkdir(`./database/users/${guildId}`,() => {})
        var data = JSON.parse(fs.readFileSync(`./database/users/${guildId}/${userId}.json`,'utf8'));
        if(!data) {
            let defaultData = {
                id : userId
            }
            user = new DatabaseUser(defaultData);
            fs.writeFile(`./database/users/${guildId}/${userId}.json`,JSON.stringify(user.transferToData(),null,4),(err) => {if(err) console.log(err.message)});
        } else {
            user = new DatabaseUser(data);
        }
        return user;
    }

    writeGuild(guildId,guild) {
        fs.writeFile(`./database/guilds/${guildId}.json`,JSON.stringify(guild.transferToData(),null,4),(err) => {if(err) console.log(err.message)});
    }

    writeUser(guildId,userId,user) {
        fs.mkdir(`./database/users/${guildId}`,() => {});
        fs.writeFile(`./database/users/${guildId}/${userId}.json`,JSON.stringify(user.transferToData(),null,4),(err) => {if(err) console.log(err.message)});
    }

    static getInstance() {
        return new Database();
    }

}

module.exports = Database;