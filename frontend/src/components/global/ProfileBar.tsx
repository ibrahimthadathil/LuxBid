import { uploadProfile } from "@/service/Api/userApi";
import { Iuser, Tbuyer } from "@/types/types";
import { useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { Gavel, Star, Trophy } from "lucide-react";
import React, { useState } from "react";
import { toast } from "sonner";
import { useTheme } from "../theme/theme-provider";

const ProfileBar = ({ user, bids }: { user: Iuser; bids: Tbuyer }) => {
  const [img, setimg] = useState<string|null>(null)
  const queryClient = useQueryClient()
  const {theme} =useTheme()
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    (async () => {
      try {
        const image = e.target.files?.[0] as File;
        if(image.size < 2 * 1024 * 1024 ){
          setimg(URL.createObjectURL(image))
          const {data} =await uploadProfile(image)
          if(data.success){
            toast.success(data.message)
            await queryClient.invalidateQueries({queryKey:['User']});
          }else toast.error(data.message)
        }else toast.error('Size Must be less than 2MB')
      } catch (error) {
        toast.error(((error as AxiosError).response?.data as Record<string, string>).message)
      }
    })();
    
  };
  return (
    <div className={` ${theme=='dark'? 'bg-black text-gray-200':'bg-gray-100 '} shadow-inner   py-6 rounded-2xl`}>
      <div className="px-6">
        <div className="flex items-center justify-between">
          <div className="flex flex-col items-start">
            <h1 className={`text-2xl  font-semibold ${theme!=='dark'?'text-gray-800':'text-white'}`}>{user.firstName} {user.lastName}</h1>
            <span className={` ${theme?'':''}text-sm`}>Email : {user.email}</span>
            <span className={` ${theme?'':''}text-sm`}>
              Phone : +91 {user?.phone || "0000000000"}
            </span>
          </div>

          <div className="flex items-center space-x-8">
            <div className="flex items-center space-x-2 border-2 rounded-xl border-[#5b4baea2] p-3">
              <Gavel className="w-5 h-5 text-purple-500" />
              <div>
                <span className="font-semibold">
                  {bids.CommittedBids ? "100" : "0"}
                </span>
                <p className={`text-xs ${theme=='dark'?'text-gray-400':'text-black'}`}>Connected Bid</p>
              </div>
            </div>

            <div className="flex items-center space-x-2 border-2 rounded-xl border-[#5b4baeb7] p-3">
              <Trophy className="w-5 h-5 text-purple-500" />
              <div>
                <span className="font-semibold">
                  {bids.CommittedBids ? "100" : "0"}
                </span>
                <p className={`text-xs ${theme=='dark'?'text-gray-400':'text-black'}`}>Won items</p>
              </div>
            </div>

            <div className="flex items-center space-x-2 border-2 rounded-xl border-[#5b4baec7] p-3">
              <Star className="w-5 h-5 text-purple-500" />
              <div>
                <span className="font-semibold">12</span>
                <p className={`text-xs ${theme=='dark'?'text-gray-400':'text-black'}`}>Favorites</p>
              </div>
            </div>
            <form>
              <div className="h-20 w-20 border rounded-full shadow-2xl shadow-[#5b4bae43] bg-gray-800 overflow-hidden relative">
                <label
                  className="w-full h-full absolute cursor-pointer"
                  htmlFor="image"
                ></label>
                <img
                  src={
                    img ||user.profile||
                    `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100"><rect width="100%" height="100%" fill="navy"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="white" font-size="50" font-family="Arial">${user.firstName[0].toUpperCase()}</text></svg>`
                  }
                  alt="Profile"
                  className="w-full h-full object-cover cursor-pointer "
                />
                <input
                  className="hidden"
                  onChange={handleChange}
                  id="image"
                  type="file"
                  accept="image/*"
                  name="image"
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(ProfileBar);
