import { useDispatch } from "react-redux";
import { logout } from "../../../redux/slice/authSlice";
import { useNavigate } from "react-router-dom";
import Logo from "../../../../public/Logo.png";
import Mode from "../../../components/global/Mode";
import Sidebars from "../../../components/global/UserSidebar";
const UserProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleClick = () => {
    localStorage.removeItem("access-token");
    dispatch(logout());
    navigate("/");
  };

  return (
    <>
      <div
        className="flex w-full flex-col bg-gradient-to-b   h-screen from-black via-black to-[#201c346c]"
      >
        <div className=" w-full h-[18.5%] flex justify-between ">
          <img src={Logo} className=" sm:max-w-[10%] md:max-w-[9%] lg:max-w-[10%]"/>
          <div className="w-[10%] items-center justify-center flex ">
            <Mode />
          </div>
        </div>
        <div className="bg-z flex-1">
          <Sidebars/>
        </div>
        {/* <button className="p-4 text-red-300 rounded-xl" onClick={handleClick}>
          Logout
        </button> */}
        
      </div>
    </>
  );
};

export default UserProfile;
