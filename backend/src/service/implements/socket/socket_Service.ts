import { Service } from "typedi";
import { Server, Socket } from "socket.io";

@Service()
export class SocketService {
  private io: Server | null = null;

  initialize(server: any) {
    try {
      if (!this.io) {
        this.io = new Server(server, {
          cors: {
            origin: process.env.server_URL, // Frontend URL
            methods: ["GET", "POST"],
          },
        });

        this.io.on("connection", (socket: Socket) => {

          console.log(`Socket connected: ${socket.id} from auction`);

          socket.on("joinAuctionRoom", (auctionId: string) => {
            try {
              console.log(`Socket ${socket.id} joined room: ${auctionId}`);
              socket.join(auctionId);
              this.io?.to(auctionId).emit("userJoined", { auctionId, userId: socket.id });

            } catch (error) {
              console.error(`Error in joinAuctionRoom: ${(error as Error).message}`);
              socket.emit("error", { message: "Failed to join room." });
            }
          });

          socket.on("disconnect", () => {
            try {
              console.log(`Socket disconnected: ${socket.id}`);
            } catch (error) {
              console.error(`Error in disconnect handler: ${(error as Error).message}`);
            }
          });

          socket.on('bidAccepted',({AuctionId,amount,user})=>{
            socket.to(AuctionId).emit('notifyBidAccepted',{message:`Bid of ₹${amount} by ${user} is Accepted`})
          })


          socket.on("error", (error: Error) => {
            console.error(`Socket error: ${error.message}`);
          });


        });
      }
    } catch (error) {
      console.error(`Error initializing Socket.IO: ${(error as Error).message}`);
    }
  }

  emitToRoom(room: string, event: string, data?: any) {
    try {
      if (this.io) {
        this.io.to(room).emit(event, data);
      } else {
        console.error("Socket.IO instance is not initialized.");
      }
    } catch (error) {
      console.error(`Error emitting to room ${room}: ${(error as Error).message}`);
    }
  }

  emitToAll(event: string, data: any) {
    try {
      if (this.io) {
        this.io.emit(event, data);
      } else {
        console.error("Socket.IO instance is not initialized.");
      }
    } catch (error) {
      console.error(`Error emitting to all clients: ${(error as Error).message}`);
    }
  }
}
