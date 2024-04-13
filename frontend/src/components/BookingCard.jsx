import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { unlockSeats ,cancelBookings} from "../Redux/Slices/BookingSlice";
import { useDispatch,useSelector } from "react-redux";
function BookingCard({ data }){
    const dispatch=useDispatch();
   
    const [unLockSeat,setunLockSeat]=useState({
        unlocked:"no",
    })
    const [userInput,setUserInput]=useState({
        user_email:data.user_email,
        ph_no:data.ph_no,
        time_id:data.time_id,
        num_seat:data.num_seat,
        
    })
    const navigate=useNavigate();
    async function unlock(event){
        event.preventDefault();
        const response=await dispatch(unlockSeats(userInput));
        
        
        if(response?.payload?.success){
            
            setunLockSeat({
                unlocked:"yes"
        
        })
    }}
    async function cancelBook(event){
        event.preventDefault();
        const response=await dispatch(cancelBookings(userInput));
        
        
        if(response?.payload?.success){
            
            navigate('/');
        
        }
    }
    return(
        <div className="text-white w-[30rem] h-[350px] lg:h-[350px] shadow-xl shadow-black border-yellow-800 border rounded-lg cursor-pointer group overflow-hidden bg-zinc-700  mt-10 mb-10" >
            <div className="overflow-hidden " >
                
                <div className="p-3 gap-2 text-white ">
                    
                    <h2 classname="text-xl font-bold  text-yellow-500 line-clamp-2 gap-1 ">
                    <p className="font-semibold text-2xl"> 
                    <span className="text-yellow-500 px-5">email:</span>
                    {data?.user_email}</p>
                    <p className="font-semibold text-2xl"> 
                    <span className="text-yellow-500 px-5">ph_no:</span>
                    {data?.ph_no}</p>
                    <p className="font-semibold text-2xl"> 
                    <span className="text-yellow-500 px-5">number of seats:</span>
                    {data?.num_seat}</p>
                    <p className="font-semibold text-2xl "> 
                    <p className="text-yellow-500 px-5">booking_id:</p>
                    <span className="px-9">{data?.time_id}</span></p>
                    </h2>
                    {unLockSeat.unlocked=='no' && (<button onClick={unlock} className="mb-[3vh] mt-[5vh] bg-yellow-600 hover:bg-yellow-400 transition-all ease-in-out duration-300 text-black font-semibold hover:text-blue-950 rounded-md py-1 text-lg cursor-pointer w-full">Unlock Seat</button>)}
                    {unLockSeat.unlocked=='yes'?(
                        <button  onClick={cancelBook} className=" px-[20vh] mb-[3vh] mt-[1vh] bg-yellow-600 hover:bg-yellow-400 transition-all ease-in-out duration-300 text-black font-semibold hover:text-blue-950 rounded-md py-1 text-lg cursor-pointer w-full">
                        Cancel Booking
                        </button>):(<label className="px-[23vh] mb-[3vh] mt-[5vh] bg-gray-600 hover:bg-gray-400 transition-all ease-in-out duration-300 text-black font-semibold hover:text-blue-950 rounded-md py-1 text-lg cursor-pointer w-full">
                        CancelBooking
                        </label>)}

                
                </div>
                


            </div>  
                  
        </div>
    )

}
export default BookingCard;