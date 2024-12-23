import axios from "axios";

// const userInterceptors = axios.create({
//     baseURL : import.meta.env.VITE_USER_BASE_URL,
//     withCredentials :true
// })

export const axiosInstance = (baseURL:string)=>{
   const instance=  axios.create({
        baseURL,
        withCredentials:true
    })
    instance.interceptors.request.use(async (config) => {
        const token = localStorage.getItem('access-token')
        if (token) {
            config.headers.Authorization = `${token}`
        }        
        return config
        
    }, (error) => {
        return Promise.reject(error)
    })

    return instance
}

