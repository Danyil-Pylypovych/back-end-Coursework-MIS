const {Router} = require('express');

const {timetableController} = require("../controllers");
const {timetableMdlwr} = require("../middlewares");

const timetableRouter = Router()
timetableRouter.get(
    '/',
    timetableController.getAll,
);

timetableRouter.post(
    '/create/:doctorId',
    timetableMdlwr.checkIsDoctor,
    timetableController.createTimetable,
);
timetableRouter.put(
    '/change/:patientId',
    timetableMdlwr.checkIsPatient,
    timetableController.updateTimetable,
);

module.exports = timetableRouter;

