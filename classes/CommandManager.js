class CommandManager {
    constructor(helpTemplate) {
        this.commandClasses = [];
        this.commands = new Discord.Collection();
        this.aliases = new Discord.Collection();
        this.helptemp = helpTemplate;
    }
    addCommand(command) {
        this.commandClasses.push(command);
        this.commands.set(command.name,command.execute);
        for(var i = 0; i < command.aliases.length; i++) {
            var alias = command.aliases[i];
            this.aliases.set(alias,command.name);
        }
    }
    get helpEmbed() {
        var embed = new MessageEmbed()
                        .setTitle(this.helptemp.top)
                        .setColor("#ffea00");
        for(var i = 0; i < this.commandClasses.length; i++) {
            var cmd = this.commandClasses[i];
            var filteredOptions = cmd.options.map(e => {
                return `${e.required ? "<" : "["}${e.name}${e.required ? ">" : "]"}`
            })
            embed.addField("\`_"+cmd.name+"\`"+` ${filteredOptions.join(" ")}`,cmd.description,false);
        }
        return embed;

    }
    findAndRun(message,bot,database) {
        var prefix = bot.getPrefix();
        var content = message.content;
        if(!content.startsWith(prefix)) return;
        var cmd = content.slice(prefix.length).split(" ").shift();
        var other = content.slice(prefix.length+cmd.length+1);

        if(this.commands.has(cmd)) {
            this.commands.get(cmd)(bot,message,other,database);
        } else if (this.aliases.has(cmd)) {
            this.commands.get(this.aliases.get(cmd))(bot,message,other,database);
        }

    }

}

module.exports = CommandManager;