import { useDispatch, useSelector } from "react-redux";
import Logo from "../../../../../public/Logo.png";
import Mode from "../../../../components/global/Mode";
import Sidebars from "../../../../components/global/UserSidebar";
import { Rootstate } from "@/redux/store/store";
import { FaRegUser } from "react-icons/fa";
import { CiLogout } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import { logout } from "@/redux/slice/authSlice";
import { AiFillProduct } from "react-icons/ai";
import { useMemo } from "react";
import { userLogout } from "@/service/Api/userApi";
const UserProfile = () => {
  // const role = useSelector((state:Rootstate)=>state.user.role)
  // const dispatch = useDispatch();
  // const navigate = useNavigate();  
  // const handleClick = async(route:string) => {
  //   if(route=='logout'){
      
  //     await userLogout()
  //     dispatch(logout())
  //     navigate("/");
  //   }else if(route=='product')navigate('/user/product')
  //   else if(route=='profile')navigate('/user/profile')
  // };
  // const getSidebarItems = () => {
  //   const commonItems = [
  //     { icon: <FaRegUser />, label: "Profile", clickFn: () => handleClick('profile') },
  //     { icon: <CiLogout size={20} />, label: "Logout", clickFn: () => handleClick('logout') }
  //   ];

  //   const sellerSpecificItems = [
  //     { icon: <AiFillProduct size={20} />, label: 'Products', clickFn: () => handleClick('product') }
  //   ];

  //   return role === 'Seller' 
  //     ? [...commonItems, ...sellerSpecificItems]
  //     : commonItems;
  // };

  // const sidebarItems = useMemo(() => getSidebarItems(), [role]);
  return (
    <>
      <div className="flex w-full flex-col bg-gradient-to-b h-screen from-black via-black to-[#201c346c]">
        <div className=" w-full h-[18.5%] flex justify-between ">
          <img
            src={Logo}
            className=" sm:max-w-[10%] md:max-w-[9%] lg:max-w-[10%]"
          />
          <div className="w-[10%] items-center justify-center flex ">
            <Mode />
          </div>
        </div>
        <div className="bg-z flex-1">
          <Sidebars />
        </div>
      </div>
    </>
  );
};

export default UserProfile;
