import axios from "axios";

type Tuser = {
    email:string,
    firstName:string,
    profile:string,
    lastName:string,
    phone:string,
    gender:string,
    password:string

}

const api = axios.create({
    baseURL : import.meta.env.VITE_USER_BASE_URL
})

export const signUpRequest= async(email:string)=>{
      const res =  await api.post('/signup',{email})
      return res
}

export const registration = async (datas:Partial<Tuser>,token:string)=>{
    console.log(datas);
    
       return await api.post('/register',datas,{headers:{Authorization:token}})
      
}

export const otpVerification = async (otp:string,token:string)=>{
    return await api.post('/otpverify',{otp},{headers:{Authorization:token},withCredentials:true})
} 

export const googleAuthSignIn = async (userDetails :Partial<Tuser>)=>{
    
    return await api.post('/auth/google',userDetails)
}

export const  signInRequest = async(userDetails:Partial<Tuser>)=>{ 
    const response = await api.post('/signin',userDetails)
    return response
    
}

export const forgetRequest = async(email:string)=>{
  return await api.post('/forget/password',{email})
}

export const resetOTP = async(otp:string,token:string)=>{
    return await api.post('/reset/otp',{otp },{headers:{Authorization:token}})
}

export const resetPassword = async(password:string,newPassword:string , token :string)=>{
    return await api.post('/reset/password',{password,newPassword},{headers:{Authorization:token}})
}