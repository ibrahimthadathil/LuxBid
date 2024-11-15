import ProfileBar from "../../../../components/global/ProfileBar";
import UserForm from "../../../../components/global/userForm";

const ProfileDashboard = () => {
  return (
    <div className="p-3 space-y-6">
      {/* {profile bar}     */}

      <ProfileBar />

      {/* { profile details } */}
      <div className="grid grid-cols-3 gap-8">
        <UserForm />
        <div className="bg-black shadow-xl rounded-2xl p-8 h-fit">
          <h2 className="text-xl font-semibold text-gray-300 mb-6">
            To get access to Organize an auction?
          </h2>
          <button className="w-full border border-dashed border-[#5b4bae96] text-white px-8 py-3 rounded-xl hover:bg-[#5b4bae85] transition-colors shadow-lg ">
            Request
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileDashboard;
