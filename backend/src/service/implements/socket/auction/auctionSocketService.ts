import { Socket } from "socket.io";
import { Service } from "typedi";
import { BasesocketService } from "../BaseSocketService";

@Service()
export class AuctionSocketService extends BasesocketService {
    
    protected registerHandlers(socket: Socket): void {
        
        socket.on("joinAuctionRoom", (auctionId: string) => {
            console.log(`Socket ${socket.id} joined auction room: ${auctionId}`);
            socket.join(auctionId);
            this.emitToRoom(auctionId, "userJoined", { auctionId });
        });

        socket.on("leaveAuctionRoom", (auctionId: string) => {
            console.log(`Socket ${socket.id} left auction room: ${auctionId}`);
            socket.leave(auctionId);
        });

        socket.on("newBid", ({ auctionId, amount, bidderName }) => {            
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

}