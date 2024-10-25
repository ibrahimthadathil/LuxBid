import mongoose,{Document, Schema} from "mongoose";

export interface Iadmin extends Document{

    fullName:string;
    email:string;
    password:string;
    phone:string;

}

const adminSchema = new Schema({
    fullName:{ type : String, required : true },
    email : { type : String , required : true },
    phone : {type : String , required : true },
    password : { type : String , required : true}
},{timestamps : true})

export const Admin = mongoose.model <Iadmin> ('Admin',adminSchema)  