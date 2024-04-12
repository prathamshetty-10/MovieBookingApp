import { useEffect, useState } from "react";
import HomeLayout from "../layout/Homelayout";
import { useLocation, useNavigate,Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllBookings} from "../Redux/Slices/BookingSlice";

import { AiOutlineArrowLeft } from "react-icons/ai";
import BookingCard from "../components/BookingCard";
function MyBookings(){
    const navigate=useNavigate();
    const dispatch=useDispatch();
    
    const isLoggedIn=useSelector((state)=>state?.auth1?.isLoggedIn);
    const role=useSelector((state)=>state?.auth1?.role);
    
    const BookingData=useSelector((state)=>state.bookings.AllBookings);
    
    useEffect(()=>{
        dispatch(getAllBookings()); //this puts the lectures list into the lectures state 
    },[])
return(
    <HomeLayout>
    <div className="min-h-[90vh] pt-20 lg:pt-12 pl-12 pr-10 lg:pr-20 lg:pl-20 flex flex-col gap-10 text-white  bg-gray-800">
    <div className="flex "> 
    <Link onClick={()=>navigate(-1)} className=" absolute pl-[10vh] top-[7vh] text-3xl link text-accent cursor-pointer">
                        <AiOutlineArrowLeft/>
                    </Link>
                <h1 className="text-2xl lg:text-3xl px-[30vh] text-yellow-500 font-bold">
                    Customer Bookings
                    </h1>
                    
                    
                   </div>
                    <div className="mb-15  flex flex-wrap gap-10 justify-center ">
                        {BookingData ?BookingData?.map((element)=>{
                            return <BookingCard key={element.time_id} data={element}/>
                        }):(<div></div>)}
                    
                    
                    </div>
                
                
            
            
        
                    </div>
        
    
    </HomeLayout>
)
}
export default MyBookings;