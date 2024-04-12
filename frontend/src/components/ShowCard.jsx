import { useNavigate } from "react-router-dom";
import { MdOutlineDoubleArrow } from "react-icons/md";

function ShowCard({ data }){

    //here add the seats part then do bookings done
    const navigate=useNavigate();
    return(
        <div  className="text-white w-[20rem] h-[250px] lg:h-[250px] shadow-xl shadow-black border-yellow-800 border rounded-lg cursor-pointer group overflow-hidden bg-zinc-700  mt-10" >
            <div className="overflow-hidden " >
                
                <div className=" flex flex-row p-2 space-y-1 text-white mt-8 gap-3">
                    
                    
                    <p className="font-semibold text-7xl"> 
                    
                    {data?.timingstart}</p>
                    <p className="py-[5vh] font-semibold text-3xl"> 
                    
                    {data?.ts_1}</p>
                    <p className="py-[3vh] text-3xl">
                    <MdOutlineDoubleArrow />
                    </p>
                    <p className="font-semibold text-7xl"> 
                    
                    {data?.timingend}</p>
                    <p className="py-[5vh] font-semibold text-3xl"> 
                    
                    {data?.te_1}</p>
                

                
                </div>
                <div className="px-[12vh]">
                <button onClick={()=>navigate("/book/ticket",{state:{...data}})}
                className=" border w-fit bg-yellow-500 hover:bg-yellow-300 transition-all ease-in-out duration-300 rounded py-2 px-4 font-bold text-lg cursor-pointer text-gray-800 ">
                Book Ticket
                </button>
                </div>


            </div>  
                  
        </div>
    )

}
export default ShowCard;