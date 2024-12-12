import { Outlet } from "react-router-dom";
import Navbar from "../../../components/global/NavBar";
import Footer from "@/components/Layout/Footer";
import BottomBar from "@/components/Layout/BottomBar";

const Home = () => {

  return (
    <>
      
      <div className="bg-gradient-to-b flex flex-col  from-black via-black to-[#201c34ea] w-full h-full min-h-screen">
        <Navbar />
        <div className="w-full flex-1 flex justify-center flex-col items-center h-auto">
          
          <Outlet/>
        </div>
        </div>
        <Footer/>
        <BottomBar/>
    </>
  );
};

export default Home;
