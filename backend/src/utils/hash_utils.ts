import bcrypt from "bcryptjs";

export const hashPassword = async ( password:string ):Promise<string> => {

    return bcrypt.hash(password,10)
    
}

export const RandomPassword =async()=> await bcrypt.hash(Math.random().toString(36).slice(-8),10)

export const comparePassword=async(inputPassword:string,actualPass:string):Promise<boolean>=>{
    return await bcrypt.compare(inputPassword,actualPass)
}