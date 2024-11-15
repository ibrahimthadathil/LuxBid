import { Gavel, Star, Trophy } from 'lucide-react'
import React from 'react'

const ProfileBar = () => {
  return (
    <div className="bg-black shadow-xl   text-gray-200 py-6 rounded-2xl">
        <div className="px-6">
          <div className="flex items-center justify-between">
            <div className="flex flex-col items-start">
              <h1 className="text-2xl font-semibold">John Samuel</h1>
              <span className="text-gray-400 text-sm">Email : User@gmail.com</span>
              <span className="text-gray-400 text-sm">Phone : +91 875748776</span>
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
              
              <div className="h-20 w-20 rounded-full shadow-2xl shadow-[#5b4bae43] bg-gray-800 overflow-hidden">
                <img 
                  src="/api/placeholder/80/80"
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
  )
}

export default React.memo(ProfileBar)
