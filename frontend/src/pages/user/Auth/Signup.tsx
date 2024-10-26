import { useState } from "react";
import { toast } from "sonner";
import GoogleAuth from "./GoogleAuth";
import { signUpRequest } from "../../../service/Api/userApi";

const Signup = () => {
  
  const  [email, setemail] = useState('')
  const handleSubmit =async()=>{
    try {
      
      if(email.trim()){
        const res= await signUpRequest(email) 

        toast.success(res.data.response)
        
        
      }else{
        toast.error('Enter email')
      }
    } catch (error) {
      toast.error((error as Error).message )
    }
    
  }
  return (
    <div className="flex h-full w-full">
      {/* Left section with text */}
      <div className="w-[50%] flex flex-col pt-44 text-[3.3rem] ps-14 bg-text-gradient bg-clip-text text-transparent font-light">
        <h1>Elevate Your Wardrobe,</h1>
        <h1>Elevate Your Bid...!</h1>
        <p className="text-sm font-normal text-gray-700">Discover a dynamic auction platform where buyers and sellers connect in 
          real-time. Bid on unique items, <br />place competitive offers, and experience the thrill of winning. Our user-friendly 
          interface simplifies browsing, bidding, and tracking your auctions, ensuring a seamless experience. Join us to unleash 
          the excitement of online auctions! </p>
      </div>
      
      {/* Right section */}
      <div className="w-[50%] flex justify-center pt-[7rem] ps-[4rem]">
        <div className="w-[50%] h-[50%]  flex flex-col items-center  text-[#7b7575] text-center">
          <h1 className="text-[2.2rem] font-thin bg-text-gradient bg-clip-text text-transparent">Welcome to LuxBid</h1><br />
          <h3>Sign up with your Gmail.</h3>
          <GoogleAuth/>
          {/* <hr className=" mt-3 w-[50%] h-[.2px]"/> */}
          <input
          value={email}
            type="email"
            placeholder=" Email"
            onChange={(e)=>setemail(e.target.value)}
            className="mt-3 p-2 w-[65%] mb-3  bg-zinc-700 border-white rounded-md"
          />
           <button onClick={()=>handleSubmit()}  className=" w-[65%] text-white p-2 rounded-md content-center bg-[#56555ca7]">
             Continue 
          </button><br />
          <h6>Already have an account?<span className="text-white ps-1">SignIn</span></h6>
        </div>
      </div>

    </div>
  );
}

export default Signup;
