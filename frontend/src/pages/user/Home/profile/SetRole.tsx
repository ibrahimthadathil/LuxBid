import Loader from "@/components/global/Loader";
import ProfileCards from "@/components/global/ProfileCards";
import BuyerProfile from "@/pages/user/Home/profile/buyerProfile";
import SellerProfile from "@/pages/user/Home/profile/sellerProfile";
import { useAuth } from "@/hooks/useAuth";
import { setRole } from "@/redux/slice/authSlice";
import { AppDispatch, Rootstate } from "@/redux/store/store";
import { setupBuyer, setupSeller } from "@/service/Api/userApi";
import { AxiosError } from "axios";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";

const Profile = () => {
  useAuth();
  const role = useSelector((state: Rootstate) => state.user.role);
  const [loading, setloading] = useState(false)
  const dispatch = useDispatch<AppDispatch>()
  const setBuyer=async()=>{
    try {
      setloading(true)
      const {data}= await setupBuyer()
      if(data.success){        
        
        dispatch(setRole('Buyer'))
        setloading(state=>!state)
      }else{
        throw new Error(data.message)
      }
    } catch (error) {
      console.log('eroor from cards',error);
      toast.error(((error as AxiosError).response?.data as Record<string,string>).message)
    }
  }

  const setSeller =async()=>{
    try {
      setloading(true)
     const {data} = await setupSeller()
     console.log('@@@',data);
     if(data.success){        
      
      dispatch(setRole('Seller'))
      setloading(state=>!state)
    }else{
      throw new Error(data.message)
    }
    } catch (error) {
      console.log('eroor from cards',error);
      toast.error(((error as AxiosError).response?.data as Record<string,string>).message)
    }
  }
  // const{isLoading,data}=useRQ(fetchuser,selected)
  //  if(isLoading)return <div className="bg-[#1a191996]  m-4  rounded-3xl shadow-inner"><Loader/> </div>
    
  return (
    <>
      <div className="flex-1 flex flex-col  p-5 bg-[#1a191996]  m-4  rounded-3xl shadow-inner ">
        <h1 className="text-2xl font-semibold mb-4 text-gray-200">
          User Profile
        </h1>
        {/* <div className="bg-gray-300 p-4 rounded-lg shadow">
          <h2 className="text-lg font-bold my-2 text-gray-800">John Doe</h2>
          <p className="text-sm text-gray-600">Web Developer</p>
          <p className="text-sm my-2 text-gray-700">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </p>
          <div className="flex justify-between items-center mt-4">
            <button className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center hover:bg-blue-600">
              <span className="inline-block h-6 w-6 mr-2">👋</span>
              Follow
            </button>
            <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg flex items-center hover:bg-gray-200">
              <span className="inline-block h-6 w-6 mr-2">💬</span>
              Message
            </button>
          </div>
        </div> */}
        {loading ? <Loader/> : role=='Guest' ? <ProfileCards buyer={setBuyer} seller={setSeller}/> : role=='Buyer'? <BuyerProfile  /> : role=='Seller'?<SellerProfile/>:<Loader/> }
      </div>
    </>
  );
};

export default Profile;
