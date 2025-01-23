import { logError } from "@/utils/logger_utils";
import { Server, Socket } from "socket.io";
import { Service } from "typedi";

@Service()
export class BasesocketService{
    protected io:Server|null =null
    initialize(server:any){
        if(!this.io){
            this.io=new Server(server,{
                cors:{
                    origin:process.env.server_URL,
                    methods:['GET','POST']
                }
            })
        }

        this.io.on('connection',(socket:Socket)=>{
            console.log(`Socket connected: ${socket.id} from chat`);

            this.registerHandlers(socket)
            
            socket.on("disconnect", () => {
                console.log(`Socket disconnected: ${socket.id}`);
              });
        })
    }
    protected registerHandlers(socket: Socket): void {

    }
    emitToRoom(room:string,event:string,data?:any){
        try {
            if(this.io)this.io?.to(room).emit(event,data)
            else throw new Error('Socket.IO instance is not initialized.')    
        } catch (error) {
            logError(error)
        }
    }
    emitToAll(event:string,data:any){
        try {
            if(this.io)this.io.emit(event,data)
                else throw new Error('Socket.IO instance is not initialized.')    
        } catch (error) {
            logError(error)
        }
        
    }
}