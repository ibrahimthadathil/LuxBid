import UserForm from "@/components/global/userForm";
import ProfileBar from "../../../../components/global/ProfileBar";

const SellerProfile = () => {
  return (
    <>
      <div className="p-3 space-y-6">
        {/* {profile bar}     */}
        <ProfileBar />
        {/* {details box} */}
        <div className="grid grid-cols-3 gap-8">
          <UserForm />
        </div>
      </div>
    </>
  );
};

export default SellerProfile;
