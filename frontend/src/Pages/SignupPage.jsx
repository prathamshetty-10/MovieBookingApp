
import HomeLayout from "../layout/Homelayout";
import { useState } from "react";

import { BsPersonCircle } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {toast} from "react-hot-toast";
import { createAccount ,confirmEmail} from "../Redux/Slices/AuthSlice";


function Signup(){
    const dispatch=useDispatch();
    const navigate=useNavigate();
    
    const [signupData,setSignupData]=useState({
        user_name:"",
        user_email:"",
        password:"",
        
    });
  
    const[emailConfirm,setEmailConfirm]=useState({
        confirmed:"no"
    })
    
    function handleUserInput(e){
        const {name,value}=e.target;
        setSignupData({
            ...signupData,
            [name]:value
        })
        
    }
    async function ConfirmEmail(event){
        event.preventDefault();
        if(!signupData.user_email ){
            toast.error("Please fill email");
            return;

        }
        const response=await dispatch(confirmEmail(signupData));
        
        if(response?.payload?.success){
            setEmailConfirm({
                confirmed:"yes"
            })
        
        }
    }
    async function createNewAccount(event){
        event.preventDefault();
        if(!signupData.user_email || !signupData.password || !signupData.user_name ){
            toast.error("Please fill all details");
            return;

        }
        const response=await dispatch(createAccount(signupData));
        console.log("this is response.payload");
        console.log(response.payload);
        if(response?.payload?.success){
            
           
                navigate("/");
        
           
        
        //once action is successful
        
        setSignupData({
            user_name:"",
            user_email:"",
            password:"",
                
        });
       
        

            }
           
            


    }
    return(
        
        <HomeLayout>
        <div className="flex items-center justify-center h-[90vh] bg-gray-800">
                <form noValidate onSubmit={createNewAccount} className="flex flex-col justify-center gap-3 rounded-lg p-4 text-white w-75 lg:w-96 shadow-[0_0_10px_black] bg-gray-800">
                    <h1 className="text-center text-2xl font-bold">Signup Page</h1>
                    <label htmlFor="image_uploads" className="cursor-pointer">
                    <BsPersonCircle className="w-24 h-24 rounded-full m-auto"/>
                    </label>
                    <div className="flex flex-col gap-1">
                        <label htmlFor="user_name" className="font-semibold">Name</label>
                        <input 
                            type="text"
                            required
                            name="user_name"
                            id="user_name"
                            placeholder="Enter your full name"
                            className="bg-transparent px-2 py-1 border"
                            value={signupData.user_name}
                            onChange={handleUserInput}/>
                    </div>
                    <div className="flex flex-col gap-1">
                        <label htmlFor="user_email" className="font-semibold">Email</label>
                        <input 
                            type="email"
                            required
                            name="user_email"
                            id="user_email"
                            placeholder="Enter your email"
                            className="bg-transparent px-2 py-1 border"
                            value={signupData.user_email}
                            onChange={handleUserInput}/>
                    </div>
                    <div className="flex flex-col gap-1">
                    <button className="border btn-secondary px-1 py-1 font-semibold rounded-md w-full m-1  bg-blue-500 hover:bg-blue-200 hover:text-blue-600" onClick={ConfirmEmail}>
                    Confirm Email
                    </button>
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
                            value={signupData.password}
                            onChange={handleUserInput}/>
                    </div>
                    <div className="flex flex-col gap-1">
                        <label htmlFor="ph_no" className="font-semibold">PhoneNum</label>
                        <input 
                            type="number"
                            required
                            name="ph_no"
                            id="ph_no"
                            placeholder="Enter your phone"
                            className="bg-transparent px-2 py-1 border"
                            value={signupData.ph_no}
                            onChange={handleUserInput}/>
                    </div>
                    {emailConfirm.confirmed=="yes"?(<button type="submit" className="mt-2 bg-yellow-600 hover:bg-yellow-400 transition-all ease-in-out duration-300 text-black font-semibold hover:text-blue-950 rounded-md py-1 text-lg cursor-pointer ">
                    Create Account
                    </button>):(<label className="border btn-secondary px-[30%] py-1 font-semibold rounded-md w-full m-1  bg-gray-500 hover:bg-gray-200 hover:text-black-600">Create Account</label>)}
                    
                    <p className="text-center">
                     Already have an account? <Link to="/login" className="link text-accent cursor-pointer">Login</Link>
                    </p>
                   
                    </form>
            </div>
        
            
        
        </HomeLayout>
    )

}
export default Signup;