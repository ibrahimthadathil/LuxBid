import { useDispatch } from "react-redux";
import { logout } from "../../../redux/slice/authSlice";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleClick = () => {
    localStorage.removeItem("access-token");
    dispatch(logout());
    navigate("/");
  };

  return (
    <>
      <div id="abba" className="flex items-center w-full bg-gradient-to-b justify-center h-screen from-black via-black to-[#201c346c]">
        <button className="p-4 text-red-300 rounded-xl" onClick={handleClick}>
          Logout
        </button>
      </div>
    </>
  );
};

export default Profile;
