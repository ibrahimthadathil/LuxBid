import ProfileBar from "../../../../components/global/ProfileBar";
import UserForm from "../../../../components/global/userForm";
import { useRQ } from "@/hooks/userRQ";
import Loader from "@/components/global/Loader";
import { fetchBuyer } from "@/service/Api/buyerApi";


const ProfileDashboard = () => {
  const{isLoading,data,isSuccess}= useRQ(fetchBuyer,'Buyer')
   
  
  console.log('from buyer',data);
   
  return (
    isLoading ? <div className="p-3 space-y-6 flex w-full h-full "><Loader/></div> :
    isSuccess?<div className="p-3 space-y-6  ">
      {/* {profile bar}     */}

      <ProfileBar user={data?.user} bids={data?.committedBids}/>

      {/* { profile details } */}
      <div className="grid grid-cols-3 gap-8">
        <UserForm user={data?.user}/>
        <div className="bg-black shadow-xl rounded-2xl p-8 h-fit">
          <h2 className="text-xl font-semibold text-gray-300 mb-6">
            To get access to Organize an auction? 
          </h2>
          <button className="w-full border border-dashed border-[#5b4bae96] text-white px-8 py-3 rounded-xl hover:bg-[#5b4bae85] transition-colors shadow-lg ">
            Request
          </button>
        </div>
      </div>
    </div> : 
    <Loader/>
    
  );
};

export default ProfileDashboard;
