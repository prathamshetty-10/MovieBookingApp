import { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useNavigate,useLocation } from "react-router-dom";
import {AddMovies} from "../Redux/Slices/MovieSlice"; 
import HomeLayout from "../layout/Homelayout";

function AddMovie(){
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const {state}=useLocation();
    //a state to hold form ka data
    const [userInput,setUserInput]=useState({
        th_id:state.th_id,
        mov_name:"",
        mov_desc:"",
        rating:"",
        mov_dur:"",
        previewImage:"",
        thumbnail:"",
        

    })
    function handleImageUpload(e){
        e.preventDefault();
        const uploadedImage=e.target.files[0];//getting image
        
        if(uploadedImage){
            
            const fileReader=new FileReader();
            fileReader.readAsDataURL(uploadedImage);
            fileReader.addEventListener("load",function(){
                
                setUserInput({
                    ...userInput,
                    previewImage:this.result,//this data url will be going to backend actually to get the pic
                    thumbnail:uploadedImage,
                })
            })

        }

    }
    function handleUserInput(e){
        e.preventDefault();
        const {name,value}=e.target;
        setUserInput({
            ...userInput,
            [name]:value
        })
    }
    async function onFormSubmit(e){
        e.preventDefault();//by default form submit karne par it refreshes usko we are avoiding
        if(!userInput.mov_name||!userInput.mov_desc||!userInput.rating||!userInput.thumbnail || !userInput.mov_dur){
            toast.error("all fields are mandatory");
            return;
        }
       
        const formData=new FormData();
        formData.append("th_id",userInput.th_id);
        
        formData.append("mov_name",userInput.mov_name);
        formData.append("mov_desc",userInput.mov_desc);
        formData.append("mov_dur",userInput.mov_dur);
        formData.append("rating",userInput.rating);
        formData.append("thumbnail",userInput.thumbnail);
        
        //dispatch create account action
        const response=await dispatch(AddMovies(formData));
        if(response?.payload?.success){
            setUserInput({
                th_id:"",
                mov_name:"",
                mov_desc:"",
                rating:"",
                mov_dur:"",
                previewImage:"",
                thumbnail:"",
                
        
            })
            navigate(-1);
        }


    }
    return(
        <HomeLayout>
            <div className="flex items-center justify-center min-h-[90vh] bg-gray-800">
                <form onSubmit={onFormSubmit}
                    className="flex relative flex-col justify-center my-20 lg:my-0 gap-3 rounded-lg p-4 text-white w-[40vh] lg:w-[80vh] shadow-[0_0_10px_black] bg-gray-800 ">
                    
                    <h1 className="text-center text-2xl font-bold">Add Movie</h1>
                    <main className="grid grid-cols-1 lg:grid-cols-2 gap-x-10">
                        <div className="gap-y-6">
                            <div>
                                <label htmlFor="image_uploads" className="cursor-pointer">
                                {userInput.previewImage?(
                                    <img className="w-full h-44 m-auto border"
                                    src={userInput.previewImage}/>
                                ):( 
                                    <div className="w-full h-44 m-auto mt-10 mb-8 flex items-center justify-center border">
                                        <h1 className="font-bold text-lg m-5">Upload your Movie poster</h1>
                                    </div>
                                )}
                                
                                </label>
                                <input 
                                    className="hidden"
                                    type="file"
                                    id="image_uploads"
                                    accept=".jpg, .jpeg, .png"
                                    name="image_uploads"
                                    onChange={handleImageUpload}/>
                                
                            </div>
                            <div className="flex flex-col gap-1">
                                <label htmlFor="title" className="font-semibold">Movie Name</label>
                                <input 
                                    type="text"
                                    required
                                    name="mov_name"
                                    id="title"
                                    placeholder="Enter movie name"
                                    className="bg-transparent px-2 py-1 border"
                                    value={userInput.mov_name}
                                    onChange={handleUserInput}/>
                            </div>
                        </div>
                        <div className="flex flex-col gap-1 mt-5">
                            <div className="flex flex-col gap-2 mb-3">
                                <label htmlFor="createdBy" className="font-semibold">Movie rating</label>
                                <input 
                                    type="text"
                                    required
                                    name="rating"
                                    id="createdBy"
                                    placeholder="Enter movie rating"
                                    className="bg-transparent px-2 py-1 border"
                                    value={userInput.rating}
                                    onChange={handleUserInput}/>
                            </div>
                            <div className="flex flex-col gap-2 mb-3">
                                <label htmlFor="category" className="font-semibold">Movie duration</label>
                                <input 
                                    type="text"
                                    required
                                    name="mov_dur"
                                    id="category"
                                    placeholder="enter movie duration"
                                    className="bg-transparent px-2 py-1 border"
                                    value={userInput.mov_dur}
                                    onChange={handleUserInput}/>
                            </div>
                            <div className="flex flex-col gap-2 mb-3">
                                <label htmlFor="description" className="font-semibold">Movie description</label>
                                <textarea 
                                    type="text"
                                    required
                                    name="mov_desc"
                                    id="description"
                                    placeholder="Enter movie description"
                                    className="bg-transparent px-2 py-1 h-24 overflow-y-scroll border resize-none"
                                    value={userInput.mov_desc}
                                    onChange={handleUserInput}/>
                            </div>
                        </div>
                    
                    </main>
                    <button type="submit" className="w-full mt-2 bg-yellow-600 hover:bg-yellow-400 transition-all ease-in-out duration-300 text-black font-semibold hover:text-blue-950 rounded-md py-1 text-lg cursor-pointer  ">
                    Add Movie
                    
                    </button>
                </form>
        
            </div>

        
        
        
        </HomeLayout>
    )

}
export default AddMovie;