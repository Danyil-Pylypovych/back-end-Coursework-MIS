const {Router} = require('express');

const {userController} = require("../controllers");
const {
    userMdlwr,
    authMdlwr,
} = require("../middlewares");

const userRouter = Router()

userRouter.get(
    '/',
    userController.getAllUsers,
);
userRouter.get(
    '/:userId',
    userMdlwr.checkIsIdValid,
    userMdlwr.checkIsUserIdPresent,
    userController.getUserById,
);
userRouter.put(
    '/:userId',
    userMdlwr.checkIsIdValid,
    authMdlwr.checkIsAccessToken,
    authMdlwr.checkIsUserEmailUniq,
    userController.updateUser,
);
userRouter.delete(
    '/:userId',
    userMdlwr.checkIsIdValid,
    authMdlwr.checkIsAccessToken,
    userMdlwr.checkIsUserIdPresent,
    userController.deleteUser,
);
//todo can help methods

// userRouter.get(
//     '/onebyparams',
//     userController.getUserByParams,
// );
// userRouter.get(
//     '/bytoken/:token',
//     userController.getUserByToken,
// );

module.exports = userRouter;

