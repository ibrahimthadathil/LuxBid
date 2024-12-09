import { Tauction } from "@/types/types";
import { axiosInstance } from "../axiosInstance/intercepters";


const api = axiosInstance (import.meta.env.VITE_USER_BASE_URL)

// create auction 

export const createAuction = async(data:Tauction) =>{
    alert('from api')
    console.log(data);
    
    return await api.post('/createAuction',data)
}