"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BasesocketService = void 0;
const logger_utils_1 = require("@/utils/logger_utils");
const socket_io_1 = require("socket.io");
const typedi_1 = require("typedi");
let BasesocketService = class BasesocketService {
    constructor() {
        this.io = null;
        this.handlers = [];
    }
    initialize(server) {
        if (!this.io) {
            this.io = new socket_io_1.Server(server, {
                cors: {
                    origin: process.env.SERVER_URL,
                    methods: ['GET', 'POST']
                }
            });
        }
        this.io.on('connection', (socket) => {
            console.log(`Socket connected: ${socket.id} from base`);
            this.handlers.forEach(handler => {
                handler.registerHandlers(socket);
            });
            socket.on("disconnect", () => {
                console.log(`Socket disconnected: ${socket.id}`);
            });
        });
    }
    addHandlers(service) {
        this.handlers.push(service);
        service.io = this.io;
    }
    registerHandlers(socket) {
        console.log('encoutered 2112123');
        console.log(`[BaseSocketService] registerHandlers called for socket: ${socket.id}`);
    }
    emitToRoom(room, event, data) {
        var _a;
        try {
            if (this.io)
                (_a = this.io) === null || _a === void 0 ? void 0 : _a.to(room).emit(event, data);
            else
                throw new Error('Socket.IO instance is not initialized.');
        }
        catch (error) {
            (0, logger_utils_1.logError)(error);
        }
    }
    emitToAll(event, data) {
        try {
            if (this.io)
                this.io.emit(event, data);
            else
                throw new Error('Socket.IO instance is not initialized.');
        }
        catch (error) {
            (0, logger_utils_1.logError)(error);
        }
    }
};
exports.BasesocketService = BasesocketService;
exports.BasesocketService = BasesocketService = __decorate([
    (0, typedi_1.Service)()
], BasesocketService);
