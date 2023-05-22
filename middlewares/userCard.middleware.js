const {isObjectIdOrHexString} = require("mongoose");

const {userCardService} = require("../services");
const {ApiError} = require("../errors/index");
const {statusCode} = require("../constants");
const {User} = require("../models");

module.exports = {
    checkIsIdValid: async (req, res, next) => {
        try {
            if (!isObjectIdOrHexString(req.body._id)) {
                throw new ApiError('ID invalid', statusCode.CONFLICT);
            }

            next();
        } catch (e) {
            next(e);
        }
    },
    checkIsBodyValid: async (req, res, next) => {
        try {
            const {diagnosis} = req.body;
            if (!diagnosis) {
                throw new ApiError('Enter diagnosis', statusCode.BAD_REQUEST);
            }

            next();
        } catch (e) {
            next(e);
        }
    },
    checkIsUserCardIdPresent: async (req, res, next) => {
        try {
            const {_id} = req.body;
            const userCard = await userCardService.getUserCardById(_id);
            if (!userCard) {
                throw new ApiError('Wrong user card id', statusCode.BAD_REQUEST);
            }

            req.userCard = userCard;
            next();
        } catch (e) {
            next(e);
        }
    },
}
