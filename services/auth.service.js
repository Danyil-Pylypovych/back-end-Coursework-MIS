const {Auth} = require("../models");

module.exports = {
    saveTokens(tokens) {
        return Auth.create(tokens);
    },
    getOneWithUser(filter) {
        return Auth.findOne(filter).populate('my_user');
    },
    getOneByParams(filter) {
        return Auth.findOne(filter);
    },
    deleteOneByParams(filter) {
        return Auth.deleteOne(filter);
    },
    deleteMany(filter) {
        return Auth.deleteMany(filter);
    },
}


