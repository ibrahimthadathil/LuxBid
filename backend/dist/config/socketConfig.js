"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.initializeSocket = void 0;
const auctionSocketService_1 = require("@/service/implements/socket/auction/auctionSocketService");
const BaseSocketService_1 = require("@/service/implements/socket/BaseSocketService");
const chatSocketService_1 = require("@/service/implements/socket/chat/chatSocketService");
// import { SocketService } from "@/service/implements/socket/socket_Service";
const logger_utils_1 = require("@/utils/logger_utils");
const typedi_1 = __importDefault(require("typedi"));
const initializeSocket = (server) => {
    try {
        const auctionSocket = typedi_1.default.get(auctionSocketService_1.AuctionSocketService);
        const chatSocket = typedi_1.default.get(chatSocketService_1.chatSocketService);
        const baseSocket = typedi_1.default.get(BaseSocketService_1.BasesocketService);
        baseSocket.initialize(server);
        baseSocket.addHandlers(auctionSocket);
        baseSocket.addHandlers(chatSocket);
        // chatsocket.initialize(server)
    }
    catch (error) {
        console.log('error from socket config');
        (0, logger_utils_1.logError)(error);
    }
};
exports.initializeSocket = initializeSocket;
