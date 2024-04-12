import { useEffect, useState } from "react";
import HomeLayout from "../layout/Homelayout";
import { useLocation, useNavigate,Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {AddSeats} from "../Redux/Slices/BookingSlice";
import { AiOutlineArrowLeft } from "react-icons/ai";


function AddSeat(){
    const navigate=useNavigate();
    const dispatch=useDispatch();
    const {state}=useLocation();
    const isLoggedIn=useSelector((state)=>state?.auth1?.isLoggedIn);
    const role=useSelector((state)=>state?.auth1?.role);
    const [userInput,setUserInput]=useState({
        time_id:state.time_id,
        num_seats:''
    });
    
function handleUserInput(e){
    e.preventDefault();
    const {name,value}=e.target;
    setUserInput({
        ...userInput,
        [name]:value
    })
   
}
async function AddSeatss(event){
    event.preventDefault();
    if(!userInput.num_seats ){
        toast.error("Please fill all details");
        return;

    }
    const response=await dispatch(AddSeats(userInput));
    
    if(response?.payload?.success){
        
       
            navigate(-1);
    
       
    
    //once action is successful
    
    setUserInput({
        time_id:state.time_id,
        num_seats:'' 
    })
   
    

        }
       
        


}

return(
    <HomeLayout>
    <div className="flex items-center justify-center h-[90vh] bg-gray-800">
    
                    <form noValidate onSubmit={AddSeatss} className="flex flex-col justify-center gap-3 rounded-lg p-4 text-white w-75 lg:w-96 shadow-[0_0_10px_black] bg-gray-800">
                    <h1 className="text-center text-2xl font-bold">Add Seats</h1>
                    
                    <div className="flex flex-col gap-1">
                        <label htmlFor="num_seats" className="font-semibold">Num Seats</label>
                        <input 
                            type="text"
                            required
                            name="num_seats"
                            id="num_seats"
                            placeholder="Enter number of seats"
                            className="bg-transparent px-2 py-1 border"
                            value={userInput.num_seats}
                            onChange={handleUserInput}/>
                    </div>
                    
                    <button type="submit" className="mt-2 bg-yellow-600 hover:bg-yellow-400 transition-all ease-in-out duration-300 text-black font-semibold hover:text-blue-950 rounded-md py-1 text-lg cursor-pointer ">
                    Add Seat</button>
                    
                   
                   
                    </form>
        
                    </div>
    </HomeLayout>
)
}
export default AddSeat;