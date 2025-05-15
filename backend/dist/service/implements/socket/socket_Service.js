"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SocketService = void 0;
const typedi_1 = require("typedi");
const socket_io_1 = require("socket.io");
let SocketService = class SocketService {
    constructor() {
        this.io = null;
    }
    initialize(server) {
        try {
            if (!this.io) {
                this.io = new socket_io_1.Server(server, {
                    cors: {
                        origin: process.env.server_URL, // Frontend URL
                        methods: ["GET", "POST"],
                    },
                });
                this.io.on("connection", (socket) => {
                    console.log(`Socket connected: ${socket.id} from auction`);
                    socket.on("joinAuctionRoom", (auctionId) => {
                        var _a;
                        try {
                            console.log(`Socket ${socket.id} joined room: ${auctionId}`);
                            socket.join(auctionId);
                            (_a = this.io) === null || _a === void 0 ? void 0 : _a.to(auctionId).emit("userJoined", { auctionId, userId: socket.id });
                        }
                        catch (error) {
                            console.error(`Error in joinAuctionRoom: ${error.message}`);
                            socket.emit("error", { message: "Failed to join room." });
                        }
                    });
                    socket.on("disconnect", () => {
                        try {
                            console.log(`Socket disconnected: ${socket.id}`);
                        }
                        catch (error) {
                            console.error(`Error in disconnect handler: ${error.message}`);
                        }
                    });
                    socket.on('bidAccepted', ({ AuctionId, amount, user }) => {
                        socket.to(AuctionId).emit('notifyBidAccepted', { message: `Bid of ₹${amount} by ${user} is Accepted` });
                    });
                    socket.on("error", (error) => {
                        console.error(`Socket error: ${error.message}`);
                    });
                });
            }
        }
        catch (error) {
            console.error(`Error initializing Socket.IO: ${error.message}`);
        }
    }
    emitToRoom(room, event, data) {
        try {
            if (this.io) {
                this.io.to(room).emit(event, data);
            }
            else {
                console.error("Socket.IO instance is not initialized.");
            }
        }
        catch (error) {
            console.error(`Error emitting to room ${room}: ${error.message}`);
        }
    }
    emitToAll(event, data) {
        try {
            if (this.io) {
                this.io.emit(event, data);
            }
            else {
                console.error("Socket.IO instance is not initialized.");
            }
        }
        catch (error) {
            console.error(`Error emitting to all clients: ${error.message}`);
        }
    }
};
exports.SocketService = SocketService;
exports.SocketService = SocketService = __decorate([
    (0, typedi_1.Service)()
], SocketService);
