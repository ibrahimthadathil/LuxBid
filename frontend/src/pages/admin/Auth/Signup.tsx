import Logo from "../../../../public/Logo.png";
import { adminSignin } from "../../../service/Api/adminApi";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../redux/store/store";
import { signInSuccess } from "../../../redux/slice/adminSlice";
import { useForm } from "react-hook-form";
import { adminSignIn, TsignupSchem } from "@/utils/validation/admin";
import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosError } from "axios";
const SignInAdmin = () => {  
  const navigate = useNavigate();
  const { register , handleSubmit, formState :{errors ,isSubmitting}  ,reset } = useForm<TsignupSchem>({resolver:zodResolver(adminSignIn)});
  const disaptch = useDispatch<AppDispatch>();

  const handleSignIn = async (datas: TsignupSchem) => {
    try {     
        const { data } = await adminSignin({ email:datas.email, password:datas.password });
        if (data.success) {
            localStorage.setItem("accessToken", data.token);
              disaptch(
                  signInSuccess({
                      adminName: String(data.name),
                      email: String(data.email),
                    })
                  );
                  reset()
        navigate("/admin/LB/dashboard");
        toast.success(data.message);
      } else {
        toast.error("invalid credential");
      }
    } catch (error) {
      toast.error(((error as AxiosError).response?.data as Record<string , any>).message);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-black p-4">
      <div className="w-full max-w-md  rounded-lg shadow-md p-6">
        <div className="flex justify-center mb-6">
          <img
            src={Logo} 
            alt="Sign In"
            className="w-24 h-24 rounded-full "
          />
        </div>

        <form  className="space-y-4" onSubmit={handleSubmit(handleSignIn)}>
          <div>
            <input
              type="email"
              {...register("email")}
              placeholder="Email"
              className="w-full p-3 rounded-lg bg-zinc-900 text-gray-300 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            {errors.email && (<p className="text-red-500">{`${errors.email.message}`}</p>)}
          </div>

          <div>
            <input
              type="password"
              {...register("password")}

              placeholder="Password"
              className="w-full p-3 rounded-lg bg-zinc-900 text-gray-300 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          {errors.password && (<p className="text-red-500">{`${errors.password.message}`}</p>)}

          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-indigo-600 text-white p-3 rounded-lg font-semibold hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignInAdmin;
