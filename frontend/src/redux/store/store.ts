import { configureStore } from "@reduxjs/toolkit";
import userReducer from '../slice/authSlice'
import adminReducer from '../slice/adminSlice'
import storage from "redux-persist/lib/storage"
import {persistReducer} from 'redux-persist'
import { combineReducers } from "@reduxjs/toolkit";
import { encryptor } from "@/utils/persister/persister_utils";


const persistconfig:any =({
    key:'root',
    version:1,
    whitelist:['user','admin'],
    storage,
    transforms:[encryptor]
    
}) 
const reducer = combineReducers({
    user : userReducer,
    admin : adminReducer 
}) 

const PersisitedReducer = persistReducer(persistconfig,reducer)

const store = configureStore({  
    reducer:PersisitedReducer
})

export type Rootstate = ReturnType <typeof store.getState>
export type AppDispatch = typeof store.dispatch
export default store