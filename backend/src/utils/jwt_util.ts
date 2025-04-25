
import jwt from "jsonwebtoken";
import logger from "./logger_utils";

export const generateAccessToken =<T>(data:Partial<T>):string =>{

        const skey = process.env.JWT_KEY as string

        return jwt.sign(data,skey,{expiresIn:'24h'})

}

export const verifyToken=(token:string)=>{

const skey = process.env.JWT_KEY as string
        try {
                
        return jwt.verify(token,skey)
        
        } catch (error) {
        logger(error)
         console.log('error from jwt' , 'invalid token');
         return {success : false , message:'invalid token'}
        }

}


export const generateRefreshToken =<T>(data:Partial<T>):string =>{

        const skey = process.env.JWT_KEY as string

        return jwt.sign(data,skey,{expiresIn:'7d'})

}

