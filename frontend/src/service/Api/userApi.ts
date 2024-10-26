import axios from "axios";

type Tuser = {
    email:string,
    firstName:string,
    profile:string
}

const api = axios.create({
    baseURL : import.meta.env.VITE_USER_BASE_URL
})

export const signUpRequest= async(email:string)=>{
      return  await api.post('/signup',{email})
}

export const googleAuthSignIn = async (userDetails : Tuser)=>{
    
    return await api.post('/auth/google',userDetails)
}

