import { useState } from "react";
import FormInput from "../../../components/global/formInput";
import { forgetRequest } from "../../../service/Api/userApi";
import { toast } from "sonner";
import { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";

const Forgetpassword = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const handleVerify = async () => {
    try {
      const { data } = await forgetRequest(email);
      if (data) {
        localStorage.setItem("rpotp", data.token);
        toast.success(data.message);
        navigate("/auth/otp/verify");
      } else {
        throw new Error("Error in email verification");
      }
    } catch (error) {
      toast.error(
        ((error as AxiosError).response?.data as Record<string, any>).message
      );
    }
  };

  return (
    <div className="lg:w-[50%] w-full flex justify-center pt-6 lg:pt-[7rem] px-4 lg:ps-[4rem]">
      <div className="w-full max-w-md flex flex-col items-center text-[#7b7575] text-center">
        <h1 className="text-[1.8rem] md:text-[2.2rem] font-thin bg-text-gradient bg-clip-text text-transparent">
          Forget Password
        </h1>
        <h3 className="mt-4">Enter your email to Restore .</h3>
        <br />

        <FormInput
          type="Email"
          value={email}
          holder="Email"
          setter={setEmail}
        />
        <button
          type="submit"
          className="mt-3 w-[35%] sm:w-[35%] text-white p-2 rounded-md bg-zinc-800"
          onClick={handleVerify}
        >
          Verify
        </button>
      </div>
    </div>
  );
};

export default Forgetpassword;
