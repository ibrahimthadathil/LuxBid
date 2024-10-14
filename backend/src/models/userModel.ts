import mongoose,{ Document , Schema } from "mongoose";

interface Iuser extends Document{

    userName : string ;
    email : string ;
    phone : string ;
    gender : 'Male' | 'Female' ;
    role : string ;
    address : mongoose.Types.ObjectId ;
    firstName : string ;
    lastName : string ;
    isActive : boolean ;
    createdAt? : Date ;
    profile : string
}

const userSchema = new Schema({
    userName :{ type : String , required : true , unique : true },
    email :{ type : String , required : true , unique : true },
    phone :{ type : String , required : true },
    gender : { type : String , enum :[ 'Male' , 'Female' ], required : true },
    role : { type: String , enum :[ 'Buyer' , 'Seller'] , default :'Buyer'},
    address : { type : mongoose.Schema.Types.ObjectId , ref : 'Address'},
    firstName : { type :String , required : true},
    lastName : { type : String, required : true} ,
    isActive : {type : Boolean , default : true},
    profile:{ type : String , default:''} 

},{timestamps:true})

export const User = mongoose.model<Iuser>('User',userSchema)