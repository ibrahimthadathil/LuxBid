import { configureStore } from "@reduxjs/toolkit";
import userReducer from '../slice/authSlice'
import adminReducer from '../slice/adminSlice'

const store = configureStore({  
    reducer:{
        user : userReducer,
        admin : adminReducer 
    }
})

export type Rootstate = ReturnType <typeof store.getState>
export type AppDispatch = typeof store.dispatch
export default store