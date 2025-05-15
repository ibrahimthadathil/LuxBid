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
exports.admin_Service = void 0;
const typedi_1 = require("typedi");
const admin_Repository_1 = require("../../../repositories/implimentation/admin/admin_Repository");
const hash_utils_1 = require("../../../utils/hash_utils");
const jwt_util_1 = require("../../../utils/jwt_util");
const logger_utils_1 = require("@/utils/logger_utils");
let admin_Service = class admin_Service {
    constructor(adminRepo) {
        this.adminRepo = adminRepo;
    }
    admin_Signin(email, Password) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const exist = yield this.adminRepo.findByEmail(email);
                if (exist) {
                    const password = yield (0, hash_utils_1.comparePassword)(Password, exist.password);
                    if (!password)
                        return { success: false, message: "Invalid Credentials" };
                    const AccessToken = (0, jwt_util_1.generateAccessToken)({
                        id: exist._id,
                        email: exist.email,
                    });
                    const RefreshToken = (0, jwt_util_1.generateRefreshToken)({
                        id: exist._id,
                        email: exist.email,
                    });
                    return {
                        success: true,
                        refresh: RefreshToken,
                        access: AccessToken,
                        message: "Logged in successfully",
                        name: exist.fullName,
                        adminEmail: email,
                    };
                }
                else {
                    return { success: false, message: "Invalid Credentials" };
                }
            }
            catch (error) {
                (0, logger_utils_1.logError)(error);
                throw new Error(error.message);
            }
        });
    }
};
exports.admin_Service = admin_Service;
exports.admin_Service = admin_Service = __decorate([
    (0, typedi_1.Service)(),
    __metadata("design:paramtypes", [admin_Repository_1.adminRepository])
], admin_Service);
