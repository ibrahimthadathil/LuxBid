import { useState } from "react";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/input";
import {
  Hammer,
  Timer,
  Users,
  Check,
  HandshakeIcon as HandShake,
  ArrowLeft,
} from "lucide-react";
import { Navigate, useLocation } from "react-router-dom";
import { useRQ } from "@/hooks/userRQ";
import { auctionInterface } from "@/service/Api/auctionApi";
import moment from "moment";
import { ScrollArea } from "@/components/ui/scroll-area";
import { raiseBidAmount } from "@/service/Api/buyerApi";

interface Biduser {
  user: { firstName: string; profile: string };
  amount: number;
  bidTime: string;
  isAccept: boolean;
}
interface avatarofBidder {
  bidder: Biduser;
  size: "sm" | "md" | "lg";
}
interface AuctionInterfaceProps {
  userType: "bidder" | "organizer";
}

const AuctionInterface = ({ userType }: AuctionInterfaceProps) => {
  const [currentBid, setCurrentBid] = useState(17564);
  const [currentBidder, setCurrentBidder] = useState("John");
  const [bidAmount, setBidAmount] = useState("");
  const location = useLocation();
  const { AuctionId } = location.state || "";
  const { isLoading, data } = useRQ(
    () => auctionInterface(AuctionId),
    "detailed"
  );
  console.log(data);

  if (!AuctionId) return <Navigate to="/deals" replace={true} />;

  const handleBid = async(auctionId:string) => {
    if (bidAmount) {
      setCurrentBid(parseInt(bidAmount));
      await raiseBidAmount(Number(bidAmount),auctionId)
      setCurrentBidder("You"); // Assuming the current user is bidding
      setBidAmount("");
    }
  };

  const handleAccept = (bidder: string, amount: number) => {
    setCurrentBid(amount);
    setCurrentBidder(bidder);
    console.log(`Accepted bid from ${bidder} for ₹${amount}`);
    // Add logic to handle bid acceptance
  };

  const handleDeal = () => {
    console.log("Deal finalized with", currentBidder, "for ₹", currentBid);
    // Add logic to finalize the deal
  };

  const renderBidder = ({ bidder, size }: avatarofBidder) => {
    const avatarSizes = {
      sm: "w-16 h-16",
      md: "w-20 h-20",
      lg: "w-24 h-24",
    };
    const textSizes = {
      sm: "text-xs",
      md: "text-sm",
      lg: "text-base",
    };

    return isLoading ? (
      <p>Loading</p>
    ) : (
      <div
        className={`flex flex-col items-center ${
          size === "lg" ? "mx-4" : "mx-2"
        }`}
      >
        <Avatar className={`${avatarSizes[size]} mb-2`}>
          <img
            src={
              bidder?.user?.profile
                ? bidder?.user?.profile
                : `https://api.dicebear.com/6.x/initials/svg?seed=${bidder?.user?.firstName[0]}`
            }
            alt={`${bidder?.user?.firstName}'s avatar`}
            className="object-cover"
          />
        </Avatar>
        <div className="text-center">
          <h2 className={`${textSizes[size]} font-semibold text-amber-500`}>
            {bidder?.user?.firstName}
          </h2>
          <div className="flex items-center justify-center gap-1 mt-1">
            {bidder?.amount ? (<><Hammer className={`${size === "sm" ? "w-2 h-2" : "w-3 h-3"}`} />
            <span className={textSizes[size]}>₹{bidder?.amount}</span></>):'No user'}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="w-full  text-white p-10">
      <button
        className="mb-6 rounded-full w-12 h-12 flex items-center justify-center border hover:bg-indigo-950 hover:text-white text-indigo-400"
        onClick={() => ""}
      >
        <ArrowLeft className="w-6 h-6" />
      </button>
      <div className="max-w-3xl mx-auto bg-slate-900/50 rounded-3xl border border-slate-700/50 p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-xl font-light text-amber-500">
              {data?.auction?.title}
            </h1>
            <div className="flex items-center gap-4 text-sm text-slate-400 mt-2">
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4" />
                <span>{data?.auction?.bidders?.length}</span>
                {data?.auction?.auctionType == "Live" && (
                  <div className="flex items-center gap-2 bg-white/5 px-3 py-1 rounded-full">
                    <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                    <span>Live</span>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2 text-slate-400">
            <Timer className="w-4 h-4" />
            {data?.auction?.auctionType == "Live" ? (
              <span>Started {moment(data?.auction?.startTime).fromNow()}</span>
            ) : (
              (() => {
                const now = moment(); 
                const endTime = moment(data?.auction?.endTime);
                const duration = moment.duration(endTime.diff(now)); 
                return endTime.isAfter(now)
                  ? `Ends in: ${Math.floor(
                      duration.asHours()
                    )}h ${duration.minutes()}m`
                  : `Auction ended ${moment(data?.auction?.endTime).fromNow()}`;
              })()
            )}
          </div>
        </div>

        {/* Top 3 Bidders */}
        <div className="flex justify-center items-end mb-6">
          {renderBidder({ bidder: data?.auction?.bidders?.[1], size: "sm" })}
          {renderBidder({ bidder: data?.auction?.bidders?.[0], size: "lg" })}
          {renderBidder({ bidder: data?.auction?.bidders?.[2], size: "sm" })}
        </div>

        {/* Current Bid Display */}
        <div className="text-center mb-8">
          <div className="inline-block bg-slate-800/50 rounded-full px-6 py-2 border border-slate-700">
            <div className="flex items-center gap-2">
              <Hammer className="w-4 h-4" />
              <span className="text-sm font-semibold">
                Current Bid: ₹{data?.auction?.baseAmount}
              </span>
            </div>
          </div>
        </div>

        {/* Bids List */}
        <ScrollArea className="max-h-[300px] w-full pr-4">
          <div className="space-y-3 mb-6">
            {(data?.auction?.bidders as Biduser[])?.map((user, index) => (
              <div
                key={index}
                className="flex items-center justify-between bg-slate-800/30 rounded-full px-4 py-2"
              >
                <div className="flex items-center gap-2">
                  <Avatar className="w-6 h-6 bg-slate-700">
                    {user.user.profile ? (
                      <img
                        src={user.user.profile}
                        alt={`${user.user.firstName}'s profile`}
                        className="w-full h-full object-cover rounded-full"
                      />
                    ) : (
                      <span className="text-s ps-[7px]">
                        {user.user.firstName[0].toUpperCase()}
                      </span>
                    )}
                  </Avatar>
                  <span className="text-sm text-slate-300">
                    {user.user.firstName}
                  </span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-sm">₹{user.amount}</span>
                  <span className="text-xs text-slate-500">
                    {moment(user?.bidTime).format("LT")}
                  </span>
                  {data?.organizer && (
                    <Button
                      size="sm"
                      variant="outline"
                      className="rounded-full text-green-400 border-green-400 hover:bg-green-400/20"
                      // onClick={() => handleAccept(user., user.amount)}
                    >
                      <Check className="w-4 h-4 mr-1" />
                      Accept
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>

        {/* Bidding Area or Deal Button */}
        {!data?.organizer ? (
          <div className="flex gap-2">
            <Input
              type="number"
              placeholder="Bid Amount..."
              value={bidAmount}
              onChange={(e) => setBidAmount(e.target.value)}
              className="flex-1 bg-slate-800/30 border-slate-700 rounded-full text-white placeholder:text-slate-500"
            />
            <Button
              className="rounded-full bg-blue-600 hover:bg-blue-700"
              onClick={()=>handleBid(data?.auction?._id)}
            >
              <Hammer className="w-4 h-4" />
            </Button>
          </div>
        ) : (
          <Button
            className="w-full rounded-full bg-green-600 hover:bg-green-700"
            onClick={handleDeal}
          >
            <HandShake className="w-4 h-4 mr-2" />
            Finalize Deal
          </Button>
        )}
      </div>
    </div>
  );
};
export default AuctionInterface;
