import Loader from "@/components/global/Loader";
import BuyerProfile from "@/pages/user/Home/profile/buyerProfile";
import SellerProfile from "@/pages/user/Home/profile/sellerProfile";
import { useAuth } from "@/hooks/useAuth";
import { fetchuser } from "@/service/Api/userApi";
import { useRQ } from "@/hooks/userRQ";
import { useTheme } from "@/components/theme/theme-provider";

const Profile = () => {
  useAuth();
  const {theme} =useTheme()
  const {isLoading,data}=useRQ(fetchuser,'User')
  return (
    <>
      <div className={`flex-1 flex flex-col  p-5 bg-[#1a191996]  m-4 ${theme=='dark'? 'bg-[#35333357]':'bg-gray-50'} rounded-3xl shadow-inner `}>
        <h1 className={`text-2xl font-bold mb-4 ${theme=='dark'? 'text-gray-200':'text-indigo-900'} `}>
          User Profile
        </h1>
        {isLoading ? <Loader/> :  data.role=='Buyer'? <BuyerProfile  /> : <SellerProfile/> }
      </div>
    </>
  );
};

export default Profile;
