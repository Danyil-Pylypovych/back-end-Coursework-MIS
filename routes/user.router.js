const {Router} = require('express');

const {userController, userCardController} = require("../controllers");
const {
    userMdlwr,
    authMdlwr,
    userCardMdlwr,
} = require("../middlewares");

const userRouter = Router()

userRouter.get(
    '/',
    userController.getAllUsers,
);
/*userRouter.get(
    '/clientCard',
    userCardMdlwr.checkIsIdValid,
    userCardMdlwr.checkIsUserCardIdPresent,
    userCardController.getUserCardById,
);*/
userRouter.get(
    '/clientCardAll',
    authMdlwr.checkIsAccessToken,
    userCardController.getAllUserCards,
);
userRouter.get(
    '/clientCardAll/:userId',
    userMdlwr.checkIsIdValid,
    userMdlwr.checkIsUserIdPresent,
    userCardController.getAllUserCardsByUserId,
);
userRouter.post(
    '/createClientCard/:userId',
    userCardMdlwr.checkIsBodyValid,
    userMdlwr.checkIsIdValid,
    userMdlwr.checkIsUserIdPresent,
    userCardController.createUserCard,
);
userRouter.get(
    '/doctorsList',
    userController.getDoctors,
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

