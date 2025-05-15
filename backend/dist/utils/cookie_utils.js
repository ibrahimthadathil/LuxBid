"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setCookie = void 0;
const setCookie = (res, type, token) => {
    console.log("problem not found");
    res.cookie(type, token, {
        httpOnly: true,
        sameSite: "strict",
        expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    });
    console.log("problem  found");
};
exports.setCookie = setCookie;
