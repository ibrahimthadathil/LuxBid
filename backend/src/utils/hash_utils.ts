import bcrypt from "bcryptjs";

export const hashPassword = async ( password:string ):Promise<string> => {

    return bcrypt.hash(password,10)
    
}

export const comparePassword=async(inputPassword:string,actualPass:string):Promise<Boolean>=>{
    return await bcrypt.compare(inputPassword,actualPass)
}