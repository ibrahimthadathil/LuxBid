import { useState } from "react";
import FormInput from "../../../components/global/formInput";
import { forgetRequest } from "../../../service/Api/userApi";
import { toast } from "sonner";
import { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import { SubmitErrorHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
const Zemail = z.object({ email: z.string().email() });
type Tzemail = z.infer<typeof Zemail>;
const Forgetpassword = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Tzemail>({ resolver: zodResolver(Zemail) });
  const handleVerify = async (datas: Tzemail) => {
    console.log(datas);

    // try {
    //   const { data } = await forgetRequest(email);
    //   if (data) {
    //     localStorage.setItem("rpotp", data.token);
    //     toast.success(data.message);
    //     navigate("/auth/otp/verify");
    //   } else {
    //     throw new Error("Error in email verification");
    //   }
    // } catch (error) {
    //   toast.error(
    //     ((error as AxiosError).response?.data as Record<string, any>).message
    //   );
    // }
  };
  const errorFn: SubmitErrorHandler<Tzemail> = (err) => {
    Object.values(err).forEach((e) => {
      toast.error(e.message);
    });
  };
  return (
    <div className="lg:w-[50%] w-full flex justify-center pt-6 lg:pt-[7rem] px-4 lg:ps-[4rem]">
      <div className="w-full max-w-md flex flex-col items-center text-[#7b7575] text-center">
        <h1 className="text-[1.8rem] md:text-[2.2rem] font-thin bg-text-gradient bg-clip-text text-transparent">
          Forget Password
        </h1>
        <h3 className="mt-4">Enter your email to Restore .</h3>
        <br />
        <form className="w-[80%]" onSubmit={handleSubmit(handleVerify,errorFn)}>
          <FormInput
            type="email"
            // value={email}
            holder="Email"
            validation="email"
            FormState={register}
            error={errors.email}
          />
          <br />
          <button
            type="submit"
            className="mt-3 w-[35%] sm:w-[35%] text-white p-2 rounded-md bg-zinc-800"
          >
            Verify
          </button>
        </form>
      </div>
    </div>
  );
};

export default Forgetpassword;
