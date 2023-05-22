const {userService, tokenService, authService, userCardService,} = require("../services");
const {statusCode} = require("../constants");
const { STATES } = require("mongoose");

module.exports = {
    getAllUserCards: async (req, res, next) => {
        try {
            const {my_user} = req.tokenInfo;
            const userCards = await userCardService.getAllUserCards(my_user);

            res.json(userCards);
        } catch (e) {
            next(e);
        }
    },
    getAllUserCardsByUserId: async (req, res, next) => {
        try {
            const {user} = req;
            const userCards = await userCardService.getAllUserCards({my_user: user._id});

            res.json(userCards);
        } catch (e) {
            next(e);
        }
    },
    getUserCardById: async (req, res, next) => {
        try {
            const {userCard} = req;

            res.json(userCard);
        } catch (e) {
            next(e);
        }
    },
    createUserCard: async (req, res, next) => {
        try {
            const {user} = req;
            const userCard = await userCardService.createUserCard({...req.body, my_user: user._id});

            res.json(userCard).status(statusCode.CREATE);
        } catch (e) {
            next(e)
        }
    },
    getUserByToken: async (req, res, next) => {
        try {
            const {token} = req.params;
            const _id = await tokenService.getIdFromToken(token)
            const user = await userService.getUserById(_id)

            res.json({...user.toObject(), password: 'done'});
        } catch (e) {
            next(e);
        }
    },

    getUserByParams: async (req, res, next) => {
        try {
            const user = await userService.getOneByParams(req.body)

            res.json(user);
        } catch (e) {
            next(e);
        }
    },
    updateUser: async (req, res, next) => {
        try {
            const {userId} = req.params;
            const user = await userService.updateUser(userId, req.body);

            res.status(statusCode.CREATE).json(user);
        } catch (e) {
            next(e);
        }
    },
    deleteUser: async (req, res, next) => {
        try {
            const {userId} = req.params;
            await userService.deleteUser(userId);
            await authService.deleteMany({my_user: userId})

            res.status(statusCode.NO_CONTENT).json('done')
        } catch (e) {
            next(e);
        }
    },
}
