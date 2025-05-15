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
exports.AuthMiddleWare = void 0;
const jwt_util_1 = require("@/utils/jwt_util");
const http_StatusCode_1 = require("@/enums/http_StatusCode");
const AuthMiddleWare = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = req.headers['authorization'];
        if (!token)
            res.status(http_StatusCode_1.HttpStatus.UNAUTHORIZED).json({ message: "Access denied .No token provided" });
        else {
            const { id } = (0, jwt_util_1.verifyToken)(token);
            const userId = id;
            if (userId) {
                req.user = userId;
                next();
            }
            else
                res.status(http_StatusCode_1.HttpStatus.UNAUTHORIZED).json({ message: http_StatusCode_1.responseMessage.ACCESS_DENIED });
        }
    }
    catch (error) {
        console.log(error.message);
        console.log('error from middleware');
        res.status(http_StatusCode_1.HttpStatus.BAD_REQUEST).json({ message: error.message });
    }
});
exports.AuthMiddleWare = AuthMiddleWare;
