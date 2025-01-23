import { Socket } from "socket.io";
import { Service } from "typedi";
import { BasesocketService } from "../BaseSocketService";

@Service()
export class AuctionSocketService extends BasesocketService {
    protected registerHandlers(socket: Socket): void {
        socket.on("joinAuctionRoom", (auctionId: string) => {
            console.log(`Socket ${socket.id} joined auction room: ${auctionId}`);
            socket.join(auctionId);
            this.emitToRoom(auctionId, "userJoined", { auctionId, userId: socket.id });
        });

        socket.on("bidAccepted", ({ AuctionId, amount, user }) => {
            this.emitToRoom(AuctionId, "notifyBidAccepted", {
                message: `Bid of ₹${amount} by ${user} is accepted.`,
            });
        });

        socket.on("disconnect", () => {
            console.log(`Socket disconnected from auction: ${socket.id}`);
        });
    }
}
