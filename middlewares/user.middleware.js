const {isObjectIdOrHexString} = require("mongoose");

const {userService} = require("../services");
const {ApiError} = require("../Errors/index");
const {statusCode} = require("../constants");
const {User} = require("../models");

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
