import { registration } from "../../../service/Api/userApi";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TZregister, Zregister } from "@/utils/validation/user";
import { AxiosError } from "axios";

const Registration = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm<TZregister>({ resolver: zodResolver(Zregister) });
  const navigate = useNavigate();
  const handleRegisterSubmit = async (datas: TZregister) => {
    console.log(datas);
    try {
      const token = localStorage.getItem("registration-token") as string;
      const { data } = await registration(datas, token);
      console.log(data);

      if (data.token) {
        reset();
        localStorage.removeItem("registration-token");
        localStorage.setItem("otp-token", data.token);
        navigate("/auth/otp/verify");
        toast.success(data.message);
      }
    } catch (error) {
      toast.error(
        ((error as AxiosError).response?.data as Record<string, any>).message +
          ", try it Later"
      );
    }
  };
  return (
    <div className="container mx-auto px-4 py-8 ">
      <div className="max-w-xl mx-auto rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-bold text-white mb-6">Registration </h2>
        <form onSubmit={handleSubmit(handleRegisterSubmit)}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <input
              type="text"
              placeholder="First Name"
              {...register("firstName")}
              className="p-3 rounded-lg bg-zinc-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 w-full"
            />
            <input
              type="text"
              placeholder="Last Name (Optional)"
              {...register("lastName")}
              className="p-3 rounded-lg bg-zinc-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 w-full"
            />
            {errors.firstName && (
              <p className="text-red-500">{`${errors.firstName.message}`}</p>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <input
              type="password"
              placeholder="Password"
              {...register("password")}
              className="p-3 rounded-lg bg-zinc-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 w-full"
            />
            <input
              type="text"
              placeholder="Phone"
              {...register("Phone")}
              className="p-3 rounded-lg bg-zinc-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 w-full"
            />
            {(errors.password && (
              <p className="text-red-500">{`${errors.password.message}`}</p>
            )) ||
              (errors.Phone && (
                <p className="text-red-500">{`${errors.Phone.message}`}</p>
              ))}
          </div>

          <div className="mb-4">
            <select
              {...register("gender")}
              className="p-3 rounded-lg bg-zinc-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 w-full"
            >
              <option value="" disabled>
                Gender
              </option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
            {errors.gender && (
              <p className="text-red-500">{`${errors.gender.message}`}</p>
            )}
          </div>

          <div className="flex items-center mb-4 gap-2">
            <input
              type="checkbox"
              className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500 focus:ring-2"
              {...register("policy")}
            />
            <label className="ml-2 text-sm text-gray-400">
              I accept the{" "}
              <a href="/policy" className="text-indigo-600 hover:underline">
                policy
              </a>
            </label>
            {errors.policy && (
              <p className="text-red-500">{`${errors.policy.message}`}</p>
            )}
          </div>

          <button
            type="submit"
            className={`w-full p-3 text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 `}
          >
            Proceed
          </button>
        </form>
      </div>
    </div>
  );
};

export default Registration;
