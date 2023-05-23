const {isObjectIdOrHexString} = require("mongoose");

const {userService, timetableService} = require("../services");
const {ApiError} = require("../errors/index");
const {statusCode} = require("../constants");
const {User} = require("../models");
const { request } = require("express");

module.exports = {
    checkIsIdValid: async (req, res, next) => {
        try {
            if (!isObjectIdOrHexString(req.params.userId)) {
                throw new ApiError('ID invalid', statusCode.CONFLICT);
            }

            next();
        } catch (e) {
            next(e);
        }
    },
    checkIsUserIdPresent: async (req, res, next) => {
        try {
            const {userId} = req.params;
            const user = await userService.getUserById(userId);
            if (!user) {
                throw new ApiError('Wrong user id', statusCode.BAD_REQUEST);
            }

            req.user = user;
            next();
        } catch (e) {
            next(e);
        }
    },
    checkIsDoctor: async (req, res, next) => {
        try {
            const {doctorId} = req.body;
            const user = await userService.getOneByParams({_id: doctorId});
            if (user.isDoctor === false) {
                throw new ApiError('Not found doctor', statusCode.BAD_REQUEST);
            }

            req.user = user;
            next();
        } catch (e) {
            next(e);
        }
    },
    checkIsPatient: async (req, res, next) => {
        try {
            const {patientId} = req.params;
            const user = await userService.getOneByParams({_id: patientId});
            
            if (user.isDoctor === true) {
                throw new ApiError('Is not patient', statusCode.BAD_REQUEST);
            }

            req.user = user;
            next();
        } catch (e) {
            next(e);
        }
    },
    getUserDynamically: (from = 'body', fieldName = 'userId', dbField = fieldName) => async (req, res, next) => {
        try {
            const fieldForSearch = req[from][fieldName];
            const user = await User.findOne({[dbField]: fieldForSearch});
            if (!user) {
                throw new ApiError('Wrong user email', statusCode.BAD_REQUEST);
            }

            req.user = user;
            next();
        } catch (e) {
            next(e);
        }
    },
}
