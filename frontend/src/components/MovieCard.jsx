import { useNavigate } from "react-router-dom";

function MovieCard({ data }){
    const navigate=useNavigate();
    return(
        <div onClick={()=>navigate("/movie/desc",{state:{...data}})} className="text-white w-[30rem] h-[550px] lg:h-[450px] shadow-xl shadow-black border-yellow-800 border rounded-lg cursor-pointer group overflow-hidden bg-zinc-700 hover:scale-105 mt-10" >
            <div className="overflow-hidden " >
                <img className="h-[45vh] w-full rounded-tl-lg rounded-tr-lg transition-all ease-in-out duration-300" src={data?.secure_url} alt="location thumbnail" />
                <div className="p-3 space-y-1 text-white">
                    
                    <h2 classname="text-xl font-bold  text-yellow-500 line-clamp-2 gap-1">
                    <p className="font-semibold text-2xl"> 
                    <span className="text-yellow-500 ">name:</span>
                    {data?.mov_name}</p>
                    <p className="font-semibold text-2xl"><span className="text-yellow-500 ">Rating</span>
                    {data?.rating}</p>
                    </h2>

                
                </div>


            </div>  
                  
        </div>
    )

}
export default MovieCard;