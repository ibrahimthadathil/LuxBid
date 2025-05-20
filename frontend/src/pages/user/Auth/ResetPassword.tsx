import FormInput from "../../../components/global/formInput";
import { toast } from "sonner";
import { resetPassword } from "../../../service/Api/userApi";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { errorFn, TZresetPass, ZresetPass } from "@/utils/validation/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosError } from "axios";
import { useTheme } from "@/components/theme/theme-provider";

const ResetPassword = () => {

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TZresetPass>({ resolver: zodResolver(ZresetPass) });
  const navigate = useNavigate();
  const {theme} = useTheme()  
  const handleSubmits = async (datas: TZresetPass) => {
    try {
      const token = localStorage.getItem("rptkn");
      if (token) {
        const { data } = await resetPassword(datas.password, datas.confirmPassword, token);
        
        if (data.success) {

          localStorage.removeItem("rptkn");
          toast.success(data.message);
          navigate("/auth/signin");
        }
      } else {
        toast.error("Invalid access");
      }
    } catch (error) {
      toast.error(((error as AxiosError).response?.data as Record<string,any>).message+', try later')
    }
  };

  return (
    <>
      <div className="lg:w-[50%] w-full flex justify-center pt-6 lg:pt-[7rem] px-4 lg:ps-[4rem]">
        <div className="w-full max-w-md flex flex-col items-center text-[#7b7575] text-center">
          <h1 className="text-[1.8rem] md:text-[2.2rem] font-thin bg-text-gradient bg-clip-text text-transparent">
            Enter Password
          </h1>
          <h2 className="mt-4 text-gray-400">
            Enter new password to Restore .
          </h2>
          <br />
          <form onSubmit={handleSubmit(handleSubmits, errorFn)}>
            <label className="pe-[11rem] pb-1 text-gray-400" htmlFor="">
              New Password
            </label>
            <FormInput
              type="password"
              holder=""
              validation="password"
              FormState={register}
              error={errors.password}
            />
            <br />
            <label className="pe-40 pb-1 text-gray-400" htmlFor="">
              confirm password
            </label>

            <FormInput
              type="password"
              holder=""
              validation="confirmPassword"
              FormState={register}
              error={errors.confirmPassword}
            />
            <br />
            <button
              type="submit"
              className={`mt-3 w-[35%] sm:w-[35%] text-white p-2 rounded-md  ${theme==='dark'?'bg-zinc-800':'bg-indigo-700  '}`}
            >
              Verify
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default ResetPassword;
