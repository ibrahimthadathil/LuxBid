"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generate_OTP = void 0;
const generate_OTP = () => {
    const OTP = Math.floor(100000 + Math.random() * 900000) + '';
    return OTP;
};
exports.generate_OTP = generate_OTP;
