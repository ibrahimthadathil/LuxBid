import { axiosInstance } from "../axiosInstance/intercepters";

// const api = axios.create({
//     baseURL: import.meta.env.VITE_USER_BASE_URL,
//     withCredentials: true,
//   });

const api = axiosInstance(import.meta.env.VITE_USER_BASE_URL)  

  // fetch seller
  export const fetchSeller=async()=>{
    try {
      return await api.get('/seller')
    } catch (error) {
        console.log('error from seller',);
        throw new Error('Error from the fetch seller')
        
    }
  }