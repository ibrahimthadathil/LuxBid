import axios from "axios";


const cateApi = axios.create({
    baseURL : import.meta.env.VITE_ADMIN_URL,
    withCredentials: true,
})

const api = axios.create({
    baseURL: import.meta.env.VITE_USER_BASE_URL,
    withCredentials: true,
  });

// fetch category 

export const fetchCategory=async()=>{
    return await cateApi.get('/getcategory')
}

// add post
export const createPost = async(data:any)=>{
   
   return  await api.post('/addpost',data) 
}

// fetch post 

export const fetchPost=async()=>{
    return await api.get('/getpost')
}