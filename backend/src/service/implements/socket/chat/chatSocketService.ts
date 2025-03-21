import { Service } from "typedi";
import { BasesocketService } from "../BaseSocketService";
import { Socket } from "socket.io";


@Service()
export class chatSocketService extends BasesocketService{
    private userRooms: Map<string, Set<string>> = new Map(); // Track users in each room
    private typingUsers: Map<string, Map<string, string>> = new Map();
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
    protected registerHandlers(socket: Socket): void {

        socket.on("addReaction", async ({ messageId, emoji, user, roomId }) => {
            try {
                this.io?.to(roomId).emit("reactionUpdated", {
                    messageId,
                    emoji,
                    user,
                    timestamp: new Date()
                });
            } catch (error) {
                console.error("Error handling reaction:", error);
                
            }
        });

        socket.on('getRoomCounts', () => {
            this.userRooms.forEach((users, roomId) => {
                this.updateUsersCount(roomId);
            });
        });

        // Handle joining chat room
        socket.on('joinChatRoom', (roomId: string) => {
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
            this.userRooms.get(roomId)?.add(socket.id);
            socket.join(roomId);
            
            this.updateUsersCount(roomId);
        });
            
        socket.on('leaveChatRoom', (roomId: string) => {
            console.log(`Socket ${socket.id} left chat room: ${roomId}`);
            this.userRooms.get(roomId)?.delete(socket.id);
            socket.leave(roomId);
            this.updateUsersCount(roomId);
        });

        // Handle disconnection
        socket.on('disconnect', () => {
            this.userRooms.forEach((users, roomId) => {
                if (users.has(socket.id)) {
                    users.delete(socket.id);
                    this.typingUsers.get(roomId)?.delete(socket.id);
                    this.updateUsersCount(roomId);
                }
            });
        });

        socket.on("sendMessage", ({ roomId, user, message,replayTo }) => {
            this.emitToRoom(roomId, "newMessage", { user, message ,replayTo});
        });
        socket.on('typing', ({ roomId, userName }) => {
            if (!this.typingUsers.has(roomId)) {
                this.typingUsers.set(roomId, new Map());
            }
            
            this.typingUsers.get(roomId)?.set(socket.id, userName);
            this.emitTypingStatus(roomId);
        });

        socket.on('stopTyping', ({ roomId }) => {
            this.typingUsers.get(roomId)?.delete(socket.id);
            this.emitTypingStatus(roomId);
        });

    }
    private emitTypingStatus(roomId: string): void {
        const typingUsers = Array.from(this.typingUsers.get(roomId)?.values() || []);
        
        let typingMessage = '';
        if (typingUsers.length === 1) {
            typingMessage = `${typingUsers[0]} is typing...`;
        } else if (typingUsers.length > 1) {
            typingMessage = `${typingUsers[0]} and others are typing...`;
        }

        this.io?.to(roomId).emit('typingStatus', { typingMessage });
    }
    private updateUsersCount(roomId: string): void {
        const count = this.userRooms.get(roomId)?.size || 0;
        console.log(`Room ${roomId} has ${count} users`);
        // Emit to all clients, not just room members
        this.io?.emit('onlineUsers', { roomId, count });
    }
}