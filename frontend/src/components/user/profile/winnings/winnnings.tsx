import { useTheme } from "@/components/theme/theme-provider";
import Address from "./address/address";
import { fetchAddress } from "@/service/Api/addressApi";

const Winnnings = () => {
    const {theme}= useTheme()
    fetchAddress()
  return (
    <div className="w-full max-h-full h-full overflow-y-auto flex flex-col gap-3  p-2">
      <div className={` min-h-[220px] shadow-inner rounded-lg ${theme=='dark'?'':'bg-gray-100'}`}>
        <Address />
      </div>
      <h1 className="text-center font-bold text-2xl text-indigo-900"> Winnings</h1>
      <div className={`${theme=='dark'?'':'bg-gray-100'} border h-full rounded-t-lg max-h-full overflow-y-auto${theme=='dark'?'':'bg-gray-100'}`}>
        
      </div>
    </div>
  );
};

export default Winnnings;
