import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axiosInstance from "../../helpers/axiosInstance";
import { toast } from "react-hot-toast";

const initialState={
    TheatreData:[],
}
export const getAllTheatres=createAsyncThunk("/location/theatre",async(data)=>{
    try{
        
        const response=axiosInstance.get(`/location/choose/${data}`);
        toast.promise(response,{
            loading:"loading Theatres!! please wait !!",
            success:"Theatres loaded successfully",
            error:"failed to get theatres,"
        });
        console.log((await response).data.theatres);
        return (await response).data.theatres;
        //whatever u return here comes under action.payload

    }
    catch(error){
        toast.error(error?.response?.data?.message);
    }
})

const theatreSlice=createSlice({
    name:"theatres",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(getAllTheatres.fulfilled,(state,action)=>{
            
            if(action.payload){
                
                state.TheatreData=[...action.payload];
               
            }
        })
    },
});
export default theatreSlice.reducer;