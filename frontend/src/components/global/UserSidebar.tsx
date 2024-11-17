import React, { useState, useMemo } from "react";
import { MdSpaceDashboard ,} from "react-icons/md";
import { VscThreeBars } from "react-icons/vsc";
import { FaRegUser } from "react-icons/fa";import Logo from "../../../public/Logo.png";
import { CiLogout } from "react-icons/ci";
import {  Outlet, useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { logout } from "@/redux/slice/authSlice";
import { userLogout } from "@/service/Api/userApi";

const Sidebars = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const toggleSidebar = () => setIsCollapsed((prev) => !prev);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleClick = async() => {
    localStorage.removeItem("access-token");
    dispatch(logout())
    // await userLogout()
    navigate("/");
  };
const sidebarItems = [
  { icon: <FaRegUser/>, label: "Profile" , onClick :()=> console.log('hi')
  },
  { icon: <CiLogout size={23}/>, label: "Logout" , onClick :()=> handleClick()}, 
];

  const sidebarContent = useMemo(
    () => (
      <ul className="space-y-4 w-full ">
        {sidebarItems.map(({ icon, label ,onClick}) => (
          <li
          onClick={()=>onClick()}
            key={label}
            className="flex items-center py-2 cursor-pointer hover:shadow-lg rounded-xl hover:text-[#5B4BAE] px-2"
          >
            <span className=" ms-3 w-6 mr-2">{icon}</span>
            {!isCollapsed && <span className="">{label}</span>}
          </li>
        ))}
      </ul>
    ),
    [isCollapsed]
  );

  return (
    <div className="flex h-full">
      {/* Sidebar */}
      <div
        className={` rounded-3xl flex flex-col relative transition-all bg-[#1a191996]  duration-300 m-4 ${
          isCollapsed ? "w-16" : "w-64"
        }`}
      >
        <button
          onClick={toggleSidebar}
          className="absolute top-2 right-2  w-8 h-8 rounded-full hover:bg-slate-500 flex items-center justify-center"
        >
          {isCollapsed ? <MdSpaceDashboard  size={18} /> : <VscThreeBars size={20} />}
        </button>
        {/* Toggle Button - Added flex classes for centering */}

        {/* Content Container */}
        <div className="p-4 pt-12 flex flex-col items-center w-full">
          {/* Avatar */}
          <img
            src={Logo}
            className="w-12 h-12 rounded-full mb-4 border"
          />

          {/* Sidebar Header */}
          {!isCollapsed && (
            <h2 className=" text-lg font-bold mb-4">John doe</h2>
          )}

          {/* Sidebar Items */}
          {sidebarContent}
        </div>
      </div>

      {/* Main Content */}
      <Outlet/>
    </div>
  );
};

export default React.memo(Sidebars)
