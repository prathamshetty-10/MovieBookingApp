import { configureStore } from "@reduxjs/toolkit";
import authSliceReducer from "./Slices/AuthSlice"
import locationSliceReducer from "./Slices/LocationSlice"
const store=configureStore({
    reducer:{
        auth1:authSliceReducer,
        locations:locationSliceReducer,
        
    },
    devTools:true,
});
export default store;