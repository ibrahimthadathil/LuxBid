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
        
    }
  }

  // accept the biddAMT
  export const handleRaisedBid =async(userid:string,amt:number,auctionId:string)=>{
    try {
      return await api.post('/accept-bidAmt',{userid,amt,auctionId})
    } catch (error) {
      console.log('error from handle raise amt',);

    }
  }

  // finalize bid 

  export const finalizeDeal =async(id:string)=>{
    return await api.post(`/finalize-deal/${id}`)
  }