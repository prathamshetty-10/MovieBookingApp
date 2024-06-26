
import HomeLayout from "../../layout/Homelayout";

import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import { BsPersonCircle } from "react-icons/bs";
import { getBookings } from "../../Redux/Slices/BookingSlice";
function Profile(){
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const userData=useSelector((state)=>state?.auth1?.data[0]);
    
    return(
        <HomeLayout>
            <div className="gap-4 bg-gray-800 min-h-[90vh] flex items-center justify-center">
                <div className=" text-2xl w-[40vh] lg:w-[70vh] flex flex-col justify-center gap-4 rounded-lg p-4 text-white shadow-[0_0_10px_black] bg-gray-800 ">
                <BsPersonCircle className="w-24 h-24 rounded-full m-auto"/>
                    <h3 className="text-xl font-semibold text-center capitalize">{userData.user_name}
                    </h3>
                    <div className="grid grid-cols-2">
                        <p className="text-yellow-500">Email: </p><p >{userData?.user_email} </p>
                        
                        <p className="text-yellow-500">Role:</p><p>{userData?.user_role}</p>
                        
                        <p className="text-yellow-500">Phone number:</p><p>{userData?.ph_no}</p>

                    </div>
                    
                </div>
            </div>
        
        
        </HomeLayout>
    )
}
export default Profile;