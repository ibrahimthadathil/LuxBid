"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.buyerAuthMiddleware = void 0;
const http_StatusCode_1 = require("@/enums/http_StatusCode");
const userModel_1 = require("@/models/userModel");
const cookie_utils_1 = require("@/utils/cookie_utils");
const jwt_util_1 = require("@/utils/jwt_util");
const logger_utils_1 = require("@/utils/logger_utils");
const buyerAuthMiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const buyerId = req.user;
        const token = req.cookies.authtkn;
        //  console.log(token,'from the buyer');
        if (!token)
            res.status(http_StatusCode_1.HttpStatus.UNAUTHORIZED).json({ message: http_StatusCode_1.responseMessage.TOKEN_ACCESS });
        const { role, id } = (0, jwt_util_1.verifyToken)(token);
        if (!role) {
            //  console.log('#####');                  
            const currentuser = yield userModel_1.User.findById(buyerId);
            //  console.log(currentuser, ':- from buyerAuth');
            const authToken = (0, jwt_util_1.generateAccessToken)({ id: currentuser === null || currentuser === void 0 ? void 0 : currentuser._id, role: currentuser === null || currentuser === void 0 ? void 0 : currentuser.role });
            //  console.log(authToken,':- token created');
            (0, cookie_utils_1.setCookie)(res, 'authtkn', authToken);
        }
        //  console.log(role,'now');
        if ((role === "Seller" || role === "Buyer") && buyerId == id) {
            // console.log('tttt');
            next();
        }
        else {
            // console.log('reaaa');
            res.status(http_StatusCode_1.HttpStatus.FORBIDDEN).json({ message: http_StatusCode_1.responseMessage.ACCESS_DENIED });
        }
    }
    catch (error) {
        (0, logger_utils_1.logError)(error);
    }
});
exports.buyerAuthMiddleware = buyerAuthMiddleware;
