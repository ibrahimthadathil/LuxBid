import axios from 'axios'

type Tadmin = {
    email : string,
    password : string
}

const api = axios.create({
    baseURL : import.meta.env.VITE_ADMIN_URL
})

export const adminSignin=async(adminDetails :Tadmin)=>{
   return await api.post('/auth/signin',adminDetails)
}
