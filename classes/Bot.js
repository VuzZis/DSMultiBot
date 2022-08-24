class Bot {
    constructor(
        token = null,
        prefix = null,
        intents = null,
        commandManager = null
    ) {
        this.token = token;
        this.prefix = prefix;
        this.intents = intents;
        this.bot = null;
        this.commandManager = commandManager;
    }

    getToken()              {return this.token}
    getPrefix()             {return this.prefix}
    getIntents()            {return this.intents}
    getBot()                {return this.bot}
    getCommandManager()     {return this.commandManager}

    setToken(val)           {this.token = val;              return this}
    setPrefix(val)          {this.prefix = val;             return this}
    setIntents(val)         {this.intents = val;            return this}
    setCommandManager(val)  {this.commandManager = val;     return this}

    addEvent(eventClass)    { this.bot.on(eventClass.name,eventClass.callback); return this }


    createBot()             { this.bot = new Discord.Client(this.intents); return this; }
    runBot()                { this.bot.login(this.token); return this;                            }
    destroyBot()            { this.bot.destroy(); return this;                          }

}

module.exports = Bot;