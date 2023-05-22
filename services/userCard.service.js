const {UserCard} = require('../models')

module.exports = {
    getAllUserCards(filter = {}) {
        return UserCard.find(filter)
    },
    getOneByParams(filter) {
        return UserCard.findOne(filter);
    },
    createUserCard(userCardObj) {
        return UserCard.create(userCardObj);
    },
    getUserCardById(id) {
        return UserCard.findById(id)
    },
}
