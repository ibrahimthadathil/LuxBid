import mongoose, { Schema, Document } from "mongoose";

export interface IMessage extends Document {
  category: mongoose.Types.ObjectId | string; 
  user: mongoose.Types.ObjectId|'Admin'|string; 
  content: string; 
  timestamp: Date; 
}


const MessageSchema: Schema = new Schema<IMessage>({
  category:{ type: mongoose.Schema.Types.ObjectId, ref: "Category", required: true }, 
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User"}, 
  content: { type: String, required: true }, 
  timestamp: { type: Date, default: Date.now, index: true },   
});

MessageSchema.index({ category: 1, timestamp: -1 });

export const Message = mongoose.model<IMessage>("Message", MessageSchema);
