import React, { useState } from "react";
import GoogleAuth from "./GoogleAuth";
import { Link, useNavigate } from "react-router-dom";
import { signUpRequest } from "../../../service/Api/userApi";
import { toast } from "sonner";
import { AxiosError } from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { FieldValues, useForm } from "react-hook-form";
import { TzsignUp, ZsignUp } from "@/utils/validation/user";

const SignIn = () => {
  const {register,handleSubmit,formState:{errors},reset}=useForm<TzsignUp>({resolver:zodResolver(ZsignUp)})
  const navigate = useNavigate();
  
  const handleSignUpSubmit = async (datas : TzsignUp) => {
    try {
        const { data } = await signUpRequest(datas.email);
        console.log(data);

        if (data.success) {
          localStorage.setItem("registration-token", data.token);
          navigate("/auth/registration");
          toast.success(data.response);
        } else if (!data.success && data.token) {
          localStorage.setItem("otp-token", data.token);
          navigate("/auth/otp/verify");
          toast.success(data.response);
        }
     
    } catch (error) {
      console.log(error);

      toast.error(
        ((error as AxiosError).response?.data as Record<string, any>).response
      );
    }
  };
  return (
    <div className="lg:w-[50%] w-full flex justify-center pt-16 lg:pt-[7rem] px-4 lg:ps-[4rem]">
      <div className="w-full max-w-md flex flex-col items-center text-[#7b7575] text-center">
        <h1 className="text-[1.8rem] md:text-[2.2rem] font-thin bg-text-gradient bg-clip-text text-transparent">
          Welcome to LuxBid
        </h1>
        <h3 className="mt-4">Sign In with your Gmail.</h3>
        <GoogleAuth />
          {errors.email && (<p className="text-red-500">{`${errors.email.message}`}</p>)}
        <form onSubmit={handleSubmit(handleSignUpSubmit)}>
          <input
            type="email"
            placeholder="Email"
            {...register('email')}
            // onChange={(e) => setEmail(e.target.value)}
            className="mt-3 p-2 w-[85%] sm:w-[95%] mb-3 bg-zinc-900 border-white rounded-md placeholder-zinc-500  focus:outline-none focus:ring-1 focus:ring-neutral-700"
          />
          <button
            type="submit"
            className="w-[85%] sm:w-[95%] text-white p-2 rounded-md bg-zinc-800"
            >
            Continue
          </button>
            </form>
        <br />
        <h6>
          Already have an account?
          <span className="text-white ps-1 font-light">
            <Link to={"/auth/signin"}>SignIn</Link>
          </span>
        </h6>
      </div>
    </div>
  );
};

export default SignIn;
