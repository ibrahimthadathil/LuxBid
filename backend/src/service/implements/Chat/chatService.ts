import { responseMessage } from "@/enums/http_StatusCode";
import { categoryRepository } from "@/repositories/implimentation/admin/category_Repository";
import { messageRepository } from "@/repositories/implimentation/chat/messageRepositury";
import { logError } from "@/utils/logger_utils";
import { Service } from "typedi";

@Service()
export class chatService {
  constructor(
    private categoryRepo: categoryRepository,
    private chatRepo: messageRepository
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

  async send_Message(groupId: string, content: string, user: string) {
    try {
      const response = await this.chatRepo.create({
        category: groupId,
        user,
        content,
      });
      if(response)return{success:true}
      else return {success:false}
    } catch (error) {
      logError(error);
      return {success:false}
    }
  }
}
