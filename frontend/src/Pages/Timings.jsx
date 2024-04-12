import { useEffect, useState } from "react";
import HomeLayout from "../layout/Homelayout";
import { useLocation, useNavigate,Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllTimings} from "../Redux/Slices/TimingSlice";
import ShowCard from "../components/ShowCard";
import { AiOutlineArrowLeft } from "react-icons/ai";
function Timings(){
    const navigate=useNavigate();
    const dispatch=useDispatch();
    const {state}=useLocation();
    const isLoggedIn=useSelector((state)=>state?.auth1?.isLoggedIn);
    const role=useSelector((state)=>state?.auth1?.role);
    const {TimingData}=useSelector((state)=>state.timings);
    useEffect(()=>{
       
        if(!state)navigate("/movies")
        
        console.log(state);
        dispatch(getAllTimings(state)); //this puts the lectures list into the lectures state
        
    },[])
return(
    <HomeLayout>
    <div className="min-h-[90vh] pt-20 lg:pt-12 pl-12 pr-10 lg:pr-20 lg:pl-20 flex flex-col gap-10 text-white  bg-gray-800">
                <div className="flex">
    <Link onClick={()=>navigate(-1)} className=" absolute pl-[10vh] top-[7vh] text-3xl link text-accent cursor-pointer">
                        <AiOutlineArrowLeft/>
                    </Link>
                <h1 className="text-2xl lg:text-3xl px-[30vh] text-yellow-500 font-bold">
                    Choose your timings
                    </h1>
                    {isLoggedIn && role=="ADMIN"&& (
                        <button onClick={()=>navigate("/show/add",{state:state})}
                            className="w-fit bg-yellow-500 hover:bg-yellow-300 transition-all ease-in-out duration-300 rounded py-2 px-4 font-semibold text-lg cursor-pointer text-gray-800 ">
                            Add Show
                            </button>)}</div>
                    <div className="mb-15  flex flex-wrap gap-10 justify-center ">
                        {TimingData?.map((element)=>{
                            return <ShowCard key={element.time_id} data={element}/>
                        })}
                    
                    
                    </div>
                
                
            
            
        
                    </div>
        
    
    </HomeLayout>
)
}
export default Timings;