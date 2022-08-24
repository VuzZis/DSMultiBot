class Command {
    constructor({
        name,
        aliases,
        description,
        options,
        permissions,
        run
    }) {
        this.name = name;
        this.aliases = aliases;
        this.description = description;
        this.options = options;
        this.permissions = permissions;
        this.execute = run;
        this.type = "normal";
    }
    perform(bot,message) {
        return this.execute(bot,message);
    }
}
module.exports = Command;