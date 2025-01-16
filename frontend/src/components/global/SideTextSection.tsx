import { Outlet } from "react-router-dom";
import { useTheme } from "../theme/theme-provider";

const SideTextSection = () => {
  const {theme} = useTheme()
  return (
    <div className="flex  bg-gradient-to-b flex-col lg:flex-row h-full w-full">
      <div className="lg:w-[50%] w-full flex flex-col pt-24 lg:pt-44 text-[2rem] md:text-[2.5rem] lg:text-[3.3rem] px-6 lg:ps-14 bg-text-gradient bg-clip-text text-transparent font-light">
        <h1 className="font-semibold tracking-normal   uppercase">Curate Your Collection</h1>
        <h1 className=""> Through Smart Bids...!</h1>
        <p className={`text-xs md:text-sm font-normal ${theme=='dark'?"text-gray-700":'text-indigo-900'} mt-4`}>
          Discover a dynamic auction platform where buyers and sellers connect
          in real-time. Bid on unique items, place competitive offers, and
          experience the thrill of winning. Our user-friendly interface
          simplifies browsing, bidding, and tracking your auctions, ensuring a
          seamless experience. Join us to unleash the excitement of online
          auctions!
        </p>
      </div>
      <Outlet/>
    </div>
  );
};

export default SideTextSection;
