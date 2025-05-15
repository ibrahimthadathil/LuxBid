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
exports.AdminMiddleware = void 0;
const adminModal_1 = require("../models/admin/adminModal");
const jwt_util_1 = require("../utils/jwt_util");
const http_StatusCode_1 = require("@/enums/http_StatusCode");
const AdminMiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const refreshToken = req.cookies.admtkn;
        if (refreshToken) {
            const { email } = (0, jwt_util_1.verifyToken)(refreshToken);
            if (email) {
                const admin = yield adminModal_1.Admin.findOne({ email: email });
                req.admin = admin;
                next();
            }
            else
                throw new Error(http_StatusCode_1.responseMessage.ACCESS_DENIED);
        }
        else
            throw new Error(http_StatusCode_1.responseMessage.TOKEN_ACCESS);
    }
    catch (error) {
        console.log('from admin middle ware', error);
        res.status(http_StatusCode_1.HttpStatus.UNAUTHORIZED).json({ message: error.message });
    }
});
exports.AdminMiddleware = AdminMiddleware;
