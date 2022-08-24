class DatabaseGuild {
    constructor(data) {
        this.data = data;
    }
    transferToData() {
        return this.data;
    }
    getVariable(vari,val) {
        if(this.data.hasOwnProperty(vari)) return this.data[vari];
        this.setVariable(vari,val);
        return val;
    }
    setVariable(vari,val) {
        this.data[vari] = val;
        return this;
    }
}

module.exports = DatabaseGuild;