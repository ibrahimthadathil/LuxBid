import { Service } from "typedi";
import { BasesocketService } from "../BaseSocketService";
import { Socket } from "socket.io";


@Service()
export class chatSocketService extends BasesocketService{

    protected registerHandlers(socket: Socket): void {
        
        socket.on('joinChatRoom',(roomId:string)=>{
            console.log(`Socket ${socket.id} joined chat room: ${roomId}`);
            socket.join(roomId)
            this.emitToRoom(roomId,'user joined',{roomId,userId:socket.id})
            this.usersCount(roomId)
        
        })

        socket.on('leaveChatRoom',(roomId:string)=>{
            console.log(`Socket ${socket.id} left chat room: ${roomId}`);
            socket.leave(roomId);
            this.usersCount(roomId)
        })

        socket.on("sendMessage", ({ roomId, user, message }) => {
            this.emitToRoom(roomId, "newMessage", { user, message });
        });
    }
    private usersCount(roomId:string):void{
        const onlineMembers = this.io?.sockets.adapter.rooms.get(roomId)?.size || 0            
            this.emitToRoom(roomId,'onlineUsers', { roomId, count: onlineMembers })
    }
}