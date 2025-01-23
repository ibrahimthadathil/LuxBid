import { axiosInstance } from "../axiosInstance/intercepters";

const api = axiosInstance(import.meta.env.VITE_USER_BASE_URL)

export const fetchGroups = async()=>{
    try {
        return await api.get('/chatGroups')
    } catch (error) {
        console.log(error);
    }
}

export const getAllMessages =async(groupId?:string,query?:string)=>{
    return await api.get(`/messages/${groupId}${query}`)
}

export const sendMessage = async(groupId:string,text:string) =>{
    return await api.post(`/sendMessage/${groupId}`,{text})
}