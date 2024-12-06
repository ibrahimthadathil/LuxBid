import axios from "axios";
import { axiosInstance } from "../axiosInstance/intercepters";

// const api = axios.create({
//   baseURL: import.meta.env.VITE_USER_BASE_URL,
//   withCredentials: true,
// });

const api = axiosInstance(import.meta.env.VITE_USER_BASE_URL)

// fetching buyer
export const fetchBuyer =async()=>{
  try {
    const response =await api.get('/buyer');
    return response
  } catch (error) {
    throw new Error('error from fetch buyer')
  }
}
