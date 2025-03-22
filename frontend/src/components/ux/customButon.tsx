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
      className={`h-[50px] w-[120px] mx-1 my-1 ${theme==='dark'?'bg-black':'border-[#321e94]'}  text-[16px]  rounded-[10px] flex justify-center items-center cursor-pointer  `}
      onClick={handleclick}
    >
      {userName ? (
        <div className="flex gap-2 ">
          <FaUser color={`${theme==='dark'?'#5b4bae':'#321e94'}`} className="mt-1" /> {userName.substring(0,8)}{" "}
        </div>
      ) : (
        <p className={`${theme=='dark'?'text-white':'text-indigo-800'}  font-semibold`}>SignUp/In</p>
      )}
    </button>
  );
};

export default CustomButton;
