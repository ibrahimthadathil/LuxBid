import mongoose, { Document, Mongoose, Schema } from "mongoose";

export interface ISeller extends Document{
  _id: string;
  user: string;
  rating: [
    {
      clint: string;
      rate: number;
      orderId:string
    }
  ];
  // products: string,
  // auctions: string
}

const OrganizerSchema = new Schema({
    user : { type : mongoose.Schema.Types.ObjectId , ref : 'User' ,required :true},
    rating :[{
      clint: { type: mongoose.Schema.Types.ObjectId , ref : 'User' },
      rate : { type : Number , default : 0 },
      orderId:{ type: mongoose.Schema.Types.ObjectId , ref : 'Order' }
    }],
    // products:{type: mongoose.Schema.Types.ObjectId } ,
    // auctions:{type: mongoose.Schema.Types.ObjectId , 'ref' : 'Auction' }
},{timestamps:true})

export const Organizer = mongoose.model<ISeller>('Organizer',OrganizerSchema)
