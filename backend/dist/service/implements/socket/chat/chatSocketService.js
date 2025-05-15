"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
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
exports.chatSocketService = void 0;
const typedi_1 = require("typedi");
const BaseSocketService_1 = require("../BaseSocketService");
let chatSocketService = class chatSocketService extends BaseSocketService_1.BasesocketService {
    constructor() {
        super(...arguments);
        this.userRooms = new Map(); // Track users in each room
        this.typingUsers = new Map();
    }
    // protected registerHandlers(socket: Socket): void {
    //     socket.on('joinChatRoom',(roomId:string)=>{
    //         console.log(`Socket ${socket.id} joined chat room: ${roomId}`);
    //         socket.join(roomId)
    //         this.emitToRoom(roomId,'userJoined',{roomId,userId:socket.id})
    //         this.usersCount(roomId)
    //     })
    //     socket.on('leaveChatRoom',(roomId:string)=>{
    //         console.log(`Socket ${socket.id} left chat room: ${roomId}`);
    //         socket.leave(roomId);
    //         this.usersCount(roomId)
    //     })
    //     socket.on("sendMessage", ({ roomId, user, message }) => {
    //         this.emitToRoom(roomId, "newMessage", { user, message });
    //     });
    // }
    // private usersCount(roomId:string):void{
    //     console.log('tyrytrytr')
    //     const onlineMembers = this.io?.sockets.adapter.rooms.get(roomId)?.size || 0   
    //     console.log('users count :- ###',onlineMembers);         
    //     this.emitToRoom(roomId,'onlineUsers', { roomId, count: onlineMembers })
    // }
    registerHandlers(socket) {
        socket.on("addReaction", (_a) => __awaiter(this, [_a], void 0, function* ({ messageId, emoji, user, roomId }) {
            var _b;
            try {
                (_b = this.io) === null || _b === void 0 ? void 0 : _b.to(roomId).emit("reactionUpdated", {
                    messageId,
                    emoji,
                    user,
                    timestamp: new Date()
                });
            }
            catch (error) {
                console.error("Error handling reaction:", error);
            }
        }));
        socket.on('getRoomCounts', () => {
            this.userRooms.forEach((users, roomId) => {
                this.updateUsersCount(roomId);
            });
        });
        // Handle joining chat room
        socket.on('joinChatRoom', (roomId) => {
            var _a;
            console.log(`Socket ${socket.id} joined chat room: ${roomId}`);
            // Remove user from anyof previous rooms
            this.userRooms.forEach((users, room) => {
                if (users.has(socket.id)) {
                    users.delete(socket.id);
                    this.updateUsersCount(room);
                }
            });
            // Add user to new room
            if (!this.userRooms.has(roomId)) {
                this.userRooms.set(roomId, new Set());
            }
            (_a = this.userRooms.get(roomId)) === null || _a === void 0 ? void 0 : _a.add(socket.id);
            socket.join(roomId);
            this.updateUsersCount(roomId);
        });
        socket.on('leaveChatRoom', (roomId) => {
            var _a;
            console.log(`Socket ${socket.id} left chat room: ${roomId}`);
            (_a = this.userRooms.get(roomId)) === null || _a === void 0 ? void 0 : _a.delete(socket.id);
            socket.leave(roomId);
            this.updateUsersCount(roomId);
        });
        // Handle disconnection
        socket.on('disconnect', () => {
            this.userRooms.forEach((users, roomId) => {
                var _a;
                if (users.has(socket.id)) {
                    users.delete(socket.id);
                    (_a = this.typingUsers.get(roomId)) === null || _a === void 0 ? void 0 : _a.delete(socket.id);
                    this.updateUsersCount(roomId);
                }
            });
        });
        socket.on("sendMessage", ({ roomId, user, message, replyTo, attachments }) => {
            this.emitToRoom(roomId, "newMessage", {
                user,
                message,
                replyTo,
                attachments,
                timestamp: new Date()
            });
        });
        socket.on('typing', ({ roomId, userName }) => {
            var _a;
            if (!this.typingUsers.has(roomId)) {
                this.typingUsers.set(roomId, new Map());
            }
            (_a = this.typingUsers.get(roomId)) === null || _a === void 0 ? void 0 : _a.set(socket.id, userName);
            this.emitTypingStatus(roomId);
        });
        socket.on('stopTyping', ({ roomId }) => {
            var _a;
            (_a = this.typingUsers.get(roomId)) === null || _a === void 0 ? void 0 : _a.delete(socket.id);
            this.emitTypingStatus(roomId);
        });
    }
    emitTypingStatus(roomId) {
        var _a, _b;
        const typingUsers = Array.from(((_a = this.typingUsers.get(roomId)) === null || _a === void 0 ? void 0 : _a.values()) || []);
        let typingMessage = '';
        if (typingUsers.length === 1) {
            typingMessage = `${typingUsers[0]} is typing...`;
        }
        else if (typingUsers.length > 1) {
            typingMessage = `${typingUsers[0]} and others are typing...`;
        }
        (_b = this.io) === null || _b === void 0 ? void 0 : _b.to(roomId).emit('typingStatus', { typingMessage });
    }
    updateUsersCount(roomId) {
        var _a, _b;
        const count = ((_a = this.userRooms.get(roomId)) === null || _a === void 0 ? void 0 : _a.size) || 0;
        console.log(`Room ${roomId} has ${count} users`);
        // Emit to all clients, not just room members
        (_b = this.io) === null || _b === void 0 ? void 0 : _b.emit('onlineUsers', { roomId, count });
    }
};
exports.chatSocketService = chatSocketService;
exports.chatSocketService = chatSocketService = __decorate([
    (0, typedi_1.Service)()
], chatSocketService);
