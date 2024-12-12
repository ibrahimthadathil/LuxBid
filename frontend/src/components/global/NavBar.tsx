import { useLocation } from "react-router-dom";
import Logo from "../../../public/Logo.png";
import IconBar from "./IconBar";
import Language from "./Language";
import Mode from "./Mode";

const Navbar = () => {
  const location = useLocation();
  const showIconBar =
    location.pathname !== "/auth/signup" &&
    location.pathname !== "/auth/signin" &&
    location.pathname !== "/auth/otp/verify" &&
    location.pathname !== "/auth/registration" &&
    location.pathname !== "/auth/forgetpassword" &&
    location.pathname !== "/auth/resetpassword" 

  return (
    <nav className="flex">
      {/* Left Section: Logo */}
      <div className="ps-8 w-[10%]  ">
        <img src={Logo} alt="Logo" className="w-28" />
      </div>

      {/* icons bar*/}
      <div className="w-[70%] p-6 relative">{showIconBar && <IconBar />}</div>

      {/* End section  */}
      <div className="w-[20%] p-8 flex justify-between">
        <Language />
        <div className="pt-3">
          <Mode />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
