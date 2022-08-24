const DatabaseGuild = require("./DatabaseGuild");

class ExtendableGuild extends DatabaseGuild {
    constructor(guild) {
        this.data = guild.transferToData();
        super(this.guild);
    }
}

module.exports = ExtendableGuild;