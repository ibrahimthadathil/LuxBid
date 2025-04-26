import { IMessage, Message } from "@/models/chatModel";
import { BasRepository } from "../baseRepository";
import { Service } from "typedi";
import { logError } from "@/utils/logger_utils";
import { responseMessage } from "@/enums/http_StatusCode";
import { Types } from "mongoose";

@Service()
export class messageRepository extends BasRepository<IMessage> {
  constructor() {
    super(Message);
  }
  
  async findAllChatsByCategory(groupId: string,page:number,limit=20) {
    try {

      return await Message.find({ category: groupId })
      .populate({ path: "user", select: "firstName profile" }) 
      .populate({ path: "replyTo.user", select: "firstName profile" })
      .limit(limit * page);

    } catch (error) {
      logError(error);
      throw new Error(responseMessage.ERROR_MESSAGE);
    }
  }

  async addReaction(messageId: string, emoji: string, userId: string) {
    try {
      const userObjectId = new Types.ObjectId(userId);
     const message = await Message.findById(messageId);
      if (!message) {
        throw new Error('Message not found');
      }
      
      const emojis = message.emojis || [];
      const existingEmojiIndex = emojis.findIndex(e => e.emoji === emoji);
      
      if (existingEmojiIndex >= 0) {
        const userHasReacted = emojis[existingEmojiIndex].users.some(
          user => user.toString() === userObjectId.toString()
        );
        
        const updateOperation = userHasReacted
          ? {
              $inc: { [`emojis.${existingEmojiIndex}.count`]: -1 },
              $pull: { [`emojis.${existingEmojiIndex}.users`]: userObjectId }
            }
          : {
              $inc: { [`emojis.${existingEmojiIndex}.count`]: 1 },
              $push: { [`emojis.${existingEmojiIndex}.users`]: userObjectId }
            };
        
        return await Message.findByIdAndUpdate(
          messageId,
          updateOperation,
          { new: true }
        ).populate({ path: "user", select: 'firstName profile' });
      } else {
        return await Message.findByIdAndUpdate(
          messageId,
          {
            $push: {
              emojis: {
                emoji,
                count: 1,
                users: [userObjectId]
              }
            }
          },
          { new: true }
        ).populate({ path: "user", select: 'firstName profile' });
      }
    } catch (error) {
      console.error('Error adding reaction:', error);
      throw error;
    }
  }
  

}
