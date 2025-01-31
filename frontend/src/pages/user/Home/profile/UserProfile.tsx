import { useTheme } from "@/components/theme/theme-provider";
import Logo from "../../../../../public/Logo.png";
import Mode from "../../../../components/global/Mode";
import Sidebars from "../../../../components/global/UserSidebar";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Rootstate } from "@/redux/store/store";

const UserProfile = () => {
  const {theme} =useTheme()
  const {isAuthenticated} = useSelector((state:Rootstate) => state.user);
  const navigate = useNavigate()
  if(!isAuthenticated) navigate('/auth/signin')
    const backgroundClass = theme === 'dark' 
    ? 'bg-black'
    : 'bg-white';
    
  return (
    <>
      <div className={`flex w-full flex-col bg-gradient-to-b h-screen ${backgroundClass}`}>
        <div className=" w-full h-[18.5%] flex justify-between ">
          <img
            src={Logo}
            className=" sm:max-w-[10%] md:max-w-[9%] lg:max-w-[10%]"
            onClick={()=>navigate('/')}         />
          <div className="w-[10%] items-center justify-center flex ">
            <Mode />
          </div>
        </div>
        <div className=" flex-1">
          <Sidebars />
        </div>
      </div>
    </>
  );
};

export default UserProfile;
