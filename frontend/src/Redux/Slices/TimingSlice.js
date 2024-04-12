import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axiosInstance from "../../helpers/axiosInstance";
import { toast } from "react-hot-toast";

const initialState={
    TimingData:[],
}
export const getAllTimings=createAsyncThunk("/timings",async(data)=>{
    try{
        
        const response=axiosInstance.get(`/movie/getShow/${data.th_id}/${data.mov_name}`);
        toast.promise(response,{
            loading:"loading Timings!! please wait !!",
            success:"Timings loaded successfully",
            error:"failed to get timings,"
        });
        console.log((await response).data.timings);
        return (await response).data.timings;
        //whatever u return here comes under action.payload

    }
    catch(error){
        toast.error(error?.response?.data?.message);
    }
})
export const AddShow=createAsyncThunk("/showadd",async(data)=>{
    try{
        
        const response=axiosInstance.post(`/movie/addShow`,data);
        toast.promise(response,{
            loading:"adding show!! please wait !!",
            success:"show added successfully",
            error:"failed to add show,"
        });
        console.log((await response).data.timings);
        return (await response).data.timings;
        //whatever u return here comes under action.payload

    }
    catch(error){
        toast.error(error?.response?.data?.message);
    }
})

const timingSlice=createSlice({
    name:"timings",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(getAllTimings.fulfilled,(state,action)=>{
            
            if(action.payload){
                
                state.TimingData=[...action.payload];
               
            }
        })
    },
});
export default timingSlice.reducer;