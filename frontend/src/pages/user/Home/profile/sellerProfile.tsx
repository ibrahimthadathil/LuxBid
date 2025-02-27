import UserForm from "@/components/global/userForm";
import ProfileBar from "../../../../components/global/ProfileBar";
import { useRQ } from "@/hooks/userRQ";
import { fetchSeller } from "@/service/Api/sellerApi";
import Loader from "@/components/global/Loader";
import React from "react";
import  AverageRating  from "@/components/user/profile/myProfile/Ratings";

const SellerProfile = () => {
  const {data,isLoading,isSuccess}=useRQ(fetchSeller,'Seller')
    
  return (
    isLoading ? <div className="p-3 space-y-6 flex w-full h-full "><Loader/></div> :
      isSuccess ? <div className="p-3 space-y-6">
        {/* {profile bar}     */} 
        <ProfileBar user={data[0]?.user}  bids={data[1]?.committedBids} />
        {/* {details box} */}
         <div className="grid grid-cols-3 gap-8">
          <UserForm user={data[0]?.user} />
          <div>
              <AverageRating rating={4.7} totalReviews={data[0]?.rating?.length} reviews={data[0]?.rating}/>
            </div>
        </div>
      </div> : 
    <Loader/>
    
  )
}

export default React.memo(SellerProfile);
