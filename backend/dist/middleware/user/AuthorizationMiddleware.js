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
exports.authorizationAccess = void 0;
const http_StatusCode_1 = require("@/enums/http_StatusCode");
const userModel_1 = require("@/models/userModel");
const logger_utils_1 = require("@/utils/logger_utils");
const authorizationAccess = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.user;
        // const user = await redisClient.get(`user:${userId}`)
        // if(user){
        //   const currentuser =JSON.parse(user)
        //   if(currentuser.isActive){
        //     next()
        //   } 
        // }else{
        //   const currentuser = await User.findById(userId, "-password");
        // }
        const currentuser = yield userModel_1.User.findById(userId, "-password");
        if (currentuser === null || currentuser === void 0 ? void 0 : currentuser.isActive)
            next();
        else {
            console.log('reached here with problems');
            res.clearCookie("rftn");
            res
                .status(http_StatusCode_1.HttpStatus.FORBIDDEN)
                .json({ message: "Blocked by the Authority" });
        }
    }
    catch (error) {
        (0, logger_utils_1.logError)(error);
    }
});
exports.authorizationAccess = authorizationAccess;
