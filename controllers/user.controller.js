const {userService, tokenService} = require("../services");
const {statusCode} = require("../constants");

module.exports = {
    getAllUsers: async (req, res, next) => {
        try {
            const users = await userService.getAllUsers();

            res.json(users);
        } catch (e) {
            next(e);
        }
    },
    getUserById: async (req, res, next) => {
        try {
            const {user} = req;

            res.json(user);
        } catch (e) {
            next(e);
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

            res.status(statusCode.NO_CONTENT).json('done')
        } catch (e) {
            next(e);
        }
    },
}
