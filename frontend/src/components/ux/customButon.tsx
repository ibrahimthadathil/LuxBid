import { Rootstate } from "@/redux/store/store";
import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import { useTheme } from "../theme/theme-provider";
const CustomButton: React.FC = () => {
  const { userName } = useSelector((state: Rootstate) => state.user);
  const {theme}=useTheme()
  const navigate = useNavigate();
  const handleclick = () => {
    userName ? navigate("/user/profile") : navigate("/auth/signup");
  };
  return (
    <button
      className={`h-[50px] w-[120px] mx-1 my-1 ${theme==='dark'?'bg-black':'bg-[#51458ced]'} text-[rgb(203,201,201)] text-[16px] font-thin rounded-[10px] flex justify-center items-center cursor-pointer transition duration-[500ms] hover:shadow-[1px_1px_13px_#5B4BAE,-1px_-1px_6px_#5B4BAE] hover:text-[#d6d6d6] active:shadow-[1px_1px_14px_#20232e,-1px_-1px_33px_#545b78] active:text-[#d6d6d6] active:transition-[100ms] `}
      onClick={handleclick}
    >
      {userName ? (
        <div className="flex gap-2 ">
          <FaUser color={`${theme==='dark'?'#5b4bae':'#fff'}`} className="mt-1" /> {userName.substring(0,8)}{" "}
        </div>
      ) : (
        "SignUp / In"
      )}
    </button>
  );
};

export default CustomButton;
