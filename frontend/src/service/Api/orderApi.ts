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
    return await api.get('/orders')
  } catch (error) {
    console.log(error); 
  }
}

export const fetchDispatchOrders = async()=>{
  try {
    return api.get('/place-order')
  } catch (error) {
    console.log(error);
    
  }
}

export const  dispatchOrder = async(value:string,order:string)=>{
  try {
    const response = await api.put('/place-order',{value,order})
    return response.data
  } catch (error) {
    console.log(error);
  }
}