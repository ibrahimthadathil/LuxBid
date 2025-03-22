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

export const sendMessage = async(groupId:string,text:string,replay:any,files:File[]) =>{
    const formData = new FormData();
    formData.append('text', text);
    
    if (replay) {
      formData.append('replay', replay);
    }
    
    if (files && files.length > 0) {
      files.forEach(file => {
        formData.append('attachments', file);
      });
    }
  
    return await api.post(`/sendMessage/${groupId}`,formData,{headers: {
        'Content-Type': 'multipart/form-data',
      },})
}

export const addReaction = async (messageId: string, emoji: string) => {
    return await api.put(`/messages/${messageId}/reaction`, { emoji });
}