import { createSlice,PayloadAction } from "@reduxjs/toolkit";

interface adminState{
    adminName:string | null
    email:string | null
}

const initialState:adminState={
    adminName :null,
    email: null 
}

const adminSlice = createSlice({
    name:'admin',
    initialState,
    reducers :{
        signInSuccess :(state,action:PayloadAction<{adminName:string , email:string}>)=>{
            state.adminName = action.payload.adminName ;
            state.email = action.payload.email
        },
        Logout : (state)=>{
            state.adminName = null
            state.email =null
            localStorage.removeItem('admin')
            localStorage.removeItem('accessToken')
        }
    }
})
 
export const { signInSuccess , Logout } = adminSlice.actions
export default adminSlice.reducer