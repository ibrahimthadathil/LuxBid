import React, { useState } from "react";
import GoogleAuth from "./GoogleAuth";
import { Link, useNavigate } from "react-router-dom";
import { signInRequest } from "../../../service/Api/userApi";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../redux/store/store";
import { loaginSuccess } from "../../../redux/slice/authSlice";
import { AxiosError } from "axios";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const { data } = await signInRequest({ email, password });
      if (data.success) {
        localStorage.setItem("access-token", data.token);
        localStorage.setItem(
          "user",
          JSON.stringify({ name: data.name, email: data.email })
        );
        toast.success(data.message);
        dispatch(loaginSuccess({ userName: data.name, email: data.email }));
        navigate("/");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);

      toast.error(
        ((error as AxiosError).response?.data as Record<string, any>).message
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
        <form onSubmit={handleSubmit}>
          <input
            value={email}
            type="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            className="mt-3 p-2 w-[85%] sm:w-[65%] mb-3 bg-zinc-900 border-white rounded-md placeholder-zinc-500  focus:outline-none focus:ring-1 focus:ring-neutral-700"
          />
          <input
            value={password}
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            className=" p-2 w-[85%] sm:w-[65%] mb-1 placeholder-zinc-500 bg-zinc-900 border-white rounded-md focus:outline-none focus:ring-1 focus:ring-neutral-700"
          />
          <p className="">
            <Link
              to="/auth/forgetpassword"
              className=" text-sm text-zinc-600 "
            >
              Forgot Password?
            </Link>
          </p>
          <button
            type="submit"
            className="w-[85%]  sm:w-[65%] mt-2 text-white p-2 rounded-md bg-zinc-800"
          >
            Continue
          </button>
        </form>
        <br />
        <h6>
          Don't have an account?
          <span className="text-white ps-1 font-light">
            <Link to={"/auth/signup"}>SignUp</Link>
          </span>
        </h6>
      </div>
    </div>
  );
};

export default SignIn;
