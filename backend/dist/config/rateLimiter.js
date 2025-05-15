"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.apiLimiter = void 0;
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const apiLimiter = (windowMs, max) => {
    return (0, express_rate_limit_1.default)({
        windowMs,
        max, // limit each IP to 100 requests per window
        standardHeaders: true, // Return rate limit info in headers
        legacyHeaders: false, // Disable `X-RateLimit-*` headers
        message: 'Too many requests , please try again later.',
    });
};
exports.apiLimiter = apiLimiter;
