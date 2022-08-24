const fs = require('fs');

var loadCommand = [];

module.exports = (bot) => {

    var commands = []

    const command_files = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));

    for(const file of command_files) {
        const command = require(`../commands/${file}`);
        if(command.name) {
            try {
                bot.getCommandManager().addCommand(command);
                loadCommand.push({
                    name : command.name,
                    loaded : '✅',
                    type : 'normal'
                })
            } catch(e) {
                loadCommand.push({
                    name : command.name,
                    loaded : '❌',
                    type : 'normal',
                    error : e.toString()
                })
                continue;
            }
        } else {
            loadCommand.push({
                name : command.name,
                loaded : '❌',
                type : 'normal',
                error : 'Name not specified'
            })
            continue;
        }
    }

    console.table(loadCommand)
}