const {Router} = require('express');

const { authController} = require("../controllers");
const {authMdlwr, userMdlwr} = require("../middlewares");

const authRouter = Router()
authRouter.post(
    '/signup',
    authMdlwr.checkIsBodyValid,
    authMdlwr.checkIsUserEmailUniq,
    authController.signUp,
);

authRouter.post(
    '/login',
    authMdlwr.checkIsBodyValid,
    userMdlwr.getUserDynamically('body', 'email'),
    authController.login,
);
authRouter.post(
    '/refresh',
    authMdlwr.checkIsRefreshToken,
    authController.refresh,
);
authRouter.post(
    '/logout',
    authMdlwr.checkIsAccessToken,
    authController.logout,
);

module.exports = authRouter;

