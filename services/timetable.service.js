const {Timetable} = require('../models')

module.exports = {
    getAllTimetables(filter = {}) {
        return Timetable.find(filter)
    },
    /*getOneByParams(filter) {
        return Timetable.findOne(filter);
    },*/
    createTimetable(timetableObj) {
        return Timetable.create(timetableObj);
    },
    updateTimetable(_id, newTimetableObject) {
        return Timetable.findOneAndUpdate(_id, newTimetableObject, {new: true});
    },
    deleteTimetable(_id) {
        return Timetable.deleteOne(_id);
    },
    findByParams(params) {
        return Timetable.find(params);
    },
    
}
