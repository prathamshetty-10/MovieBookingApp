import HomeLayout from "../layout/Homelayout";
import AboutMainImage from "../assets/goodimg.jpeg"
function About(){
    
    return(
        <HomeLayout>
            <div className="min-h-[90vh] pt-20 lg:pt-12 pl-12 pr-10 lg:pr-20 lg:pl-20 flex flex-col gap-10 text-white  bg-gray-800">
                <div className="lg:flex items-center gap-5 mx-10 mt-20">
                    <section className="w-full lg:w-1/2 space-y-10">
                        <h1 className="text-4xl lg:text-5xl text-yellow-500 font-semibold">
                            Affordable and quality Movies
                        </h1>
                        <p className="text-xl text-gray-200">
                        The all-new Epic Movie APP makes movie booking a seamless and hassle-free experience. You can now buy your tickets directly on our app. Stay updated with movie information, movie schedule, upcoming movies, show timings, pre-book food, and seats, and get many more additional exclusive loyalty benefits.
                        </p>
                    
                    </section>
                    <div className="w-full lg:w-1/2 px-2 lg:px-8 mt-30 lg:my-5">
                        <img id="test1" style={{filter:"drop-shadow(0px 10px 10px rgb(0,0,0))"}}
                        className="drop-shadow-2xl" src={AboutMainImage} height={900} width={900}/>
                    </div>
                
                
                </div>
                
                
            
            
            </div>
        
        
        
        </HomeLayout>
    
    );

};
export default About;