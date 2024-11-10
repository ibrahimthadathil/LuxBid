import { useEffect } from "react";
import Navbar from "../../../components/global/NavBar";
import axios from "axios";

const Home = () => {

  return (
    <>
      <div className="bg-gradient-to-b flex flex-col  from-black via-black to-[#201c34ea] w-full h-screen">
        <Navbar />
        <div className=" w-full flex flex-1">
          <h1 className=""></h1>
        </div>

      </div>
    </>
  );
};

export default Home;
