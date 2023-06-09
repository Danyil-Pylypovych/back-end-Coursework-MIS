const {Router} = require('express');

const {timetableController} = require("../controllers");
const {timetableMdlwr} = require("../middlewares");

const timetableRouter = Router()
timetableRouter.post(
    '/',
    timetableMdlwr.checkIsDoctor,
    timetableController.getAll,
);

timetableRouter.post(
    '/params',
    timetableMdlwr.checkIsDoctor,
    timetableController.getByParams,
);
timetableRouter.post(
    '/create',
    timetableMdlwr.checkIsDoctor,
    timetableController.createTimetable,
);
timetableRouter.put(
    '/change/',
    timetableController.updateTimetableCompleted,
);
timetableRouter.put(
    '/change/:patientId',
    timetableMdlwr.checkIsPatient,
    timetableController.updateTimetable,
);

module.exports = timetableRouter;

