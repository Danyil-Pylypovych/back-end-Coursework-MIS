const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");

const {ApiError} = require("../errors");
const {statusCode} = require("../constants");
const {tokenTypeEnum} = require("../constants");
const {
    ACCESS_SECRET_WORD,
    REFRESH_SECRET_WORD,
    ACCESS_TOKEN_LIFETIME,
    REFRESH_TOKEN_LIFETIME,
} = require("../config/config");

module.exports = {
    hashPassword: (password) => bcrypt.hash(password, 10
    ),
    comparePassword: async (password, hashPassword) => {
        const isPasswordsSame = await bcrypt.compare(password, hashPassword);
        if (!isPasswordsSame) {
            throw new ApiError('Wrong email or password', statusCode.BAD_REQUEST);
        }
    },
    createAuthTokens: (payload = {}) => {
        const access_token = jwt.sign(payload, ACCESS_SECRET_WORD, {expiresIn: ACCESS_TOKEN_LIFETIME});
        const refresh_token = jwt.sign(payload, REFRESH_SECRET_WORD, {expiresIn: REFRESH_TOKEN_LIFETIME});
        return {
            access_token,
            refresh_token,
        }
    },

    checkToken: (token, tokenType = tokenTypeEnum.ACCESS) => {
        try {
            let secretWord;
            switch (tokenType) {
                case tokenTypeEnum.ACCESS:
                    secretWord = ACCESS_SECRET_WORD;
                    break
                case tokenTypeEnum.REFRESH:
                    secretWord = REFRESH_SECRET_WORD;
                    break
                default:
                    return ApiError('Secret word not find');
            }
            return jwt.verify(token, secretWord);
        } catch (e) {
            throw new ApiError('Token invalid...', statusCode.UNAUTHORIZED);
        }
    },
    getIdFromToken: (token, tokenType = tokenTypeEnum.ACCESS) => {
        try {
            let secretWord;
            switch (tokenType) {
                case tokenTypeEnum.ACCESS:
                    secretWord = ACCESS_SECRET_WORD;
                    break
                case tokenTypeEnum.REFRESH:
                    secretWord = REFRESH_SECRET_WORD;
                    break
                default:
                    return ApiError('Secret word not find');
            }
            const decoded = jwt.verify(token, secretWord);
            return decoded._id
        } catch (e) {
            throw new ApiError('Token invalid...', statusCode.UNAUTHORIZED);
        }
    }
};
