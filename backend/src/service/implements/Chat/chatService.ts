import { responseMessage } from "@/enums/http_StatusCode";
import { categoryRepository } from "@/repositories/implimentation/admin/category_Repository";
import { messageRepository } from "@/repositories/implimentation/chat/messageRepositury";
import { logError } from "@/utils/logger_utils";
import Container, { Service } from "typedi";
import { s3Service } from "../user/uploadService";
import { log } from "node:console";

@Service()
export class chatService {
  constructor(
    private categoryRepo: categoryRepository,
    private chatRepo: messageRepository,
    private s3Service:s3Service
  ) {}

  async fetchAllGroups() {
    try {
      const groups = await this.categoryRepo.fetchgroup();
      if (groups)
        return {
          success: true,
          data: groups,
          message: responseMessage.SUCCESS_MESSAGE,
        };
      else throw new Error(responseMessage.NOT_FOUND);
    } catch (error) {
      logError(error);
      return { success: false, message: responseMessage.ERROR_MESSAGE };
    }
  }
  async getAllMessages(groupId: string, queries: any) {
    try {
      const { page = 1 } = queries;
      const response = await this.chatRepo.findAllChatsByCategory(
        groupId,
        page
      );
      if (response) return { success: true, data: response };
      else return { success: false, message: responseMessage.ERROR_MESSAGE };
    } catch (error) {
      logError(error);
      return { success: false, message: responseMessage.ERROR_MESSAGE };
    }
  }

  async send_Message(groupId: string, content: string, user: string,files:Express.Multer.File[]) {
    try {
      let attachments: string[] = [];
    
      if (files && files.length > 0) {
        const s = Container.get(s3Service);
        const uploadResult = await s.upload_File(files, 'chat-attachments');
        attachments = Array.isArray(uploadResult) 
          ? uploadResult.map(result => result.Location)
          : [uploadResult.Location];
      }
      
      const response = await this.chatRepo.create({
        category: groupId,
        user,
        content,attachments
      });
      console.log(response)
      
      if(response)return{success:true}
      else return {success:false}
    } catch (error) {
      logError(error);
      return {success:false}
    }
  }
  async addReaction(messageId: string, emoji: string, userId: string) {
    try {
        const response = await this.chatRepo.addReaction(messageId, emoji, userId);
        console.log(response);
        
        if (response) {
            return { success: true, data: response };
        }
        return { success: false };
    } catch (error) {
        logError(error);
        return { success: false };
    }
}

}
