import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axiosInstance from "../../helpers/axiosInstance";
import { toast } from "react-hot-toast";

const initialState={
    numSeats:'',
    Bookings:'',
    AllBookings:'',
}
export const getSeats=createAsyncThunk("/seat/get",async(data)=>{
    try{
        const response=axiosInstance.get(`/movie/getSeat/${data.time_id}`);
        toast.promise(response,{
            loading:"loading seats!! please wait !!",
            success:"seats loaded successfully",
            error:"failed to get seats,"
        });
       
        return (await response).data.seats;
        //whatever u return here comes under action.payload

    }
    catch(error){
        toast.error(error?.response?.data?.message);
    }
})
export const lockSeats=createAsyncThunk("/seat/lock",async(data)=>{
    try{
        const response=axiosInstance.post(`/book/lockSeat`,data);
        toast.promise(response,{
            loading:"locking seats!! please wait !!",
            success:"seats locked successfully",
            error:"failed to lock seats,"
        });
       
        return (await response).data;
        //whatever u return here comes under action.payload

    }
    catch(error){
        toast.error(error?.response?.data?.message);
    }
})
export const unlockSeats=createAsyncThunk("/seat/unlock",async(data)=>{
    try{
        const response=axiosInstance.post(`/book/unlockSeat`,data);
        toast.promise(response,{
            loading:"unlocking seats!! please wait !!",
            success:"seats unlocked successfully",
            error:"failed to unlock seats,"
        });
       
        return (await response).data;
        //whatever u return here comes under action.payload

    }
    catch(error){
        toast.error(error?.response?.data?.message);
    }
})
export const AddSeats=createAsyncThunk("/add/seat",async(data)=>{
    try{
        const response=axiosInstance.post(`/movie/addSeat`,data);
        toast.promise(response,{
            loading:"adding seats!! please wait !!",
            success:"seats added successfully",
            error:"failed to add seats,"
        });
       
        return (await response).data.seats;
        //whatever u return here comes under action.payload

    }
    catch(error){
        toast.error(error?.response?.data?.message);
    }
})
export const BookTicket=createAsyncThunk("/book/ticket",async(data)=>{
    try{
        const response=axiosInstance.post(`/book/confirmBooking`,data);
        toast.promise(response,{
            loading:"booked seats!! please wait !!",
            success:"seats booked successfully",
            error:"failed to book seats,"
        });
       
        return (await response).data;
        //whatever u return here comes under action.payload

    }
    catch(error){
        toast.error(error?.response?.data?.message);
    }
})
export const getBookings=createAsyncThunk("/my/bookings",async()=>{
    try{
        const response=axiosInstance.get(`/book/getBookings`);
        toast.promise(response,{
            loading:"bookings loading!! please wait !!",
            success:"bookings booked successfully",
            error:"failed to load bookings,"
        });
       
        return (await response).data;
        //whatever u return here comes under action.payload

    }
    catch(error){
        toast.error(error?.response?.data?.message);
    }
})
export const getAllBookings=createAsyncThunk("/all/bookings",async()=>{
    try{
        const response=axiosInstance.get(`/book/getAllBookings`);
        toast.promise(response,{
            loading:"bookings loading!! please wait !!",
            success:"bookings booked successfully",
            error:"failed to load bookings,"
        });
       
        return (await response).data;
        //whatever u return here comes under action.payload

    }
    catch(error){
        toast.error(error?.response?.data?.message);
    }
})

const bookingSlice=createSlice({
    name:"bookings",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(getSeats.fulfilled,(state,action)=>{
            
            if(action.payload){
                state.numSeats=action.payload[0].num_seats;
            }
        })
        .addCase(getBookings.fulfilled,(state,action)=>{
            if(action.payload){
                state.Bookings=action.payload.bookings;
            }
        })
        .addCase(getAllBookings.fulfilled,(state,action)=>{
            if(action.payload){
                state.AllBookings=action.payload.AllBookings;
            }
        })
    },
});
export default bookingSlice.reducer;