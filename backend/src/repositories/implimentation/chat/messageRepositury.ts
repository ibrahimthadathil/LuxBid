import { IMessage, Message } from "@/models/chatModel";
import { BasRepository } from "../baseRepository";
import { Service } from "typedi";
import { logError } from "@/utils/logger_utils";
import { log, timeStamp } from "console";
import { responseMessage } from "@/enums/http_StatusCode";

@Service()
export class messageRepository extends BasRepository<IMessage> {
  constructor() {
    super(Message);
  }
  
  async findAllChatsByCategory(groupId: string,page:number,limit=20) {
    try {
      return await Message.find({ category: groupId })
        .populate({path:"user",select:'firstName profile'})
        .limit(limit*page);
    } catch (error) {
      logError(error);
      throw new Error(responseMessage.ERROR_MESSAGE);
    }
  }
}
