"use strict";
// import { Socket } from "socket.io";
// import { Service } from "typedi";
// import { BasesocketService } from "../BaseSocketService";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuctionSocketService = void 0;
const typedi_1 = require("typedi");
const BaseSocketService_1 = require("../BaseSocketService");
let AuctionSocketService = class AuctionSocketService extends BaseSocketService_1.BasesocketService {
    registerHandlers(socket) {
        socket.on("joinAuctionRoom", (auctionId) => {
            console.log(`Socket ${socket.id} joined auction room: ${auctionId}`);
            socket.join(auctionId);
            this.emitToRoom(auctionId, "userJoined", { auctionId });
        });
        socket.on("leaveAuctionRoom", (auctionId) => {
            console.log(`Socket ${socket.id} left auction room: ${auctionId}`);
            socket.leave(auctionId);
        });
        socket.on("newBid", ({ auctionId, amount, bidderName }) => {
            console.log('reached here');
            this.emitToRoom(auctionId, "bidUpdated", {
                message: `New bid of ₹${amount} by ${bidderName}`,
            });
        });
        socket.on("bidAccepted", ({ auctionId, amount, bidderName }) => {
            this.emitToRoom(auctionId, "bidAccepted", {
                message: `Bid of ₹${amount} by ${bidderName} was accepted!`,
            });
        });
        socket.on("closeAuction", ({ auctionId }) => {
            this.emitToRoom(auctionId, "auctionClosed", {
                message: "This auction has been closed by the organizer",
            });
        });
    }
};
exports.AuctionSocketService = AuctionSocketService;
exports.AuctionSocketService = AuctionSocketService = __decorate([
    (0, typedi_1.Service)()
], AuctionSocketService);
