
import HomeLayout from "../layout/Homelayout";


import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Link, useNavigate } from "react-router-dom";

import {toast} from "react-hot-toast";

import { getAllLocations } from "../Redux/Slices/LocationSlice";
import LocationCard from "../components/LocationCard";
import { AiOutlineArrowLeft } from "react-icons/ai";

function Location(){
    const dispatch=useDispatch();
    const navigate=useNavigate();
    //in login and signup we made state here itself as auth slice has state having state of authentication
    //here the course slice has our state and course data
    const {locationData}=useSelector((state)=>state.locations);
    //on first load of component useeffect will load the course Data
    async function loadlocations(){
        await dispatch(getAllLocations());
        

    }
    //you want
    useEffect(()=>{
        loadlocations();
    },[]);
   
    return(
        
        <HomeLayout>
        <div className="min-h-[90vh] pt-20 lg:pt-12 pl-12 pr-10 lg:pr-20 lg:pl-20 flex flex-col gap-10 text-white  bg-gray-800">
                <Link onClick={()=>navigate(-1)} className=" absolute pl-[10vh] top-[7vh] text-3xl link text-accent cursor-pointer">
                        <AiOutlineArrowLeft/>
                    </Link>
                <h1 className="text-2xl lg:text-3xl px-[30vh] text-yellow-500 font-bold">
                    Choose your location
                    </h1>
                    <div className="mb-15  flex flex-wrap gap-10 justify-center">
                        {locationData?.map((element)=>{
                            return <LocationCard key={element.loc_id} data={element}/>
                        })}
                    
                    
                    </div>
                
                
            
            
        
                    </div>
        
            
        
        </HomeLayout>
    )

}
export default Location;