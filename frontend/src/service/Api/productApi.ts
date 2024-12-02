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

// update post 

export const updatePost =async(id:string,data:FormData)=>{
    console.log(id,data);
    
    return await api.put(`/updatepost/${id}`,data)
}

// delete post 

export const removePost =async(id:string)=>{
    return await api.delete(`/removepost/${id}`)
}

