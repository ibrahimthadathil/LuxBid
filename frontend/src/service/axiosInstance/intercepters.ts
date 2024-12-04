import axios from "axios";

const userInterceptors = axios.create({
    baseURL : import.meta.env.VITE_USER_BASE_URL,
    withCredentials :true
})
