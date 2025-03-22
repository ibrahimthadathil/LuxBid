import { axiosInstance } from "../axiosInstance/intercepters";



const api = axiosInstance(import.meta.env.VITE_USER_BASE_URL)  

  // fetch seller
  export const fetchSeller=async()=>{
    try {
      const response= await api.get('/seller')
      return response
    } catch (error) {
        console.log('error from seller',); 
    }
  }

  // accept the biddAMT
  export const handleRaisedBid =async(userid:string,amt:number,auctionId:string)=>{
    try {
      return await api.post('/bids/accept',{userid,amt,auctionId})
    } catch (error) {
      console.log('error from handle raise amt',);

    }
  }

  // finalize bid 

  export const finalizeDeal =async(id:string)=>{
    return await api.post(`/auctions/${id}/finalize`)
  }