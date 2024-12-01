import Loader from "@/components/global/Loader";
import ProfileCards from "@/components/global/ProfileCards";
import BuyerProfile from "@/pages/user/Home/profile/buyerProfile";
import SellerProfile from "@/pages/user/Home/profile/sellerProfile";
import { useAuth } from "@/hooks/useAuth";
import { setRole } from "@/redux/slice/authSlice";
import { AppDispatch, Rootstate } from "@/redux/store/store";
import { fetchuser, setupBuyer, setupSeller } from "@/service/Api/userApi";
import { AxiosError } from "axios";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import { useRQ } from "@/hooks/userRQ";
import { useQueryClient } from "@tanstack/react-query";

const Profile = () => {
  useAuth();
  const dispatch = useDispatch<AppDispatch>()
  const {isLoading,data}=useRQ(fetchuser,'User')
  const queryCLient = useQueryClient()
  const setBuyer=async()=>{
    try {
      const {data}= await setupBuyer()
      if(data.success){    
        queryCLient.invalidateQueries({queryKey:['User']})
        dispatch(setRole('Buyer'))
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
     const {data} = await setupSeller()
     if(data.success){      
      queryCLient.invalidateQueries({queryKey:['User']})
      dispatch(setRole('Seller'))
    }else{
      throw new Error(data.message)
    }
    } catch (error) {
      console.log('eroor from cards',error);
      toast.error(((error as AxiosError).response?.data as Record<string,string>).message)
    }
  }
  
    
  return (
    <>
      <div className="flex-1 flex flex-col  p-5 bg-[#1a191996]  m-4   rounded-3xl shadow-inner ">
        <h1 className="text-2xl font-semibold mb-4 text-gray-200">
          User Profile
        </h1>
       
        {isLoading ? <Loader/> : data.role =='Guest' ? <ProfileCards buyer={setBuyer} seller={setSeller}/> : data.role=='Buyer'? <BuyerProfile  /> : data.role=='Seller'?<SellerProfile/>:<Loader/> }

      
      </div>
    </>
  );
};

export default Profile;
