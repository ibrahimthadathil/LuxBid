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
      <div className={`flex flex-col min-h-screen h-screen ${backgroundClass}`}>
        <div className="w-full py-4 px-4 flex justify-between items-center">
          <img
            src={Logo}
            className="h-12 w-auto object-contain cursor-pointer"
            onClick={() => navigate('/')}
          />
          <div className="flex items-center">
            <Mode />
          </div>
        </div>
        <div className="flex-1 w-full">
          <Sidebars />
        </div>
      </div>
    </>
  );
};

export default UserProfile;
