const {User} = require('../models')

module.exports = {
    getAllUsers(filter = {}) {
        return User.find(filter)
    },
    getByParams(filter) {
        return User.find(filter)
    },
    getOneByParams(filter) {
        return User.findOne(filter);
    },
    createUser(userObj) {
        return User.create(userObj);
    },
    getUserById(id) {
        return User.findById(id)
    },
    updateUser(userId, newUserObject) {
        return User.findOneAndUpdate({_id: userId}, newUserObject, {new: true});
    },
    deleteUser(userId) {
        return User.deleteOne({_id: userId});
    },
    findDoctors(filter = {}) {
        return User.find({...filter, isDoctor: true});
    },
    findSpecialtyDoctor(specialty) {
        return User.find(specialty);
    },
}
