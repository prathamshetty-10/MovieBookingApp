import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axiosInstance from "../../helpers/axiosInstance";
import { toast } from "react-hot-toast";

const initialState={
    locationData:[],
}
export const getAllLocations=createAsyncThunk("/location/get",async()=>{
    try{
        const response=axiosInstance.get("/location/choose");
        toast.promise(response,{
            loading:"loading locations!! please wait !!",
            success:"locations loaded successfully",
            error:"failed to get locations,"
        });
        console.log((await response).data.locations);
        return (await response).data.locations;
        //whatever u return here comes under action.payload

    }
    catch(error){
        toast.error(error?.response?.data?.message);
    }
})

const locationSlice=createSlice({
    name:"locations",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(getAllLocations.fulfilled,(state,action)=>{
            console.log('hji');
            if(action.payload){
                console.log('this is payload :')
                console.log(action.payload);
                state.locationData=[...action.payload];
               
            }
        })
    },
});
export default locationSlice.reducer;