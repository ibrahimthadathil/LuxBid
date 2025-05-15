"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.tokenService = void 0;
const jwt_util_1 = require("../../../utils/jwt_util");
const typedi_1 = require("typedi");
let tokenService = class tokenService {
    generate_AccessToken(payload) {
        return (0, jwt_util_1.generateAccessToken)(payload);
    }
    generate_RefreshToken(payload) {
        return (0, jwt_util_1.generateRefreshToken)(payload);
    }
    verify_Token(token) {
        return (0, jwt_util_1.verifyToken)(token);
    }
};
exports.tokenService = tokenService;
exports.tokenService = tokenService = __decorate([
    (0, typedi_1.Service)()
], tokenService);
