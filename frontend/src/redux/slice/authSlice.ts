import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { useEffect } from "react";


interface userState {
    userName:string | null,
    email:string |null
}
const userString = localStorage.getItem('user'); 
const user = userString ? JSON.parse(userString) : null; 


const initialState:userState ={
    userName:user?.name || null, 
    email:user?.email || null
}
const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers:{
        loaginSuccess :(state , action :PayloadAction<{ userName:string , email:string}>)=>{
            state.email = action.payload.email;
            state.userName = action.payload.userName
        },
        logout :(state)=>{
            state.email = null
            state.userName = null 
            localStorage.removeItem('user')
        }
    }
})

export const {loaginSuccess,logout} = userSlice.actions
export default userSlice.reducer