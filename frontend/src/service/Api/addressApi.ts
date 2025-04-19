import { TAddress } from "@/types/types";
import { axiosInstance } from "../axiosInstance/intercepters";



const api = axiosInstance(import.meta.env.VITE_USER_BASE_URL)

// fetch address
export const fetchAddress=async()=>{
    return await api.get('/address')
}
// Add address
export const createAddress = async (data:TAddress)=>{
    return await api.post('/address',data)
}

// delete address

export const deleteAddress = async (addressId:string) =>{
    return await api.delete(`/address/${addressId}`,)
}

