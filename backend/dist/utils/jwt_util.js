"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateRefreshToken = exports.verifyToken = exports.generateAccessToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const logger_utils_1 = require("./logger_utils");
const generateAccessToken = (data) => {
    const skey = process.env.JWT_KEY;
    return jsonwebtoken_1.default.sign(data, skey, { expiresIn: '24h' });
};
exports.generateAccessToken = generateAccessToken;
const verifyToken = (token) => {
    const skey = process.env.JWT_KEY;
    try {
        return jsonwebtoken_1.default.verify(token, skey);
    }
    catch (error) {
        (0, logger_utils_1.logError)(error);
        console.log('error from jwt', 'invalid token');
        return { success: false, message: 'invalid token' };
    }
};
exports.verifyToken = verifyToken;
const generateRefreshToken = (data) => {
    const skey = process.env.JWT_KEY;
    return jsonwebtoken_1.default.sign(data, skey, { expiresIn: '7d' });
};
exports.generateRefreshToken = generateRefreshToken;
