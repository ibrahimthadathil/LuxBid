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
exports.adminController = void 0;
const typedi_1 = __importStar(require("typedi"));
const admin_AuthService_1 = require("../../../service/implements/admin/admin_AuthService");
const admin_userService_1 = require("../../../service/implements/admin/admin_userService");
const cookie_utils_1 = require("../../../utils/cookie_utils");
const http_StatusCode_1 = require("@/enums/http_StatusCode");
const logger_utils_1 = require("@/utils/logger_utils");
let AdminController = class AdminController {
    constructor(adminService, userService) {
        this.adminService = adminService;
        this.userService = userService;
    }
    adminSignIn(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, password } = req.body;
                const { success, access, message, adminEmail, name, refresh } = yield this.adminService.admin_Signin(email, password);
                if (success) {
                    (0, cookie_utils_1.setCookie)(res, 'admtkn', refresh);
                    res
                        .status(http_StatusCode_1.HttpStatus.OK)
                        .json({ message: message, token: access, success: true, email: adminEmail, name });
                }
                else {
                    res
                        .status(http_StatusCode_1.HttpStatus.UNAUTHORIZED)
                        .json({ message: http_StatusCode_1.responseMessage.INVALID_REQUEST, success: false });
                }
            }
            catch (error) {
                (0, logger_utils_1.logError)(error);
                res.status(http_StatusCode_1.HttpStatus.INTERNAL_SERVER_ERROR).json({ message: error.message });
            }
        });
    }
    fetchUsers(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const role = req.params.role;
                const { data, success } = yield this.userService.findAll_Users(role);
                if (success) {
                    res.status(http_StatusCode_1.HttpStatus.OK).json({ data });
                }
                else {
                    throw new Error('failed to fetch user');
                }
            }
            catch (error) {
                (0, logger_utils_1.logError)(error);
                res.status(http_StatusCode_1.HttpStatus.INTERNAL_SERVER_ERROR).json({ message: error.message });
            }
        });
    }
    updateUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const email = req.params.id;
                if (email) {
                    const response = yield this.userService.update_User(email);
                    if (response.success) {
                        res.status(http_StatusCode_1.HttpStatus.OK).json({ message: response.message });
                    }
                    else {
                        res.status(http_StatusCode_1.HttpStatus.BAD_REQUEST).json({ message: response.message });
                    }
                }
            }
            catch (error) {
                (0, logger_utils_1.logError)(error);
                res.status(http_StatusCode_1.HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'internal server error' });
            }
        });
    }
    adminLogout(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                res.clearCookie('admtkn');
                res.status(http_StatusCode_1.HttpStatus.OK).json({ message: 'loggedOut' });
            }
            catch (error) {
                (0, logger_utils_1.logError)(error);
                res.status(http_StatusCode_1.HttpStatus.INTERNAL_SERVER_ERROR).json({ message: http_StatusCode_1.responseMessage.INTERNAL_ERROR });
            }
        });
    }
};
AdminController = __decorate([
    (0, typedi_1.Service)(),
    __metadata("design:paramtypes", [admin_AuthService_1.admin_Service,
        admin_userService_1.admin_userService])
], AdminController);
exports.adminController = typedi_1.default.get(AdminController);
