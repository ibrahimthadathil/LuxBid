import React, { useState, useMemo } from "react";
import { MdSpaceDashboard } from "react-icons/md";
import { VscThreeBars } from "react-icons/vsc";
import { FaRegUser } from "react-icons/fa";
import { CiLogout } from "react-icons/ci";
import { Outlet, useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { logout } from "@/redux/slice/authSlice";
import { AiFillProduct } from "react-icons/ai";
import { fetchuser, userLogout } from "@/service/Api/userApi";
import { useRQ } from "@/hooks/userRQ";
import { BaggageClaim, CirclePlus, GavelIcon, Loader2, Wallet } from "lucide-react";
import { useTheme } from "../theme/theme-provider";

const Sidebars = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const toggleSidebar = () => setIsCollapsed((prev) => !prev);
  const dispatch = useDispatch();
  const navigate = useNavigate(); 
  const {theme} =useTheme()
 
  const {isLoading, isSuccess, data} = useRQ(fetchuser, 'User')
  const handleClick = async(route:string) => {
    if(route=='logout'){
      await userLogout()
      dispatch(logout())
      navigate("/");
    }else if(route=='product')navigate('/user/product')
    else if(route=='profile')navigate('/user/profile')
    else if(route=='auction')navigate('/user/auction')
    else if(route=='myBids')navigate('/user/myBids')
  else if(route=='orders')navigate('/user/orders')
  else if(route=='payments')navigate('/user/transactions')
  };

  const getSidebarItems = () => {
    const commonItems = [
      { icon: <FaRegUser/>, label: "Profile", clickFn: () => handleClick('profile') },
      { icon: <GavelIcon/>, label: "My Bids", clickFn: () => handleClick('myBids') },
      
      
    ];
    const lastItem = [
      { icon:<BaggageClaim/> , label:'Winnings & Orders',clickFn:()=>handleClick('orders')},
      {icon:<Wallet/>,label:'Transactions' , clickFn: ()=> handleClick('payments')},
      { icon: <CiLogout className="ms-[-5px]" size={20} />, label: "Logout", clickFn: () => handleClick('logout') }]

    const sellerItems = [
      { icon: <AiFillProduct size={20} className="ms-[-4px]"/>, label: 'Products', clickFn: () => handleClick('product') },
      {icon:<CirclePlus size={20} className="ms-[-4px]"/>,label:'Create Auction',clickFn:()=>handleClick('auction')}
    ];

    return isSuccess && data.role === 'Seller' 
      ? [...commonItems, ...sellerItems,...lastItem]
      :data.role=='Guest'?[lastItem[lastItem.length-1]]: [...commonItems,...lastItem] ;
  };

  const sidebarItems = useMemo(() => isSuccess ? getSidebarItems() : [], [isSuccess, data]);
  const sidebarContent = useMemo(
    () => (
      <ul className="space-y-4 w-full">
        {sidebarItems.map(({ icon, label, clickFn }) => (
          <li
            onClick={() => clickFn()}
            key={label}
            className="flex items-center py-2 cursor-pointer hover:shadow-inner hover:bg-gray-100 rounded-xl hover:text-[#5B4BAE] px-2"
          >
            <span className="ms- w-6 mr-2">{icon}</span>
            {!isCollapsed && <span>{label}</span>}
          </li>
        ))}
      </ul>
    ),
    [isCollapsed, sidebarItems]
  );

  return (
    <div className="flex h-full">
      {/* Sidebar */}
      <div
        className={`rounded-3xl flex flex-col relative transition-all ${theme=='dark'? 'bg-[#35333357]':'bg-gray-50'} shadow-inner  duration-500 m-4  ${
          isCollapsed ? "w-16" : "w-64"
        }`}
      >
        <button
          onClick={toggleSidebar}
          className="absolute top-2 right-2 w-8 h-8  flex items-center hover:text-[#5B4BAE]"
        >
          {isCollapsed ? <MdSpaceDashboard  size={18} /> : <VscThreeBars size={20} />}
        </button>

        {/* Content Container */}
        <div className="p-4 pt-12 flex flex-col items-center w-full ">
          {/* Avatar */}
          {!isCollapsed&&<img 
            src={data?.profile||
              `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100"><rect width="100%" height="100%" fill="navy"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="white" font-size="50" font-family="Arial">${data?.firstName[0].toUpperCase()}</text></svg>`

            }
            className="w-12 h-12 rounded-full mb-4 border object-cover"
            alt="Logo"
          />}

          {/* Sidebar Header */}
          {!isCollapsed && (
            <h2 className="text-lg font-bold mb-4">{data?.firstName||''}</h2>
          )}

          {/* Sidebar Items */}
          {isLoading?<><p className="flex gap-2"><Loader2/>Loading...</p></>:sidebarContent}
        </div>
      </div>

      {/* Main Content */}
      <Outlet/>
    </div>
  );
};

export default React.memo(Sidebars);