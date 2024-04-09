import { useNavigate } from "react-router-dom";

function LocationCard({ data }){
    const navigate=useNavigate();
    return(
        <div onClick={()=>navigate("/location/theatre",{state:{...data}})} className="text-white w-[20rem] h-[450px] lg:h-[450px] shadow-xl shadow-black border-yellow-800 border rounded-lg cursor-pointer group overflow-hidden bg-zinc-700 hover:scale-105 mt-10" >
            <div className="overflow-hidden " >
                <img className="h-80 w-full rounded-tl-lg rounded-tr-lg transition-all ease-in-out duration-300" src={data?.secure_url} alt="location thumbnail" />
                <div className="p-3 space-y-1 text-white">
                    <h2 className="text-xl font-bold  text-yellow-500 line-clamp-2" >{data?.loc_id}</h2>
                    <h2 classname="text-xl font-bold  text-yellow-500 line-clamp-2">
                    <p className="font-semibold text-3xl"> 
                    <span className="text-yellow-500 ">Location:</span>
                    {data?.loc_name}</p>
                    </h2>

                
                </div>


            </div>  
                  
        </div>
    )

}
export default LocationCard;