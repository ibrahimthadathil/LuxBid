
import jwt from "jsonwebtoken";

export const generateAccessToken =<T>(data:Partial<T>):string =>{

        let skey = process.env.JWT_KEY as string

        return jwt.sign(data,skey,{expiresIn:'2m'})

}

export const verifyToken=(token:string)=>{

let skey = process.env.JWT_KEY as string
        try {
                
        return jwt.verify(token,skey)
        
        } catch (error) {
         console.log('error from jwt' , 'invalid token');
         return {success : false , message:'invalid token'}
         throw new Error('Invalid token')
        }

}


export const generateRefreshToken =<T>(data:Partial<T>):string =>{

        let skey = process.env.JWT_KEY as string

        return jwt.sign(data,skey,{expiresIn:'7d'})

}

