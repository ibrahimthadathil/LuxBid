
import { useState } from "react";
import OTPInput from "../../../components/global/OTPBox";
import SideTextSection from "../../../components/global/SideTextSection";
import { otpVerification } from "../../../service/Api/userApi";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../redux/store/store";
import { loaginSuccess } from "../../../redux/slice/authSlice";
import { AxiosError } from "axios";

const OTP = () => {
  const navigate = useNavigate()
  const[otp,setOTP]=useState('')
  const dispatch = useDispatch<AppDispatch>()
  const handleClick =async()=>{
    try {
      const token = localStorage.getItem('otp-token') as string
    const {data}=await otpVerification(otp,token)
    if(data.success){
      localStorage.setItem('access-token',data.token)
      toast.success(data.message)
      localStorage.removeItem('otp-token')
      localStorage.setItem('user',JSON.stringify({name:data.name,email:data.email}))
      dispatch(loaginSuccess({userName:String(data.name),email:String(data.email)}))
      navigate('/')
    }else{
      toast.error(data.message)
    }
    } catch (error) {
      toast.error((((error as AxiosError).response?.data as Record<string,any>).message))
    }
  }
  
  return (
    <div className="flex flex-col lg:flex-row h-full w-full">
      {/* Left section with text */}
        <SideTextSection/>
      {/* Right section */}
      <div className="lg:w-[50%] w-full flex justify-center pt-16 lg:pt-[7rem] px-4 lg:ps-[4rem]">
        <div className="w-full max-w-md flex flex-col items-center text-[#7b7575] text-center">
          <h1 className="text-[1.8rem] md:text-[2.2rem] font-thin bg-text-gradient bg-clip-text text-transparent">
             verification code
          </h1>
          <h3 className="mt-4">Enter Verification code send to your email.</h3><br />
          <OTPInput onChange ={setOTP}/><br />
        {/* <p className="text-slate-400 mb-4">Remaining time : 90 sec</p> */}
          <button type="submit" className="w-[75%] sm:w-[50%] text-white p-2 rounded-md bg-zinc-800" onClick={handleClick}>
            Verify
          </button>
          
        </div>
      </div>
    </div>
  );
};

export default OTP;
