import { HttpStatus, responseMessage } from "@/enums/http_StatusCode";
import { chatService } from "@/service/implements/Chat/chatService";
import { AuthRequest } from "@/types/api";
import { logError } from "@/utils/logger_utils";
import { Request, Response } from "express";
import Container, { Service } from "typedi";

@Service()
export class chatController{

    constructor(
        private chatService : chatService
    ){}
    async fetchChatGroups(req:Request,res:Response){
        try {
            
       const {message,success,data}= await this.chatService.fetchAllGroups()
       if(success)res.status(HttpStatus.OK).json({data,success})
        else res.status(HttpStatus.NOT_FOUND).json({success,message:responseMessage.NOT_FOUND})
        } catch (error) {
         res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({message:responseMessage.ERROR_MESSAGE})   
        }
    }
    async getMessagesBycategory(req:Request,res:Response){
        try {
           const {success,data,message}= await this.chatService.getAllMessages(req.params.categoryId,req.query)
           if(success)res.status(HttpStatus.OK).json({success,data})
            else res.status(HttpStatus.SERVICE_UNAVAILABLE).json({success,message})
        } catch (error) {
            logError(error)
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({message:responseMessage.ERROR_MESSAGE})
        }
    }
    async sendMessage(req:AuthRequest,res:Response){
        try {
            const {text} = req.body
            const files = req.files as Express.Multer.File[];
            const response = await this.chatService.send_Message(req.params.id,text,req.user as string,files)
            if(response.success) {
                res.status(HttpStatus.OK).json({
                    success: true,
                    attachments: response.attachments
                });
            }
        } catch (error) {
            logError(error)
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({message:responseMessage.ERROR_MESSAGE})
        }
    }  
    async addReaction(req: AuthRequest, res: Response) {
        try {
            const { messageId } = req.params;
            const { emoji } = req.body;
            const userId = req.user as string;

            const { success, data } = await this.chatService.addReaction(messageId, emoji, userId);
            
            if (success) {
                res.status(HttpStatus.OK).json({ success: true, data });
            } else {
                res.status(HttpStatus.BAD_REQUEST).json({ 
                    success: false, 
                    message: responseMessage.ERROR_MESSAGE 
                });
            }
        } catch (error) {
            logError(error);
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                message: responseMessage.ERROR_MESSAGE
            });
        }
    }

}

export const chat_Controller = Container.get(chatController)