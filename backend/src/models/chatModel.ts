
import mongoose, { Schema, Document } from "mongoose";

export interface IMessage extends Document {
  category: mongoose.Types.ObjectId | string ; 
  isAdmin: boolean ;
  user: mongoose.Types.ObjectId | string ;
  content?: string ; 
  timestamp: Date ; 
  attachments?: string[] ;
  replyTo?: {
    messageId: mongoose.Types.ObjectId | string;
    content: string;
    attachments:string[]
    user:string
  } | null; 
  emojis?: {
    emoji: string ; 
    count: number ;
    users: mongoose.Types.ObjectId[] ; 
  }[] ;
}

const MessageSchema: Schema = new Schema<IMessage>({
  category: { type: mongoose.Schema.Types.ObjectId, ref: "Category", required: true }, 
  isAdmin:{type:Boolean},
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User"}, 
  content: { type: String }, 
  timestamp: { type: Date, default: Date.now, index: true },  
  attachments:[String],
  replyTo: {
    messageId: { type: mongoose.Schema.Types.ObjectId, ref: "Message" },
    content: {type:String},
    attachments:[String],
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
  },
  emojis: [
    {
      emoji: { type: String, required: true },
      count: { type: Number, default: 0 },
      users: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }]
    }
  ]
});

MessageSchema.index({ category: 1, timestamp: -1 });

export const Message = mongoose.model<IMessage>("Message", MessageSchema);
