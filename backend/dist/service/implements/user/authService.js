"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
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
exports.authService = void 0;
const hash_utils_1 = require("../../../utils/hash_utils");
const jwt_util_1 = require("../../../utils/jwt_util");
const jsonwebtoken_1 = require("jsonwebtoken");
const typedi_1 = require("typedi");
const userRepository_1 = require("../../../repositories/implimentation/userRepository");
const otpService_1 = require("./otpService");
const tokenService_1 = require("./tokenService");
const emailService_1 = require("./emailService");
const logger_utils_1 = require("@/utils/logger_utils");
let authService = class authService {
    constructor(userRepo, otpService, tokenservice, emailservice) {
        this.userRepo = userRepo;
        this.otpService = otpService;
        this.tokenservice = tokenservice;
        this.emailservice = emailservice;
    }
    create_User(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const existUser = yield this.userRepo.findUserByEmail(email);
            if (existUser && existUser.isVerified)
                return { message: "user already exist" };
            if (existUser && !existUser.isVerified) {
                const OTP = yield this.otpService.createOTP(existUser.email);
                const token = this.tokenservice.generate_AccessToken({
                    email,
                    id: existUser._id,
                });
                yield this.emailservice.sendOtpEmail(email, "Registration", OTP);
                return { token, success: false, message: "OTP hasbeen send" };
            }
            const Accesstoken = (0, jwt_util_1.generateAccessToken)({ email });
            return { token: Accesstoken, success: true, message: "Complete Profile" };
        });
    }
    verify_otp(otp, token) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                (0, logger_utils_1.logDebug)('reached tp verify');
                const { email, id } = this.tokenservice.verify_Token(token);
                if (email) {
                    const isValidOTP = yield this.otpService.verifyOTP(email, otp);
                    if (!isValidOTP)
                        return { success: false, message: "invalid OTP" };
                    const updatedUser = yield this.userRepo.update(id, {
                        isVerified: true,
                    });
                    console.log("updated user", updatedUser);
                    const Accesstoken = this.tokenservice.generate_AccessToken({
                        email,
                        id,
                    });
                    const RefreshToken = this.tokenservice.generate_RefreshToken({
                        email,
                        id,
                    });
                    console.log('000');
                    return {
                        success: true,
                        token: Accesstoken,
                        user: updatedUser === null || updatedUser === void 0 ? void 0 : updatedUser._id,
                        refresh: RefreshToken,
                        message: "otp verification completed",
                        name: updatedUser === null || updatedUser === void 0 ? void 0 : updatedUser.firstName,
                        email: updatedUser === null || updatedUser === void 0 ? void 0 : updatedUser.email,
                    };
                }
                else
                    return { success: false, message: "Access denied " };
            }
            catch (error) {
                console.log(error);
                throw new Error("Token verification failed");
            }
        });
    }
    register_User(userDetails, token) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email } = this.tokenservice.verify_Token(token);
                if (email) {
                    const hashedPass = yield (0, hash_utils_1.hashPassword)(userDetails.password);
                    userDetails.email = email;
                    userDetails.password = hashedPass;
                    const newUser = yield this.userRepo.create(userDetails);
                    if (newUser) {
                        const Accesstoken = this.tokenservice.generate_AccessToken({
                            id: newUser._id,
                            email,
                        });
                        const OTP = yield this.otpService.createOTP(email); //   otp consoled inside
                        yield this.emailservice.sendOtpEmail(email, "Registration", OTP);
                        return {
                            success: true,
                            message: "Email hasbeen send...",
                            token: Accesstoken,
                        };
                    }
                    else {
                        throw new Error("couldn't save user");
                    }
                }
                else {
                    return { success: false, message: "invalid token" };
                }
            }
            catch (error) {
                console.log(error.message);
                return { success: false, message: error.message };
            }
        });
    }
    verify_SignIn(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const exist = yield this.userRepo.findUserByEmail(email);
                console.log(exist);
                if (exist) {
                    console.log(email, password, exist.password, '88');
                    const passwordCheck = yield (0, hash_utils_1.comparePassword)(password, exist.password);
                    console.log('reached here');
                    if (!passwordCheck) {
                        return { success: false, message: "Invalid password...!" };
                    }
                    else {
                        if (exist.isActive) {
                            const Accesstoken = this.tokenservice.generate_AccessToken({
                                email: exist.email,
                                id: exist._id,
                            });
                            const RefreshToken = this.tokenservice.generate_RefreshToken({
                                email: exist.email,
                                id: exist._id,
                            });
                            const roleAccess = this.tokenservice.generate_AccessToken({
                                id: exist._id, role: exist.role
                            });
                            return {
                                success: true,
                                // user : id,
                                refresh: RefreshToken,
                                message: "succesfully logged In..!",
                                token: Accesstoken,
                                email: exist.email,
                                name: exist.firstName,
                                role: exist.role,
                                roleAccess
                            };
                        }
                        else {
                            return {
                                success: false,
                                message: "Entry restricted, Contact support",
                            };
                        }
                    }
                }
                else {
                    return { success: false, message: "Not a verified user" };
                }
            }
            catch (error) {
                console.log(error, "from signIn");
                return { success: false, message: "An error occurred while signing in." };
            }
        });
    }
    verify_Google(userDetails) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const existUser = yield this.userRepo.findUserByEmail(userDetails.email);
                if (existUser) {
                    const Accesstoken = (0, jwt_util_1.generateAccessToken)({
                        id: existUser._id,
                        email: existUser.email,
                    });
                    const RefreshToken = this.tokenservice.generate_RefreshToken({
                        id: existUser._id,
                        email: existUser.email,
                    });
                    const roleAccess = this.tokenservice.generate_AccessToken({
                        id: existUser._id, role: existUser.role
                    });
                    return {
                        success: true,
                        token: Accesstoken,
                        refresh: RefreshToken,
                        role: existUser.role,
                        message: "Google Authentication successful",
                        roleAccess
                    };
                }
                const randomPassword = yield (0, hash_utils_1.RandomPassword)();
                userDetails.password = randomPassword;
                userDetails.isVerified = true;
                const response = yield this.userRepo.create(userDetails);
                const Accesstoken = (0, jwt_util_1.generateAccessToken)({
                    id: response._id,
                    email: response.email,
                });
                const RefreshToken = this.tokenservice.generate_RefreshToken({
                    id: response._id,
                    email: response.email,
                });
                return {
                    success: true,
                    token: Accesstoken,
                    refresh: RefreshToken,
                    message: "Google Authentication successful",
                };
            }
            catch (error) {
                console.log(error);
                return { success: false, message: error.message };
            }
        });
    }
    forget_Password(email) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log(email, "12345");
                const existUser = yield this.userRepo.findUserByEmail(email);
                console.log(existUser, "us");
                if (!existUser)
                    return { success: false, message: "you are not a verified user" };
                const OTP = yield this.otpService.createOTP(email);
                const AccessToken = this.tokenservice.generate_AccessToken({
                    id: existUser._id,
                    email: existUser.email,
                });
                yield this.emailservice.sendOtpEmail(existUser.email, "Forgett password", OTP);
                return {
                    success: true,
                    token: AccessToken,
                    message: " OTP hasbeen send",
                };
            }
            catch (error) {
                console.log(error);
                return { success: false, message: error.message };
            }
        });
    }
    reset_otp(token, otp) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email } = this.tokenservice.verify_Token(token);
                if (email) {
                    const checkOTP = yield this.otpService.verifyOTP(email, otp);
                    if (checkOTP) {
                        const user = yield this.userRepo.findUserByEmail(email);
                        const AccessToken = this.tokenservice.generate_AccessToken({
                            id: user === null || user === void 0 ? void 0 : user._id,
                            email,
                        });
                        return { success: true, message: "otp verified", token: AccessToken };
                    }
                    else {
                        return { success: false, message: "invalid OTP" };
                    }
                }
                return { success: false, message: "Access token failed" };
            }
            catch (error) {
                console.log(error);
                return { success: false, message: error.message };
            }
        });
    }
    reset_Password(password, confirmPassword, Token) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (password !== confirmPassword)
                    return { success: false, message: "password not match" };
                const hashedPass = yield (0, hash_utils_1.hashPassword)(password);
                const { email, success } = this.tokenservice.verify_Token(Token);
                if (success) {
                    const user = yield this.userRepo.findUserByEmail(email);
                    if (!user)
                        return { success: false, message: "Invalid user email" };
                    yield this.userRepo.update(user === null || user === void 0 ? void 0 : user._id, {
                        password: hashedPass,
                    });
                    return { success: true, message: "password hasbeen changed" };
                }
                console.log("jjj");
                return { success: false, message: "Invalid access" };
            }
            catch (error) {
                console.log(error);
                return { success: false, message: error.message };
            }
        });
    }
    checkToken(token) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = this.tokenservice.verify_Token(token);
                if (typeof response === 'object' && response !== null && 'id' in response) {
                    const newAccessToken = this.tokenservice.generate_AccessToken({ email: response.email, id: response.id });
                    return { success: true, message: "new token created", accessToken: newAccessToken };
                }
            }
            catch (error) {
                if (error instanceof jsonwebtoken_1.JsonWebTokenError) {
                    return { success: false, message: "Refresh token expired, please log in again" };
                }
                console.error("Error verifying refresh token:", error);
            }
        });
    }
};
exports.authService = authService;
exports.authService = authService = __decorate([
    (0, typedi_1.Service)(),
    __metadata("design:paramtypes", [userRepository_1.userRepository,
        otpService_1.otpService,
        tokenService_1.tokenService,
        emailService_1.emailService])
], authService);
