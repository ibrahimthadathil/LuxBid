import { Tcategory } from '@/types/types'
import axios from 'axios'

type Tadmin = {
    email : string,
    password : string
}

const api = axios.create({
    baseURL : import.meta.env.VITE_ADMIN_URL,
    withCredentials:true
})


export const adminSignin=async(adminDetails :Tadmin)=>{
   return await api.post('/auth/signin',adminDetails)
}

export const UserStatus =async(email:string)=>{
  return  await api.put(`/users/${email}`)
}

export const findAllUserByRole =async(role:string)=>{  
  return await api.get(`/users/role/${role}`)
}

export const AddCategory = async(values:Partial<Tcategory>)=>{
  return await api.post('/categories',values)
}

export const getCategory = async()=>{
  return await api.get('/categories')
}

export const removeCategory =async(id:string)=>{
  
return await api.delete(`/categories/${id}`)
}

export const categoryAction =async(id:string)=>{
  return await api.put(`/categories/${id}`)
}


export const getAllproducts =async(status:boolean)=>{  
  return await api.get(`/products/status/${status}`)
}

export const removePost =async(id:string)=>{
  return await api.delete(`/products/${id}`)
}

export const approvePost = async(id:string)=>{  
  return await api.put(`/products/${id}/status`)
}

export const rejectPost = async(id:string)=>{
  return await api.put(`/products/${id}/reject`)
}


export const listByType = async(type:string)=>{
  return await api.get(`/auctions/type/${type}`)
}

export const logoutAdmin =async()=>{
  return await api.post('/auth/logout')
}

