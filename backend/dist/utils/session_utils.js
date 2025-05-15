"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sessionConfig = void 0;
require("express-session");
exports.sessionConfig = {
    secret: process.env.SECRET_SESSION || 'secret_key',
    resave: false,
    saveUninitialized: true,
};
