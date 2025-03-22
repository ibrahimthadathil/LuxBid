import { createSlice,PayloadAction } from "@reduxjs/toolkit";

interface adminState{
    adminName:string | null
    email:string | null;
    isAdmin : boolean | null
}

const initialState:adminState={
    adminName :null,
    email: null ,
    isAdmin :null
}

const adminSlice = createSlice({
    name:'admin',
    initialState,
    reducers :{
        signInSuccess :(state,action:PayloadAction<{adminName:string , email:string}>)=>{
            state.adminName = action.payload.adminName ;
            state.email = action.payload.email;
            state.isAdmin =true
        },
        Logout : (state)=>{
            state.adminName = null
            state.email =null
            state.isAdmin=null
            localStorage.removeItem('admin')
            localStorage.removeItem('access-token')

        }
    }
})
 
export const { signInSuccess , Logout } = adminSlice.actions
export default adminSlice.reducer