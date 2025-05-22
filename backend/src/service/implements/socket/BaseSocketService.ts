import { logError } from "@/utils/logger_utils";
import { Server, Socket } from "socket.io";
import { Service } from "typedi";
import { Server as HttpServer } from "http";

@Service()
export class BasesocketService{
    protected io:Server|null =null
    private handlers: BasesocketService[] = [];
    initialize(server:HttpServer){
        if(!this.io){
            this.io = new Server(server,{
                cors:{
                    origin:process.env.SERVER_URL,
                    methods:['GET','POST']
                }
            })
        }
        
        
        this.io.on('connection',(socket:Socket)=>{
            console.log(`Socket connected: ${socket.id} from base`);
                                
            this.handlers.forEach(handler => {
                handler.registerHandlers(socket);
            });

            socket.on("disconnect", () => {
                console.log(`Socket disconnected: ${socket.id}`);
              });
        })
    }
    addHandlers(service: BasesocketService) {
        this.handlers.push(service);
        service.io = this.io; 
    }
    protected registerHandlers(socket: Socket): void {
        console.log('encoutered 2112123');
        console.log(`[BaseSocketService] registerHandlers called for socket: ${socket.id}`);
    }
    
    emitToRoom<T>(room:string,event:string,data?:T){
        try {
            if(this.io)this.io?.to(room).emit(event,data)
            else throw new Error('Socket.IO instance is not initialized.')    
        } catch (error) {
            logError(error)
        }
    }
    emitToAll<T>(event:string,data:T){
        try {
            if(this.io)this.io.emit(event,data)
                else throw new Error('Socket.IO instance is not initialized.')    
        } catch (error) {
            logError(error)
        }
        
    }
}