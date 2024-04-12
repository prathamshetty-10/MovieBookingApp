import { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useNavigate,useLocation } from "react-router-dom";
import {AddShow} from "../Redux/Slices/TimingSlice"; 
import HomeLayout from "../layout/Homelayout";

function Addshow(){
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const {state}=useLocation();
    //a state to hold form ka data
    const [userInput,setUserInput]=useState({
        th_id:state.th_id,
        mov_name:state.mov_name,
        timingstart:"",
        ts_1:"",
        timingend:"",
        te_1:""
        

    })
    function handleUserInput(e){
        e.preventDefault();
        const {name,value}=e.target;
        setUserInput({
            ...userInput,
            [name]:value
        })
        console.log(userInput);
    }
    async function onFormSubmit(e){
        e.preventDefault();//by default form submit karne par it refreshes usko we are avoiding
        if(!userInput.mov_name||!userInput.th_id||!userInput.timingstart||!userInput.timingend || !userInput.ts_1 || !userInput.te_1){
            toast.error("all fields are mandatory");
            return;
        }
       
        
        
        //dispatch create account action
        const response=await dispatch(AddShow(userInput));
        if(response?.payload?.success){
            setUserInput({
                th_id:state.th_id,
                mov_name:state.mov_name,
                timingstart:"",
                timingend:"",
               
        
            })
           
        }


    }
    return(
        <HomeLayout>
        <div className="flex items-center justify-center h-[90vh] bg-gray-800">
        <form noValidate onSubmit={onFormSubmit} className="flex flex-col justify-center gap-3 rounded-lg p-4 text-white w-75 h-[65vh] lg:w-96 shadow-[0_0_10px_black] bg-gray-800">
            <h1 className="text-center text-2xl font-bold">Add Show</h1>
            
            <div className="flex flex-col gap-1">
                <label htmlFor="timingstart" className="font-semibold">Timings Start</label>
                <input 
                    type="number"
                    required
                    name="timingstart"
                    id="timingstart"
                    placeholder="Enter start timing"
                    className="bg-transparent px-2 py-1 border"
                    value={userInput.timingstart}
                    onChange={handleUserInput}/>
                
                    <input 
                        type="text"
                        required
                        name="ts_1"
                        id="ts_1"
                        placeholder="Enter AM or PM"
                        className="bg-transparent px-2 py-1 border"
                        value={userInput.ts_1}
                        onChange={handleUserInput}/>
            </div>
            <div className="flex flex-col gap-1">
                <label htmlFor="timingend" className="font-semibold">Timings End</label>
                <input 
                    type="number"
                    required
                    name="timingend"
                    id="timingend"
                    placeholder="Enter end timing"
                    className="bg-transparent px-2 py-1 border"
                    value={userInput.timingend}
                    onChange={handleUserInput}/>
                <input 
                    type="text"
                    required
                    name="te_1"
                    id="te_1"
                    placeholder="Enter AM or PM"
                    className="bg-transparent px-2 py-1 border"
                    value={userInput.te_1}
                    onChange={handleUserInput}/>
                    
            </div>
           
            
                
                
            
           

            <button type="submit" className="mt-2 bg-yellow-600 hover:bg-yellow-400 transition-all ease-in-out duration-300 text-black font-semibold hover:text-blue-950 rounded-md py-1 text-lg cursor-pointer ">
            Add timings
            </button>
            
           
            </form>
    </div>
        
        
        
        </HomeLayout>
    )

}
export default Addshow;