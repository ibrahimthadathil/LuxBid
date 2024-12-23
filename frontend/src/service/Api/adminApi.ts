import { Tcategory } from '@/types/types'
import { axiosInstance } from '../axiosInstance/intercepters'

type Tadmin = {
    email : string,
    password : string
}

// const api = axios.create({
//     baseURL : import.meta.env.VITE_ADMIN_URL
// })

const api = axiosInstance(import.meta.env.VITE_ADMIN_URL)


export const adminSignin=async(adminDetails :Tadmin)=>{
   return await api.post('/auth/signin',adminDetails)
}

// export const FetchUsers= async()=>{
//    const {data}= await api.get('/users')
//    return data
// }

export const UserStatus =async(email:string)=>{
  return  await api.put(`/updateuser/${email}`)
}

export const findAllUserByRole =async(role:string)=>{  
  return await api.get(`/findByRole/${role}`)
}

export const AddCategory = async(values:Partial<Tcategory>)=>{
  return await api.post('/addcategory',values)
}

export const getCategory = async()=>{
  return await api.get('/getAllcategory')
}

export const removeCategory =async(id:string)=>{
  
return await api.delete(`/categoryremove/${id}`)
}

export const categoryAction =async(id:string)=>{
  return await api.put(`/categoryupdate/${id}`)
}


export const getAllproducts =async(status:boolean)=>{  
  return await api.get(`/products/${status}`)
}

export const removePost =async(id:string)=>{
  return await api.delete(`/removepost/${id}`)
}

export const approvePost = async(id:string)=>{  
  return await api.put(`/updatepost/${id}`)
}

export const rejectPost = async(id:string)=>{
  return await api.put(`/rejectpost/${id}`)
}

export const logoutAdmin =async()=>{
  return await api.post('/adminlogout')
}


export const listByType = async(type:string)=>{
  // alert(type)
  return await api.get(`/list-by-type/${type}`)
}
