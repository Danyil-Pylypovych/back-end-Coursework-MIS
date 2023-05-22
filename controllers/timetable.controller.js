const {userService, tokenService, authService, timetableService} = require("../services");
const {statusCode} = require("../constants");

module.exports = {
    getAll: async (req, res, next) => {
        try {
            const timetable = await timetableService.getAllTimetables();

            res.json(timetable);
        } catch (e) {
            next(e);
        }
    },
    createTimetable: async (req, res, next) => {
        try {
            const {user} = req;
            const timetable = await timetableService.createTimetable({...req.body, doctorId: user._id});

            res.json(timetable);
        } catch (e) {
            next(e);
        }
    },
    updateTimetable: async (req, res, next) => {
        try {
            const {_id} = req.params;
            const updatedTimetable = await timetableService.updateTimetable(_id, req.body);

            res.status(statusCode.CREATE).json(updatedTimetable);
        } catch (e) {
            next(e);
        }
    },
    deleteTimetable: async (req, res, next) => {
        try {
            const {_id} = req.params;
            await timetableService.deleteTimetable(_id);
            

            res.status(statusCode.NO_CONTENT).json('done')
        } catch (e) {
            next(e);
        }
    },
    getByParams: async (req, res, next) => {
        try {
            const params = req.body;
            const timetables = await timetableService.findByDay(params);

            res.json(timetables);
            next();
        } catch (e) {
            next(e);
        }
    },

}
