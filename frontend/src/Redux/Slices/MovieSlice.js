import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axiosInstance from "../../helpers/axiosInstance";
import { toast } from "react-hot-toast";

const initialState={
    MovieData:[],
}
export const getAllMovies=createAsyncThunk("/location/theatre/movies",async(data)=>{
    try{
        
        const response=axiosInstance.get(`/movie/getMovie/${data}`);
        toast.promise(response,{
            loading:"loading movies!! please wait !!",
            success:"movies loaded successfully",
            error:"failed to get movies,"
        });
        console.log((await response).data.movies);
        return (await response).data.movies;
        //whatever u return here comes under action.payload

    }
    catch(error){
        toast.error(error?.response?.data?.message);
    }
})
export const AddMovies=createAsyncThunk("/location/theatre/movies/add",async(data)=>{
    try{
        
        const response=axiosInstance.post(`/movie/addMovie`,data);
        toast.promise(response,{
            loading:"adding movies!! please wait !!",
            success:"movies added successfully",
            error:"failed to add movies,"
        });
        
        return (await response).data.movies;
        //whatever u return here comes under action.payload

    }
    catch(error){
        toast.error(error?.response?.data?.message);
    }
})

const movieSlice=createSlice({
    name:"movies",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(getAllMovies.fulfilled,(state,action)=>{
            
            if(action.payload){
                
                state.MovieData=[...action.payload];
               
            }
        })
    },
});
export default movieSlice.reducer;