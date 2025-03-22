import mongoose, { Schema, Document } from 'mongoose';

export interface IAddress extends Document {
  propertyName:string  
  user?:string
  street: string;
  city: string;
  state: string;
  pincode: string;

}

const AddressSchema: Schema = new Schema(
  {
    street: { type: String, required: true },
    propertyName:{ type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    pincode: { type: String, required: true },
    user:{type:mongoose.Schema.Types.ObjectId,ref:'User',required : true}

  }
 
);

export const AddressModel = mongoose.model<IAddress>('Address', AddressSchema);
