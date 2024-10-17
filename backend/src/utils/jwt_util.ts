
import jwt from "jsonwebtoken";
import { Iuser } from "../models/userModel";

export const generateAccessToken =(user:Iuser):string =>{

        let skey = process.env.JWT_KEY as string

        return jwt.sign(user,skey,{expiresIn:'2m'})

}