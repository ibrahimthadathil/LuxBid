import { Iuser } from "@/types/user";
import { Gavel, Star, Trophy } from "lucide-react";
import React from "react";

const ProfileBar = ({ user }: { user: Iuser }) => {
  return (
    <div className="bg-black shadow-xl   text-gray-200 py-6 rounded-2xl">
      <div className="px-6">
        <div className="flex items-center justify-between">
          <div className="flex flex-col items-start">
            <h1 className="text-2xl font-semibold">{user.firstName}</h1>
            <span className="text-gray-400 text-sm">Email : {user.email}</span>
            <span className="text-gray-400 text-sm">
              Phone : +91 {user.phone || "0000000000"}
            </span>
          </div>

          <div className="flex items-center space-x-8">
            <div className="flex items-center space-x-2 border rounded-xl border-[#5b4baea2] p-3">
              <Gavel className="w-5 h-5 text-purple-500" />
              <div>
                <span className="font-semibold">23</span>
                <p className="text-xs text-gray-400">Connected Bid</p>
              </div>
            </div>

            <div className="flex items-center space-x-2 border rounded-xl border-[#5b4baeb7] p-3">
              <Trophy className="w-5 h-5 text-purple-500" />
              <div>
                <span className="font-semibold">51</span>
                <p className="text-xs text-gray-400">Won items</p>
              </div>
            </div>

            <div className="flex items-center space-x-2 border rounded-xl border-[#5b4baec7] p-3">
              <Star className="w-5 h-5 text-purple-500" />
              <div>
                <span className="font-semibold">12</span>
                <p className="text-xs text-gray-400">Favorites</p>
              </div>
            </div>

            <div className="h-20 w-20 border rounded-full shadow-2xl shadow-[#5b4bae43] bg-gray-800 overflow-hidden">
              <img 
                src ={
                  user.profile ||
                  `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100"><rect width="100%" height="100%" fill="navy"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="white" font-size="50" font-family="Arial">${user.firstName[0].toUpperCase()}</text></svg>`
                }
                alt="Profile"
                className="w-full h-full object-cover cursor-pointer "
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(ProfileBar);
