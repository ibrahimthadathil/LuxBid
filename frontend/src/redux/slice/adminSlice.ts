import { createSlice,PayloadAction } from "@reduxjs/toolkit";

interface adminState{
    adminName:string | null
    email:string | null
}

const adminString = localStorage.getItem('admin')
const admin = adminString ? JSON.parse(adminString) : null
console.log(admin , '`1234');

const initialState:adminState={
    adminName : admin?.name || null,
    email:admin?.email || null 
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