const {Router} = require('express');

const {timetableController} = require("../controllers");
const {timetableMdlwr, userMdlwr} = require("../middlewares");

const timetableRouter = Router()
timetableRouter.get(
    '/',
    userMdlwr.checkIsIdValid,
    userMdlwr.checkIsUserIdPresent,
    timetableController.getByParams,
);

timetableRouter.post(
    '/create',
    timetableMdlwr.checkIsDoctor,
    timetableController.createTimetable,
);
timetableRouter.put(
    '/change/:patientId',
    timetableMdlwr.checkIsPatient,
    timetableController.updateTimetable,
);

module.exports = timetableRouter;

