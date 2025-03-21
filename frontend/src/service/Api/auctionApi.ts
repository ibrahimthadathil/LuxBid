import { Tauction } from "@/types/types";
import { axiosInstance } from "../axiosInstance/intercepters";


const api = axiosInstance (import.meta.env.VITE_USER_BASE_URL)

// create auction 

export const createAuction = async(data:Tauction) =>{
    return await api.post('/auctions',data)
}

// fetch all auction by user

export const fetchAuction =async()=>{
    return await api.get('/auctions')
}

// change the status of the auction 

export const changeActionStatus = async(id:string)=>{
    return await api.put(`/auctions/${id}/close`)
}

// delete the auction 

export const deleteAuction = async(id:string)=>{
    return await api.delete(`/auctions/${id}`)
}

// fetch all action

export const topAuctions =async()=>{
    return await api.get('/auctions/display')
}

export const viewAuction =async(id:string)=>{
    return await api.get(`/auctions/${id}`)
}

export const auctionInterface = async(id:string)=>{
    return await api.get(`/auctions/${id}/interface`)
}

// filterd route
export const viewAllAuctions =async(query:string)=>{
    try {
        
        return await api.get(`Alldeals?${query}`)
    } catch (error) {
        console.log((error as Error).message);
        
    }
}
 


