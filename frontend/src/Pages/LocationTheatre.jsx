import { useEffect, useState } from "react";
import HomeLayout from "../layout/Homelayout";
import { useLocation, useNavigate,Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllTheatres} from "../Redux/Slices/TheatreSlice";
import TheatreCard from "../components/TheatreCard";
import { AiOutlineArrowLeft } from "react-icons/ai";
function DisplayTheatres(){
    const navigate=useNavigate();
    const dispatch=useDispatch();
    const {state}=useLocation();
    
    const {TheatreData}=useSelector((state)=>state.theatres);
    useEffect(()=>{
       
        if(!state)navigate("/movies")
        dispatch(getAllTheatres(state.loc_id)); //this puts the lectures list into the lectures state
        
    },[])
return(
    <HomeLayout>
    <div className="min-h-[90vh] pt-20 lg:pt-12 pl-12 pr-10 lg:pr-20 lg:pl-20 flex flex-col gap-10 text-white  bg-gray-800">
                <Link onClick={()=>navigate(-1)} className=" absolute pl-[10vh] top-[7vh] text-3xl link text-accent cursor-pointer">
                        <AiOutlineArrowLeft/>
                    </Link>
                <h1 className="text-2xl lg:text-3xl px-[30vh] text-yellow-500 font-bold">
                    Choose your theatre
                    </h1>
                    <div className="mb-15  flex flex-wrap gap-10 justify-center ">
                        {TheatreData?.map((element)=>{
                            return <TheatreCard key={element.th_id} data={element}/>
                        })}
                    
                    
                    </div>
                
                
            
            
        
                    </div>
        
    
    </HomeLayout>
)
}
export default DisplayTheatres;