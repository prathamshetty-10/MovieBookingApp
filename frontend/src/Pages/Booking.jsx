import { useState ,useEffect } from "react";
import toast from "react-hot-toast";
import { useDispatch,useSelector } from "react-redux";
import { useNavigate,useLocation } from "react-router-dom";
import {getSeats,lockSeats,BookTicket} from "../Redux/Slices/BookingSlice"; 
import HomeLayout from "../layout/Homelayout";
import { MdOutlineDoubleArrow } from "react-icons/md";
function Booking(){
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const {state}=useLocation();
  
    const numSeats=useSelector((state)=>state?.bookings?.numSeats);
    const role=useSelector((state)=>state?.auth1?.role);
    //a state to hold form ka data
    const [LockSeat,setLockSeat]=useState({
        locked:"no",
    })
    const [userInput,setUserInput]=useState({
        time_id:state.time_id,
        num_seats:'',
        
    })
    function handleUserInput(e){
        e.preventDefault();
        const {name,value}=e.target;
        setUserInput({
            ...userInput,
            [name]:value
        })
       
    }
    async function LockSeat1(event){
        event.preventDefault();
        if(!userInput.num_seats ){
            toast.error("Please fill seats");
            return;

        }
        if(userInput.num_seats>numSeats || numSeats==0){
            toast.error("seats not available");
            return;
        }
        const response=await dispatch(lockSeats(userInput));
        
        
        if(response?.payload?.success){
            console.log('reached');
            setLockSeat({
                locked:"yes"
        
        })
    }}
    async function onFormSubmit(e){
        e.preventDefault();//by default form submit karne par it refreshes usko we are avoiding
        if(!userInput.time_id|| !userInput.num_seats){
            toast.error("all fields are mandatory");
            return;
        }
       
        
        
        //dispatch create account action
        const response=await dispatch(BookTicket(userInput));
        if(response?.payload?.success){
            setUserInput({
                time_id:state.time_id,
                num_seats:'',
                
               
        
            })
            navigate('/');
        
           
        }


    }
    async function loadSeats(){
        await dispatch(getSeats(state));
    }
    useEffect(()=>{
        loadSeats();
    },[]);
   
    return(
        <HomeLayout>
        <div className="flex items-center justify-center h-[90vh] bg-gray-800">
        <form noValidate onSubmit={onFormSubmit} className="flex flex-col justify-center gap-2 rounded-lg p-4 text-white w-75 h-[65vh] lg:w-96 shadow-[0_0_10px_black] bg-gray-800">
            <h1 className="text-center text-2xl font-bold">Book Show</h1>
            
            <div className="flex flex-col gap-1">
            <div className=" flex flex-row p-2 space-y-1 text-white mt-4 gap-3">
                    
                    
                    <p className="font-semibold text-5xl"> 
                    
                    {state?.timingstart}</p>
                    <p className="py-[2vh] font-semibold text-2xl"> 
                    
                    {state?.ts_1}</p>
                    <p className="py-[2vh] text-2xl">
                    <MdOutlineDoubleArrow />
                    </p>
                    <p className="font-semibold text-5xl"> 
                    
                    {state?.timingend}</p>
                    <p className="py-[2vh] font-semibold text-2xl"> 
                    
                    {state?.te_1}</p>
                

                
                </div>
                <label htmlFor="timingstart" className="font-bold"> Seats Available :<span className="text-yellow-500 ml-[2vh]">{numSeats?numSeats:0}</span></label>
                
            </div>
            <div className="flex flex-row gap-1">
                <label htmlFor="seats" className="font-semibold mt-[1vh]">Seats To Book</label>
                <input 
                    type="number"
                    required
                    name="num_seats"
                    id="seats"
                    placeholder=" num of seats to book"
                    className="bg-transparent px-2 py-1 border"
                    value={userInput.num_seats}
                    onChange={handleUserInput}/>
                    
                    
            </div>
            {LockSeat.locked=='no'&&(
            <button  onClick={LockSeat1} className="mt-2 bg-yellow-600 hover:bg-yellow-400 transition-all ease-in-out duration-300 text-black font-semibold hover:text-blue-950 rounded-md py-1 text-lg cursor-pointer ">
            Lock Seats
            </button>)}
            {role=='ADMIN' && !numSeats && (<button  onClick={()=>navigate("/seat/add",{state:state})} className="mt-2 bg-yellow-600 hover:bg-yellow-400 transition-all ease-in-out duration-300 text-black font-semibold hover:text-blue-950 rounded-md py-1 text-lg cursor-pointer ">
                    Add Seats
                    </button>)}
           
            
                
                
            
           
            {LockSeat.locked=='yes'?(
            <button type="submit" className="mt-2 bg-yellow-600 hover:bg-yellow-400 transition-all ease-in-out duration-300 text-black font-semibold hover:text-blue-950 rounded-md py-1 text-lg cursor-pointer ">
            Book Ticket
            </button>):(<label className="mt-2 bg-gray-600 hover:bg-gray-400 transition-all ease-in-out duration-300 text-black font-semibold hover:text-blue-950 rounded-md py-1 text-lg cursor-pointer px-[15vh]">
            Book Ticket
            </label>)}
            
           
            </form>
    </div>
        
        
        
        </HomeLayout>
    )

}
export default Booking;