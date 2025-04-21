import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../../../components/global/NavBar";
import Footer from "@/components/Layout/Footer";
import BottomBar from "@/components/Layout/BottomBar";
import { useTheme } from "@/components/theme/theme-provider";
import LandingPage from "@/components/Layout/landingPage";

const Home = () => {
const {theme} =useTheme()
const location = useLocation()
  const backgroundClass = theme === 'dark' 
  ? 'from-black via-black to-[#201c34ea]'
  : 'from-white via-white to-[#d4cef6]';
  return (
    <>
      
      <div className={`bg-gradient-to-b flex flex-col  ${backgroundClass} w-full h-full min-h-screen`}>
        <Navbar />
        <div className="w-full flex-1 flex flex-col items-center h-auto">
          {location.pathname==='/' ? <LandingPage/>:<Outlet/>}
        </div>
        </div>
        <Footer/>
        <BottomBar/>
    </>
  );
};

export default Home;
