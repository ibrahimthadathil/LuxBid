"use strict";
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
exports.connectRedis = exports.redisClient = void 0;
const logger_utils_1 = require("@/utils/logger_utils");
const redis_1 = require("redis");
const redisClient = (0, redis_1.createClient)({
    url: process.env.REDIS_URL || 'redis://localhost:6379'
});
exports.redisClient = redisClient;
const connectRedis = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield redisClient.connect();
    }
    catch (error) {
        (0, logger_utils_1.logError)(error);
    }
});
exports.connectRedis = connectRedis;
redisClient.on('error', err => (0, logger_utils_1.logError)(err));
redisClient.on('connect', () => console.log('Redis connected'));
