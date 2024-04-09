import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import axiosInstance from "../../helpers/axiosInstance";
//we storing the isloggedin role and data in the localstorage setitem and get item is used to set or get data from localstorage

const initialState={
    isLoggedIn:localStorage.getItem('user_isLoggedIn')|| false,
    role:localStorage.getItem("user_role")|| "",
    data:localStorage.getItem("user_data")== "undefined" ? { }: JSON.parse(localStorage.getItem("user_data"))
};//this is the initial state of the Auth slice
export const createAccount=createAsyncThunk("/auth/signup",async(data)=>{
    try{
        
        const res=axiosInstance.post("user/register",data);//this is the route given in backend
        toast.promise(res,{
            loading:"wait! creating your account",
            success:(data)=>{
                return data?.data.message;
            },
            error:"Failed to create account"
        });
        return (await res).data;


    }catch(error){
        toast.error(error?.response?.data?.message);//to send the error as alert message

    }
})
export const confirmEmail=createAsyncThunk("/auth/confirm",async(data)=>{
    try{
        
        const res=axiosInstance.post("user/confirmemail",data);//this is the route given in backend
        toast.promise(res,{
            loading:"wait! confirming",
            success:(data)=>{
                return data?.data.message;
            },
            error:"Failed to confirm"
        });
        return (await res).data;


    }catch(error){
        toast.error(error?.response?.data?.message);//to send the error as alert message

    }
})
export const login=createAsyncThunk("/auth/login",async(data)=>{
    try{
        console.log(data);
        const res=axiosInstance.post("user/login",data);//this is the route given in backend
        toast.promise(res,{
            loading:"wait! authentication in progress",
            success:(data)=>{
                return data?.data.message;
            },
            error:"Failed to login check credentials"
        });
        return (await res).data;


    }catch(error){
                
                toast.error(error?.response?.data?.message);//to send the error as alert message

    }
} )
export const logout=createAsyncThunk("/auth/logout",async()=>{
    try{
        const res=axiosInstance.get("user/logout");//this is the route given in backend
        toast.promise(res,{
            loading:"wait! Logging out",
            success:(data)=>{
                return data?.data.message;
            },
            error:"Failed to logout"
        });
        console.log(res);
        return (await res).data;
    }catch(error){
        toast.error(error?.response?.data?.message);//to send the error as alert message

    }
} )
export const getUserData=createAsyncThunk("/user/details",async()=>{
    try{
        const res=axiosInstance.get("user/profile");//this is the route given in backend
        
        return (await res).data;


    }catch(error){
        toast.error(error?.message);//to send the error as alert message

    }
    //once userdata becomes new and comes the state has to be updated as it has the user data so addcase in extrareducer
} )

//creating the Auth slice
const authSlice=createSlice({
    name:"auth1",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder//here for everyone the state will be the same auth state obviously
        .addCase(login.fulfilled,(state,action)=>{
            console.log(action?.payload?.user);
            localStorage.setItem("user_data",JSON.stringify(action?.payload?.user));
            localStorage.setItem("user_isLoggedIn",action?.payload?.user?true:false);
            localStorage.setItem("user_role",action?.payload?.user[0]?.user_role);
            console.log(state.isLoggedIn)
            //localstorage is updated so incase the app reloads initial state will be set with these
            //now update the current state as u didnt reload
            state.isLoggedIn=true;
            state.data=action?.payload?.user;
            state.role=action?.payload?.user[0]?.user_role;
        })
        //once logout has happens everything from localstorage remove and restore state
        .addCase(logout.fulfilled,(state)=>{//there is no action only state is updated
            localStorage.clear();
            state.data={};
            state.isLoggedIn=false;
            state.role="";
        })
        .addCase(getUserData.fulfilled,(state,action)=>{
            if(!action?.payload?.user)return;
            localStorage.setItem("user_data",JSON.stringify(action?.payload?.user));
            localStorage.setItem("user_isLoggedIn",true);
            localStorage.setItem("user_role",action?.payload?.user[0]?.user_role);
            //localstorage is updated so incase the app reloads initial state will be set with these
            //now update the current state as u didnt reload
            state.isLoggedIn=true;
            state.data=action?.payload?.user;
            state.role=action?.payload?.user[0]?.user_role;

        })
        
    }
})

export default authSlice.reducer;