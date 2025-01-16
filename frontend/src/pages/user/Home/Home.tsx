import { Outlet } from "react-router-dom";
import Navbar from "../../../components/global/NavBar";
import Footer from "@/components/Layout/Footer";
import BottomBar from "@/components/Layout/BottomBar";
import { useTheme } from "@/components/theme/theme-provider";

const Home = () => {
const {theme} =useTheme()
  const backgroundClass = theme === 'dark' 
  ? 'from-black via-black to-[#201c34ea]'
  : 'from-white via-white to-[#c9c1f5]';
  
  return (
    <>
      
      <div className={`bg-gradient-to-b flex flex-col  ${backgroundClass} w-full h-full min-h-screen`}>
        <Navbar />
        <div className="w-full flex-1 flex  flex-col items-center h-auto">
          
          <Outlet/>
        </div>
        </div>
        <Footer/>
        <BottomBar/>
    </>
  );
};

export default Home;
