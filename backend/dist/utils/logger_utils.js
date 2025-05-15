"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logDebug = exports.logInfo = exports.logError = void 0;
const path_1 = __importDefault(require("path"));
const winston_1 = __importDefault(require("winston"));
const { createLogger, format, transports, addColors } = winston_1.default;
addColors({
    error: "red",
    warn: "yellow",
    info: "green",
    http: "magenta",
    debug: "blue",
});
const customFormat = format.combine(format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }), format.printf((info) => {
    return ` ${info.timestamp} ${info.level} : ${info.message}`;
}), format.json(), format.colorize({ all: true }));
const logger = createLogger({
    level: "debug",
    format: customFormat,
    transports: [
        new transports.Console(),
        new transports.File({
            filename: path_1.default.join(__dirname, "logs", "combined.log"),
            level: "debug",
        }),
        new transports.File({
            filename: path_1.default.join(__dirname, "logs", "errors.log"),
            level: "error",
        }),
    ],
});
// for errr
const logError = (error) => {
    logger.error(error.message);
};
exports.logError = logError;
const logInfo = (message) => {
    logger.info(message);
};
exports.logInfo = logInfo;
const logDebug = (message) => {
    logger.debug(message);
};
exports.logDebug = logDebug;
exports.default = logger;
