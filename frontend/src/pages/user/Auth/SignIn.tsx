import GoogleAuth from "./GoogleAuth";
import { Link, useNavigate } from "react-router-dom";
import { signInRequest } from "../../../service/Api/userApi";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../redux/store/store";
import { loaginSuccess } from "../../../redux/slice/authSlice";
import { AxiosError } from "axios";
import { useForm } from "react-hook-form";
import { TzsignIn, zsignIn } from "@/utils/validation/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTheme } from "@/components/theme/theme-provider";

const SignIn = () => {
  
  const {handleSubmit,register,formState:{errors}} = useForm<TzsignIn>({resolver:zodResolver(zsignIn)})
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const {theme} = useTheme() 
  const handleSignInSubmit = async (datas : TzsignIn) => {
    try {
      const { data } = await signInRequest(datas)
      if (data.success) {
        localStorage.setItem("access-token", data.token);
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
        <form onSubmit={handleSubmit(handleSignInSubmit)}>
          {errors.email && (<p className="text-red-500">{`${errors.email.message}`}</p>) || errors.password && (<p className="text-red-500">{`${errors.password.message}`}</p>)}
          <input
            type="email"
            placeholder="Email"
            {...register('email')}
            className={`mt-3 p-2 w-[85%] sm:w-[65%] mb-3  ${theme=='dark'?"text-white bg-zinc-800":'text-black bg-gray-100'} border-white rounded-md placeholder-zinc-500  focus:outline-none focus:ring-1 focus:ring-neutral-700`}
            />
          <input
            type="password"
            placeholder="Password"
            {...register('password')}
            className={` p-2 w-[85%] sm:w-[65%] mb-1  placeholder-zinc-500 ${theme=='dark'?"text-white bg-zinc-800":'text-black bg-gray-100'} border-white rounded-md focus:outline-none focus:ring-1 focus:ring-neutral-700`}
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
            className={`w-[85%]  sm:w-[65%] mt-2 text-white p-2 rounded-md ${theme==='dark'?'bg-zinc-700':'bg-indigo-700'}`}
          >
            Continue
          </button>
        </form>
        <br />
        <h6>
          Don't have an account?
          <span className={` ${theme=='dark'?'text-white underline':'text-indigo-500 underline'} ps-1 font-light`}>
            <Link to={"/auth/signup"}>SignUp</Link>
          </span>
        </h6>
      </div>
    </div>
  );
};

export default SignIn;
