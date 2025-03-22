import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface userState {
    userName:string | null,
    email:string |null ,
    role:string |null ,
    isAuthenticated:boolean|null,
    address:string|null
}


const initialState:userState ={
    userName: null, 
    email: null,
    role :  null,
    isAuthenticated :null,
    address:null

}
const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers:{
        loaginSuccess :(state , action :PayloadAction<{ userName:string , email:string , role?:string}>)=>{
            state.email = action.payload.email;
            state.userName = action.payload.userName
            state.isAuthenticated = true
            state.role = action.payload.role as string
        },
        logout :(state)=>{
            state.email = null
            state.userName = null 
            state.role = null
            state.isAuthenticated = null
            state.address = null
            localStorage.removeItem("access-token");
        },
        setRole :(state , action :PayloadAction<string>)=>{
            state.role = action.payload
        },
        selectedAddress :(state,action:PayloadAction<string|null>)=>{
            state.address = action.payload
        }
    }
})

export const {loaginSuccess,logout,setRole,selectedAddress} = userSlice.actions
export default userSlice.reducer