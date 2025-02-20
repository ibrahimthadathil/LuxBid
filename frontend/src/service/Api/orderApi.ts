import { TAddress } from "@/types/types";
import { axiosInstance } from "../axiosInstance/intercepters";

const api = axiosInstance(import.meta.env.VITE_USER_BASE_URL)


// order payment 
export const orderPlacePayment = async(data:{price:number, title:string, img:string, id:string , address:TAddress})=>{
    try {    
      const response = await api.post('/order-payment',data)   
      return response.data.clientSecret                                                                                                                                                                                                  
    } catch (error) {
      console.log(error);   
    }
  }

export const getOrderStatus =async (sessionId:string,auctionId:string)=>{
  try {
    const response = await api.get(`/order-payment?session_id=${sessionId}&aid=${auctionId}`)
    return response.data
  } catch (error) {
    console.log(error); 
  }
}

export const fetchAllOrders = async ()=>{
  try {
    return api.get('/orders')
  } catch (error) {
    console.log(error); 
  }
}