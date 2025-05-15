"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
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
exports.authController = void 0;
const typedi_1 = require("typedi");
const authService_1 = require("../../../service/implements/user/authService");
const cookie_utils_1 = require("../../../utils/cookie_utils");
const http_StatusCode_1 = require("@/enums/http_StatusCode");
const logger_utils_1 = __importStar(require("@/utils/logger_utils"));
let AuthController = class AuthController {
    constructor(authService) {
        this.authService = authService;
    }
    Signup(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userData = req.body;
                const { message, token, success } = yield this.authService.create_User(userData.email);
                if (!token && !success) {
                    res.status(http_StatusCode_1.HttpStatus.CONFLICT).json({ response: message, success: false });
                }
                else {
                    res.status(http_StatusCode_1.HttpStatus.OK).json({ token: token, response: message, success });
                }
            }
            catch (error) {
                (0, logger_utils_1.logError)(error);
                res
                    .status(http_StatusCode_1.HttpStatus.INTERNAL_SERVER_ERROR)
                    .json({
                    response: http_StatusCode_1.responseMessage.ERROR_MESSAGE,
                    error: error.message,
                });
            }
        });
    }
    verifyOTP(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { otp } = req.body;
                const token = req.headers.authorization;
                if (otp) {
                    const response = yield this.authService.verify_otp(otp, token);
                    if (!response.success) {
                        res.status(http_StatusCode_1.HttpStatus.UNAUTHORIZED).json({ message: response.message });
                    }
                    else {
                        // req.session.userId = response.user as string
                        (0, cookie_utils_1.setCookie)(res, "rftn", response.refresh);
                        res
                            .status(http_StatusCode_1.HttpStatus.OK)
                            .json({
                            success: true,
                            token: response.token,
                            message: response.message,
                            name: response.name,
                            email: response.email,
                        });
                    }
                }
                else
                    res.status(http_StatusCode_1.HttpStatus.UNAUTHORIZED).json({ message: "OTP Required..!" });
            }
            catch (error) {
                (0, logger_utils_1.logError)(error);
                if (error.message == "Token verification failed") {
                    res.status(http_StatusCode_1.HttpStatus.UNAUTHORIZED).json({ message: http_StatusCode_1.responseMessage.TOKEN_ACCESS });
                }
            }
        });
    }
    register(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userDetails = req.body;
                const token = req.headers.authorization;
                const response = yield this.authService.register_User(userDetails, token);
                console.log(response.success);
                if (response.success) {
                    res
                        .status(http_StatusCode_1.HttpStatus.OK)
                        .json({ token: response.token, message: response.message });
                }
                else {
                    res.status(http_StatusCode_1.HttpStatus.FORBIDDEN).json({ message: response.message });
                }
            }
            catch (error) {
                (0, logger_utils_1.logError)(error);
                console.log(error);
            }
        });
    }
    signIn(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, password } = req.body;
                console.log(email, password, 'lll');
                const response = yield this.authService.verify_SignIn(email, password);
                console.log('000', response);
                if (response === null || response === void 0 ? void 0 : response.success) {
                    (0, cookie_utils_1.setCookie)(res, "rftn", response.refresh);
                    (0, cookie_utils_1.setCookie)(res, 'authtkn', response.roleAccess);
                    res
                        .status(http_StatusCode_1.HttpStatus.OK)
                        .json({
                        token: response.token,
                        success: true,
                        message: response.message,
                        email: response.email,
                        name: response.name,
                        role: response.role
                    });
                }
                else {
                    console.log("check", response.message);
                    res.status(http_StatusCode_1.HttpStatus.UNAUTHORIZED).json({ success: response.success, message: response.message });
                }
            }
            catch (error) {
                (0, logger_utils_1.logError)(error);
                res.status(http_StatusCode_1.HttpStatus.INTERNAL_SERVER_ERROR).json({ message: error.message });
            }
        });
    }
    googleAuth(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const userDetails = req.body;
            try {
                const { success, message, token, refresh, roleAccess, role } = yield this.authService.verify_Google(userDetails);
                if (success) {
                    (0, cookie_utils_1.setCookie)(res, 'authtkn', roleAccess);
                    (0, cookie_utils_1.setCookie)(res, "rftn", refresh);
                    res
                        .status(http_StatusCode_1.HttpStatus.OK)
                        .json({ AccessToken: token, message: message, success: true, role });
                }
                else {
                    res.status(http_StatusCode_1.HttpStatus.INTERNAL_SERVER_ERROR).json({ message: message });
                }
            }
            catch (error) {
                (0, logger_utils_1.logError)(error);
                console.log(error);
                res.status(http_StatusCode_1.HttpStatus.INTERNAL_SERVER_ERROR).json({ message: error.message });
            }
        });
    }
    forgetPassword(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email } = req.body;
                const { success, message, token } = yield this.authService.forget_Password(email);
                console.log(success);
                if (!success)
                    res.status(http_StatusCode_1.HttpStatus.UNAUTHORIZED).json({ message });
                else
                    res.status(http_StatusCode_1.HttpStatus.OK).json({ message, token });
            }
            catch (error) {
                (0, logger_utils_1.logError)(error);
                console.log(error);
                res.status(http_StatusCode_1.HttpStatus.INTERNAL_SERVER_ERROR).json({ message: error.message });
            }
        });
    }
    resetOTP(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { otp } = req.body;
                const Token = req.headers.authorization;
                if (otp) {
                    const { success, message, token } = yield this.authService.reset_otp(Token, otp);
                    if (!success) {
                        res.status(http_StatusCode_1.HttpStatus.UNAUTHORIZED).json({ message });
                    }
                    else {
                        res.status(http_StatusCode_1.HttpStatus.OK).json({ message, token });
                    }
                }
                else
                    res.status(http_StatusCode_1.HttpStatus.UNAUTHORIZED).json({ message: 'OTP is required' });
            }
            catch (error) {
                (0, logger_utils_1.logError)(error);
                console.log(error, "from reset password");
                res.status(http_StatusCode_1.HttpStatus.INTERNAL_SERVER_ERROR).json({ message: http_StatusCode_1.responseMessage.ERROR_MESSAGE });
            }
        });
    }
    resetPassword(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { password, newPassword } = req.body;
                const Token = req.headers.authorization;
                const { message, success } = yield this.authService.reset_Password(password, newPassword, Token);
                if (success) {
                    res.status(http_StatusCode_1.HttpStatus.OK).json({ success: true, message: message, });
                }
                else {
                    res.status(http_StatusCode_1.HttpStatus.UNAUTHORIZED).json({ success: false, message: message });
                }
            }
            catch (error) {
                (0, logger_utils_1.logError)(error);
                console.error(error);
                res.status(http_StatusCode_1.HttpStatus.INTERNAL_SERVER_ERROR).json({ message: http_StatusCode_1.responseMessage.ERROR_MESSAGE });
            }
        });
    }
    logoutUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                res.clearCookie('rftn');
                res.clearCookie('authtkn');
                res.status(http_StatusCode_1.HttpStatus.OK).json({ message: "loggedOut" });
            }
            catch (error) {
                (0, logger_utils_1.logError)(error);
                console.log(error.message);
                throw new Error('from logout user');
            }
        });
    }
    setNewToken(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            logger_utils_1.default.debug('entered into set new token');
            const token = (_a = req.cookies) === null || _a === void 0 ? void 0 : _a.rftn;
            if (!token) {
                res.status(http_StatusCode_1.HttpStatus.FORBIDDEN).json({ message: http_StatusCode_1.responseMessage.ERROR_MESSAGE });
            }
            try {
                console.log('232323');
                const response = yield this.authService.checkToken(token);
                if (response === null || response === void 0 ? void 0 : response.success) {
                    console.log(response.success, ' after success');
                    res.json({ accessToken: response.accessToken });
                }
                else {
                    res.clearCookie('rftn');
                    res.status(http_StatusCode_1.HttpStatus.FORBIDDEN).json({ message: response === null || response === void 0 ? void 0 : response.message });
                }
            }
            catch (error) {
                (0, logger_utils_1.logError)(error);
                console.log('error in the setnew token', error);
            }
        });
    }
};
AuthController = __decorate([
    (0, typedi_1.Service)(),
    __metadata("design:paramtypes", [authService_1.authService])
], AuthController);
exports.authController = typedi_1.Container.get(AuthController);
