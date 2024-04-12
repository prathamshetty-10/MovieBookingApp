import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import HomeLayout from "../layout/Homelayout";
import { useSelector } from "react-redux";

function MovieDesc(){
    const locator=useLocation();
    const Navigate=useNavigate();
    
    const {role,data}=useSelector((state)=>state.auth1);
    
    return(
        <HomeLayout>
            <div className="min-h-[90vh] pt-12 px-12 lg:px-20 flex flex-col items-center justify-center text-white bg-gray-800">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 py-10 relative ">
                    
                        <div className="space-y-2 text-2xl gap-5">
                            <h1 className="text-4xl font-bold text-yellow-500 text-center mb-12 lg:mb-5 py-[5vh]">{locator?.state?.mov_name}</h1>
                            
                            <p>{locator?.state?.mov_desc}</p>
                            {role=='ADMIN' && (
                            <button onClick={()=>Navigate("/show/add",{state:{...locator.state}})} className=" bg-yellow-600 text-xl rounded-md font-bold px-5 py-3 w-full hover:bg-yellow-400 transition-all ease-in-out duration-300 text-gray-800 ">
                                     Add show
                                    
                            </button>)}
                        </div>
                        <div className="space-y-5">
                        <img src={locator.state?.secure_url} alt="thumbnail" className="w-full h-[60vh]"/>
                        <div className="space-y-4">
                            <div className="flex flex-col  text-xl">
                                <p className="font-semibold">
                                    <span className="text-yellow-500 font-bold">
                                        Rating :{" "}
                                    </span>
                                    
                                    {locator.state?.rating}
                                    
                                </p>
                                
                                <p className="font-semibold">
                                <span className="text-yellow-500 font-bold">
                                    
                                Duration  :{" "}
                                </span>
                                
                                {locator.state?.mov_dur}
                                <span className=" font-bold">
                                    
                                {" "} min
                                </span>
                                </p>
                        
                            </div>
                            
                            <button onClick={()=>Navigate("/timings",{state:{...locator.state}})} className="bg-yellow-600 text-xl rounded-md font-bold px-5 py-3 w-full hover:bg-yellow-400 transition-all ease-in-out duration-300 text-gray-800">
                                     Select Timings
                                    
                            </button>
                               
                    
                        
                        
                        </div>
                    </div>
                </div>
                
            </div>
            
            
            
        
        
        
        
        </HomeLayout>



    )

}
export default MovieDesc;