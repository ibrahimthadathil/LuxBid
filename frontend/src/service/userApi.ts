import axios from "axios";

const api = axios.create({
    baseURL : import.meta.env.VITE_USER_BASE_URL
})

export const signInRequest= async(email:string)=>{
      return  await api.post('/signup',{email})
}

