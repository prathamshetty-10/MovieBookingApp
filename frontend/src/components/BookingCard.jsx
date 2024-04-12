import { useNavigate } from "react-router-dom";
import { unlockSeat } from "../../../server/controllers/bookingControllers";
import { useState } from "react";
function BookingCard({ data }){
    
    const navigate=useNavigate();
    async function unlockSeats(){

    }
    return(
        <div className="text-white w-[30rem] h-[350px] lg:h-[350px] shadow-xl shadow-black border-yellow-800 border rounded-lg cursor-pointer group overflow-hidden bg-zinc-700  mt-10 mb-10" >
            <div className="overflow-hidden " >
                
                <div className="p-3 space-y-1 text-white">
                    
                    <h2 classname="text-xl font-bold  text-yellow-500 line-clamp-2 gap-1">
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
                    

                
                </div>
                


            </div>  
                  
        </div>
    )

}
export default BookingCard;