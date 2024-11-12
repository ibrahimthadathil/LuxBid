import ProfileBar from "./ProfileBar";

const ProfileDashboard = () => {
  return (
    <div className="p-3 space-y-6">
    {/* {profile bar}     */}

    <ProfileBar/>
      
    {/* { profile details } */}
      <div className="grid grid-cols-3 gap-8">
        <div className="col-span-2 bg-black shadow-xl rounded-2xl p-4">
          <h2 className="text-xl font-semibold text-gray-200 mb-3">Change details</h2>
          <form className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-400 mb-1">First name</label>
                <input
                  type="text"
                  defaultValue="John"
                  className="w-full bg-[#1a1a1a] border border-[#5b4bae49] rounded-xl px-4 py-[10px] focus:outline-none focus:ring-[.5px] focus:ring-purple-500 text-gray-200"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">Last name</label>
                <input
                  type="text"
                  defaultValue="Samuel"
                  className="w-full bg-[#1a1a1a] border border-[#5b4bae49] rounded-xl px-4 py-[10px] focus:outline-none focus:ring-[.5px] focus:ring-purple-500 text-gray-200"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-400 mb-1">Email</label>
                <input
                  type="email"
                  defaultValue="John@gmail.com"
                  className="w-full bg-[#1a1a1a] border border-[#5b4bae49] rounded-xl px-4 py-[10px] focus:outline-none focus:ring-[.5px] focus:ring-purple-500 text-gray-200"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">Phone ( IND )</label>
                <input
                  type="text"
                  defaultValue="+91 8943647459"
                  className="w-full bg-[#1a1a1a] border border-[#5b4bae49] rounded-xl px-4 py-[10px] focus:outline-none focus:ring-[.5px] focus:ring-purple-500 text-gray-200"
                />
              </div>
            </div>
            
            
            
            <button className=" text-white px-8 py-3 border border-[#5b4bae7a] rounded-xl hover:bg-[#5b4bae85] transition-colors shadow-lg">
              Save Changes
            </button>
          </form>
        </div>

        <div className="bg-black shadow-xl rounded-2xl p-8 h-fit">
          <h2 className="text-xl font-semibold text-gray-300 mb-6">To get access to Organize an auction?</h2>
          <button className="w-full border border-dashed border-[#5b4bae96] text-white px-8 py-3 rounded-xl hover:bg-[#5b4bae85] transition-colors shadow-lg ">
            Request
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileDashboard;