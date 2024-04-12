import { useEffect, useState } from "react";
import HomeLayout from "../layout/Homelayout";
import { useLocation, useNavigate,Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllMovies} from "../Redux/Slices/MovieSlice";
import MovieCard from "../components/MovieCard";
import { AiOutlineArrowLeft } from "react-icons/ai";
function DisplayMovies(){
    const navigate=useNavigate();
    const dispatch=useDispatch();
    const {state}=useLocation();
    const isLoggedIn=useSelector((state)=>state?.auth1?.isLoggedIn);
    const role=useSelector((state)=>state?.auth1?.role);
    
    const {MovieData}=useSelector((state)=>state.movies);
    useEffect(()=>{
       
        if(!state)navigate("/movies")
        dispatch(getAllMovies(state.th_id)); //this puts the lectures list into the lectures state
        
    },[])
return(
    <HomeLayout>
    <div className="min-h-[90vh] pt-20 lg:pt-12 pl-12 pr-10 lg:pr-20 lg:pl-20 flex flex-col gap-10 text-white  bg-gray-800">
    <div className="flex "> 
    <Link onClick={()=>navigate(-1)} className=" absolute pl-[10vh] top-[7vh] text-3xl link text-accent cursor-pointer">
                        <AiOutlineArrowLeft/>
                    </Link>
                <h1 className="text-2xl lg:text-3xl px-[30vh] text-yellow-500 font-bold">
                    Choose your movie
                    </h1>
                    
                    {isLoggedIn && role=="ADMIN"&& (
                    <button onClick={()=>navigate("/movie/add",{state:state})}
                        className="w-fit bg-yellow-500 hover:bg-yellow-300 transition-all ease-in-out duration-300 rounded py-2 px-4 font-semibold text-lg cursor-pointer text-blue-700 ">
                        Add Movie
                        </button>)}
                   </div>
                    <div className="mb-15  flex flex-wrap gap-10 justify-center ">
                        {MovieData?.map((element)=>{
                            return <MovieCard key={element.th_id} data={element}/>
                        })}
                    
                    
                    </div>
                
                
            
            
        
                    </div>
        
    
    </HomeLayout>
)
}
export default DisplayMovies;