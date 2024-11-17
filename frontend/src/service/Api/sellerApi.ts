import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.VITE_USER_BASE_URL,
    withCredentials: true,
  });

  export const fetchSeller=async()=>{
    try {
      return  await api.get('/seller')
    } catch (error) {
        throw new Error('Error from the fetch seller')
    }
  }