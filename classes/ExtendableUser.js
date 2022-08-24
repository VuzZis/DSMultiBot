const DatabaseUser = require("./DatabaseUser");

class ExtendableUser extends DatabaseUser {
    constructor(user) {
        this.data = user.transferToData();
        super(this.data);
    }
}

module.exports = ExtendableUser;