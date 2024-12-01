import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_USER_BASE_URL,
  withCredentials: true,
});


// fetching buyer
export const fetchBuyer =async()=>{
  try {
    const response =await api.get('/buyer');
    return response
  } catch (error) {
    throw new Error('error from fetch buyer')
  }
}
