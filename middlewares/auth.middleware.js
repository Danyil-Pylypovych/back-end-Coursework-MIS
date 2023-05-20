const {tokenService, authService, userService} = require("../services");
const {statusCode, tokenTypeEnum} = require("../constants");
const {ApiError} = require("../errors");

module.exports = {
    checkIsBodyValid: async (req, res, next) => {
        try {
            const {email, password} = req.body;
            if (!email || !password) {
                throw new ApiError('Enter email and/or password', statusCode.BAD_REQUEST);
            }

            next();
        } catch (e) {
            next(e);
        }
    },
    checkIsUserEmailUniq: async (req, res, next) => {
        try {
            const {email} = req.body;
            const {userId} = req.params;
            const user = await userService.getOneByParams({email, _id: {$ne: userId}});
            if (user && user._id.toString() !== userId) {
                throw new ApiError('Email is already registered...', statusCode.BAD_REQUEST);
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    checkIsRefreshToken:
        async (req, res, next) => {
            try {
                const refresh_token = req.get('Authorization');
                if (!refresh_token) {
                    throw new ApiError('No token!!!', statusCode.UNAUTHORIZED);
                }
                tokenService.checkToken(refresh_token, tokenTypeEnum.REFRESH);

                const tokenInfo = await authService.getOneByParams({refresh_token});
                if (!tokenInfo) {
                    throw new ApiError('Token not valid!!!', statusCode.UNAUTHORIZED);
                }

                req.tokenInfo = tokenInfo;
                next();
            } catch (e) {
                next(e);
            }
        },
    checkIsAccessToken:
        async (req, res, next) => {
            try {
                const access_token = req.get('Authorization');
                console.log(access_token)
                if (!access_token) {
                    throw new ApiError('No token', statusCode.BAD_REQUEST)
                }
                tokenService.checkToken(access_token);
                const tokenInfo = await authService.getOneWithUser({access_token});
                if (!tokenInfo) {
                    throw new ApiError('Token not valid', statusCode.UNAUTHORIZED);
                }

                req.tokenInfo = tokenInfo;
                next();
            } catch (e) {
                next(e);
            }
        },
}
