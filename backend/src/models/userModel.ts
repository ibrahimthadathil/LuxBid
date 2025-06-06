import mongoose,{ Document , Schema } from "mongoose";

export interface Iuser extends Document{
    firstName : string ;
    lastName ?: string ;
    email : string ;
    phone : string ;
    gender : 'Male' | 'Female' | 'Other' ;
    password:string;
    role : string ;
    address : mongoose.Types.ObjectId ;
    isActive : boolean ;
    createdAt? : Date ;
    profile : string;
    isVerified : boolean

}

const userSchema = new Schema({
    email :{ type : String , required : true , unique : true },
    password:{ type: String },
    phone :{ type : String },
    firstName : { type :String , required : true},
    lastName : { type : String} ,
    gender : { type : String , enum :[ 'Male' , 'Female','Other' ],},
    role : { type: String , enum :[ 'Buyer' , 'Seller','Guest'] , default :'Guest'},
    address : { type : mongoose.Schema.Types.ObjectId , ref : 'Address'},
    isActive : {type : Boolean , default : true},
    profile:{ type : String , default:''},
    isVerified : { type : Boolean , default:false} 

},{timestamps:true})

export const User = mongoose.model<Iuser>('User',userSchema)