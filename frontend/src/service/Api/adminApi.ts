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


export const FetchUsers= async()=>{
   const {data}= await api.get('/users')
   return data
}

export const UserStatus =async(email:string)=>{
  return  await api.put(`/updateuser/${email}`)
}

export const findAllUserByRole =async(role:string)=>{  
  console.log(role,'@@@')
  return await api.get(`/findByRole/${role}`)
}