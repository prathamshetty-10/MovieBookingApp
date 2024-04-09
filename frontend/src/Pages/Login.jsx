import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../Redux/Slices/AuthSlice";
import { useState } from "react";
import HomeLayout from "../layout/Homelayout";

import { Link } from "react-router-dom";

import {toast} from "react-hot-toast";


function Login(){
    const dispatch=useDispatch();
    const navigate=useNavigate();
    
    const [loginData,setLoginData]=useState({
       
        user_email:"",
        password:"",
        
        user_role:""

        
    });
    function handleUserInput(e){
        const {name,value}=e.target;
        setLoginData({
            ...loginData,
            [name]:value
        })
        

    }

    async function onLogin(event){
        event.preventDefault();
        if(!loginData.user_email || !loginData.password ||!loginData.ph_no ||!loginData.user_role){
            toast.error("Please fill all details");
            return;

        }
        const response=await dispatch(login(loginData));
        console.log("this is the response.payload");
        console.log(response?.payload)
        if(response?.payload?.success){
            navigate("/");
        }
        //once action is successful
        
        setLoginData({
                
            user_email:"",
            password:"",
            ph_no:"",
            user_role:"USER"
               
        });
        


    }
    return(
        <HomeLayout>
            <div className="flex items-center justify-center h-[90vh] bg-gray-800">
                <form noValidate onSubmit={onLogin} className="flex flex-col justify-center gap-3 rounded-lg p-4 text-white w-75 h-[65vh] lg:w-96 shadow-[0_0_10px_black] bg-gray-800">
                    <h1 className="text-center text-2xl font-bold">Login Page</h1>
                    
                    <div className="flex flex-col gap-1">
                        <label htmlFor="user_email" className="font-semibold">Email</label>
                        <input 
                            type="email"
                            required
                            name="user_email"
                            id="user_email"
                            placeholder="Enter your email"
                            className="bg-transparent px-2 py-1 border"
                            value={loginData.user_email}
                            onChange={handleUserInput}/>
                    </div>
                    <div className="flex flex-col gap-1">
                        <label htmlFor="password" className="font-semibold">Password</label>
                        <input 
                            type="password"
                            required
                            name="password"
                            id="password"
                            placeholder="Enter password"
                            className="bg-transparent px-2 py-1 border"
                            value={loginData.password}
                            onChange={handleUserInput}/>
                    </div>
                    <div className="flex flex-col gap-1">
                        <label htmlFor="ph_no" className="font-semibold">Phone Number</label>
                        <input 
                            type="number"
                            required
                            name="ph_no"
                            id="ph_no"
                            placeholder="Enter phone number"
                            className="bg-transparent px-2 py-1 border"
                            value={loginData.ph_no}
                            onChange={handleUserInput}/>
                    </div>
                    <div className="flex flex-col gap-1">
                    <label htmlFor="role" className="font-semibold">user role</label>
                        <div className="flex gap-1">
                        
                        <input 
                            type="radio"
                            required
                            name="user_role"
                            id="role1"
                            className="bg-transparent px-2 py-1 border"
                            value="USER"
                            onClick={handleUserInput}/>
                        <label className="font-semibold">USER</label>
                        </div>
                        <div className="flex gap-1">
                        
                        <input 
                            type="radio"
                            required
                            name="user_role"
                            id="role2"
                            className="bg-transparent px-2 py-1 border"
                            value="ADMIN"
                            onClick={handleUserInput}/>
                            <label className="font-semibold">ADMIN</label>
                            </div>
                    </div>
                   

                    <button type="submit" className="mt-2 bg-yellow-600 hover:bg-yellow-400 transition-all ease-in-out duration-300 text-black font-semibold hover:text-blue-950 rounded-md py-1 text-lg cursor-pointer ">
                    Login
                    </button>
                    <p className="text-center">
                     Dont have an account? <Link to="/signup" className="link text-accent cursor-pointer">signup</Link>
                    </p>
                   
                    </form>
            </div>
        
        
        
        
        </HomeLayout>
    )

}
export default Login;