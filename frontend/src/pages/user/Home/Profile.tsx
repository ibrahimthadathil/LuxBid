import Loader from "@/components/global/Loader";
import ProfileCards from "@/components/global/ProfileCards";
import { useAuth } from "@/hooks/useAuth";
import { Rootstate } from "@/redux/store/store";
import { useSelector } from "react-redux";

const Profile = () => {
  useAuth();
  const role = useSelector((state: Rootstate) => state.user.role);

  return (
    <>
      <div className="flex-1 flex flex-col  p-5 bg-[#0f0f0fd9] m-4  rounded-3xl shadow-inner ">
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
        
        {role=='Guest' ? <ProfileCards/> : <Loader/>}
        
      </div>
    </>
  );
};

export default Profile;
