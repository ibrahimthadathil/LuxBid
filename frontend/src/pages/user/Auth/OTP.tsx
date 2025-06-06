import { useState } from "react";
import OTPInput from "../../../components/global/OTPBox";
import { otpVerification, resetOTP } from "../../../service/Api/userApi";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../redux/store/store";
import { loaginSuccess } from "../../../redux/slice/authSlice";
import { AxiosError } from "axios";
import { useTheme } from "@/components/theme/theme-provider";

const OTP = () => {
  const navigate = useNavigate();
  const [otp, setOTP] = useState("");
  const dispatch = useDispatch<AppDispatch>();
  const {theme}= useTheme()
  
  const handleClick = async () => {
    try {
      const token = localStorage.getItem("otp-token") as string;
      const passwordToken = localStorage.getItem('rpotp') as string;
      const { data } = token ? await otpVerification(otp, token) : await resetOTP(otp,passwordToken)
      if (data.success) {
        localStorage.setItem("access-token", data.token) 
        toast.success(data.message)
        localStorage.removeItem("otp-token");
        dispatch(
          loaginSuccess({
            userName: String(data.name),
            email: String(data.email),
            role:'Guest'
          })
        );
        navigate("/");
      } else {
        localStorage.setItem('rptkn',data.token)
        toast.success(data.message)
        localStorage.removeItem('rpotp')
        navigate('/auth/resetpassword')
        
      }
    } catch (error) {
      toast.error(
        ((error as AxiosError).response?.data as Record<string, any>).message
      );
    }
  };

  return (
    <div className="lg:w-[50%] w-full flex justify-center pt-16 lg:pt-[7rem] px-4 lg:ps-[4rem]">
      <div className="w-full max-w-md flex flex-col items-center text-[#7b7575] text-center">
        <h1 className="text-[1.8rem] md:text-[2.2rem] font-thin bg-text-gradient bg-clip-text text-transparent">
          verification code
        </h1>
        <h3 className="mt-4">Enter Verification code send to your email.</h3>
        <br />
        <OTPInput onChange={setOTP} />
        <br />
        {/* <p className="text-slate-400 mb-4">Remaining time : 90 sec</p> */}
        <button
          type="submit"
          className={`w-[75%] sm:w-[50%] ${theme=='dark'?" bg-zinc-800":'bg-indigo-700 ' } text-white p-2 rounded-md `}
          onClick={handleClick}
        >
          Verify
        </button>
      </div>
    </div>
  );
};

export default OTP;
