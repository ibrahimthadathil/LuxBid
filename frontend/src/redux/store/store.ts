import { configureStore } from "@reduxjs/toolkit";
import userReducer from '../slice/authSlice'
import adminReducer from '../slice/adminSlice'
import storage from "redux-persist/lib/storage"
import {PersistConfig, persistReducer} from 'redux-persist'
import { combineReducers } from "@reduxjs/toolkit";
import { encryptor } from "@/utils/persister/persister_utils";


const persistconfig:PersistConfig<RootState> =({
    key:'root',
    version:1,
    whitelist:['user','admin'],
    storage,
    transforms:[encryptor]
    
}) 
const rootReducer  = combineReducers({
    user : userReducer,
    admin : adminReducer 
}) 
type RootState = ReturnType<typeof rootReducer>;

const PersisitedReducer = persistReducer(persistconfig,rootReducer )

const store = configureStore({  
    reducer:PersisitedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
          serializableCheck: {
            ignoredActions: ['persist/PERSIST'], 
          },
        }),
})

export type Rootstate = ReturnType <typeof store.getState>
export type AppDispatch = typeof store.dispatch
export default store