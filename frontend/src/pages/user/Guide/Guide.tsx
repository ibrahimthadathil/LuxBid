import { useTheme } from "@/components/theme/theme-provider";
import {
  HandshakeIcon,
  CreditCard,
  DollarSign,
  Star,
  Map,
} from "lucide-react";
import { FaPeopleArrows } from "react-icons/fa";
const Guide = () => {
  const {theme}=useTheme()
  return (
    <>
      <div className="min-h-screen p-2 sm:p-4 md:p-6 w-full mt-10 mb-10 ">
      <div className="mx-auto max-w-5xl space-y-12 py-8">
        {/* Step 1 */}
        <div className="grid items-center gap-4 sm:gap-6 md:grid-cols-2">
          <div className="space-y-1 rounded-3xl  p-4 text-white">
            <h5 className={`text-lg ${theme=='dark'?"text-gray-300":"text-indigo-950"}  sm:text-xl md:text-2xl font-semibold`}>
              Step 1: How to join <span className="text-[#3849a0]">LuxBid</span>
            </h5>
            <div className={`text-sm font-thin sm:text-base ${theme=='dark'?"text-gray-300":"text-zinc-800"}`}>
              <p>Visit the sign-in page and fill in your details.</p>
              <p>Choose your login/buyer details.</p>
              <p>
                Update your profile with preferences, location, and language
                options.
              </p>
            </div>
          </div>
          <div className="flex justify-center">
            <div className="relative">
              <div className="absolute -left-2 -top-2 animate-pulse">
                <Star className="h-4 w-4 text-[#4b5bAe]" />
              </div>
              <div className="rounded-full  p-4">
                <Map className="h-12 w-12 text-[#4b5bAe]" />
              </div>
            </div>
          </div>
        </div>

        {/* Step 2 */}
        <div className="grid items-center gap-4 sm:gap-6 md:grid-cols-2 ">
          <div className="flex justify-center">
            <div className="relative">
              <div className="absolute-right-2 -top-2 animate-pulse">
                <DollarSign className="h-4 w-4 text-[#4b5bAe]" />
              </div>
              <div className=" p-4 ">
              <FaPeopleArrows className="h-12 w-12 text-[#4b5bAe] " />
              </div>
            </div>
          </div>

          <div className="space-y-1 rounded-3xl  p-4 text-white">
            <h5 className={`text-lg ${theme=='dark'?"text-gray-300":"text-indigo-950"}  sm:text-xl md:text-2xl font-semibold`}>
              Step 2: How Buy On <span className="text-[#4b5bAe]">LuxBid</span>
            </h5>
            <div className={`text-sm font-thin sm:text-base ${theme=='dark'?"text-gray-300":"text-zinc-800"}`}>
              <p>Navigate to the Categories section.</p>
              <p>
                Choose from exclusive items like Andique, Jewels, accessories,
                etc.
              </p>
              <p>Either Join a Live Auction or Bid on Listed Items.</p>
            </div>
          </div>
        </div>

        {/* Step 3 */}
        <div className="grid items-center gap-4 sm:gap-6 md:grid-cols-2">
          <div className="space-y-1 rounded-3xl  p-4  text-white]">
            <h5 className={`text-lg ${theme=='dark'?"text-gray-300":"text-indigo-950"}  sm:text-xl md:text-2xl font-semibold`}>
              Step 3: Place a Bid On{" "}
              <span className="text-[#4b5bAe]">LuxBid</span>
            </h5>
            <div className={`font-thin text-sm sm:text-base ${theme=='dark'?"text-gray-300":"text-zinc-800"}`}>
              <p>Choose the Item you want to bid on.</p>
              <p>Enter the amount you&apos;re willing to pay.</p>
              <p>Click Place Bid.</p>
              <p>Keep track of your bids under the My Bids section.</p>
            </div>
          </div>
          <div className="flex justify-center">
            <div className="relative">
              <div className="absolute-left-2 top-4 animate-pulse">
                <Star className="h-4 w-4 text-[#4b5bAe]" />
              </div>
              <div className="rounded-full  p-4">
                <HandshakeIcon className="h-12 w-12 text-[#4b5bAe]" />
              </div>
            </div>
          </div>
        </div>

        {/* Step 4 */}
        <div className="grid items-center gap-4 sm:gap-6 md:grid-cols-2">
          <div className="flex justify-center">
            <div className="relative">
              <div className="absolute -right-2 -top-2 animate-pulse">
                <DollarSign className="h-4 w-4 text-[#4b5bAe]" />
              </div>
              <div className="rounded-full  p-4">
                <CreditCard className="h-12 w-12 text-[#4b5bAe]" />
              </div>
            </div>
          </div>

          <div className="space-y-1 rounded-3xl  p-4 text-white">
            <h5 className={`text-lg ${theme=='dark'?"text-gray-300":"text-indigo-950"}  sm:text-xl md:text-2xl font-semibold`}>
              Step 4: Win a Bid On{" "}
              <span className="text-[#4b5bAe]">LuxBid</span>
            </h5>
            <div className={`text-xs font-thin sm:text-base ${theme=='dark'?"text-gray-300":"text-zinc-800"}`}>
              <p>If you win the bid, you will receive a notification.</p>
              <p>
                You can then proceed to the Payment page to complete your
                purchase.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
    
  );
};
export default Guide;
