import { AuctionSocketService } from "@/service/implements/socket/auction/auctionSocketService";
import { BasesocketService } from "@/service/implements/socket/BaseSocketService";
import { chatSocketService } from "@/service/implements/socket/chat/chatSocketService";
// import { SocketService } from "@/service/implements/socket/socket_Service";
import { logError } from "@/utils/logger_utils";
import http from "http";
import Container from "typedi";


export const initializeSocket =(server:http.Server)=>{
    try {
        const auctionSocket = Container.get(AuctionSocketService);
        const chatSocket = Container.get(chatSocketService)
        const baseSocket = Container.get(BasesocketService);
      
        baseSocket.initialize(server)
        baseSocket.addHandlers(auctionSocket);
        baseSocket.addHandlers(chatSocket);
        // chatsocket.initialize(server)
    } catch (error) {
        console.log('error from socket config');
        logError(error)

    }
}