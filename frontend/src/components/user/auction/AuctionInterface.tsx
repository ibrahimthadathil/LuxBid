
import { useEffect, useState } from "react";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/input";
import { Hammer, Timer, Users, Check, HandshakeIcon as HandShake, ArrowLeft } from 'lucide-react';
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { useRQ } from "@/hooks/userRQ";
import { auctionInterface } from "@/service/Api/auctionApi";
import moment from "moment";
import { ScrollArea } from "@/components/ui/scroll-area";
import { raiseBidAmount } from "@/service/Api/buyerApi";
import { useQueryClient } from "@tanstack/react-query";
import { finalizeDeal, handleRaisedBid } from "@/service/Api/sellerApi";
import { useAuth } from "@/hooks/useAuth";
import { useSocket } from "@/context/socketCotext";
import { bidSchema } from "@/utils/validation/auction";
import { toast } from "sonner";
import Loader from "@/components/global/Loader";
import { showConfetti, showFireworkConfetti } from "@/utils/canva-popperEffect/Popper";
import AlertModal from "@/components/global/AlertModal";

interface Biduser {
  user: { _id:string,firstName: string; profile: string };
  amount: number;
  bidTime: string;
  isAccept: boolean;
}
interface avatarofBidder {
  bidder: Biduser;
  size: "sm" | "md" | "lg";
  accept?:boolean
}       

const AuctionInterface = () => {
  console.log('rendering');
  
  useAuth();
  const [bidAmount, setBidAmount] = useState("");
  const [countdown, setCountdown] = useState("");
  const [auctionStarted, setAuctionStarted] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { AuctionId } = location.state || "";
  const queryClient = useQueryClient();
  const socket = useSocket();
  if (!AuctionId) return <Navigate to="/deals" replace={true} />;
  const { isLoading, data } = useRQ(
    () => auctionInterface(AuctionId),
    "auction"
  );

  useEffect(() => {
    if (!socket || !AuctionId) return;

    socket.emit("joinAuctionRoom", AuctionId);

    socket.on("bidUpdated", ({ message }) => {
        toast.info(message);
        queryClient.invalidateQueries({ queryKey: ["auction"] });
    });

    socket.on("bidAccepted", ({ message }) => {
        toast.success(message);
        queryClient.invalidateQueries({ queryKey: ["auction"] });
        showConfetti();
    });

    socket.on("auctionClosed", ({ message }) => {
        toast.warning(message);
        queryClient.invalidateQueries({ queryKey: ["auction"] });
        showFireworkConfetti();
    });

    return () => {
        socket.off("bidUpdated");
        socket.off("bidAccepted");
        socket.off("auctionClosed");
        socket.emit("leaveAuctionRoom", AuctionId);
    };
}, [socket, AuctionId, queryClient]);


  useEffect(() => {
    if (!data?.auction?.startTime) return;
    if(!data.auction.isActive){
      showFireworkConfetti()
    }
    const timer = setInterval(() => {
      const now = moment();
      const startTime = moment(data.auction.startTime);
      if (startTime.isAfter(now)) {
        const duration = moment.duration(startTime.diff(now));
        setCountdown(`${duration.hours()}h ${duration.minutes()}m ${duration.seconds()}s`);
        setAuctionStarted(false);
      } else {
        setCountdown("");
        setAuctionStarted(true);
        clearInterval(timer);
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [data]);

  const handleBid = async (currentbid:number) => {
    try {
      const validation = bidSchema.safeParse({
        bidAmount: Number(bidAmount),
        currentBid: currentbid || 0,
      });
      if(!validation.success){
        toast.warning('Bid Amount should be greater than current amount');
        return;
      }
      await raiseBidAmount(Number(bidAmount), AuctionId);
      socket.emit("newBid", {
          auctionId: AuctionId,
          amount: bidAmount,
          bidderName: data?.auction?.bidders[0]?.user?.firstName || "User"
      });
      queryClient.invalidateQueries({queryKey:["auction"]});
      setBidAmount("");
  } catch (error) {
      toast.error("Failed to place bid. Please try again.");
      console.error(error);
  }
  };

  // const handleAccept = async (bidder: string, amount: number,user:string) => {
  //   try {
  //     await handleRaisedBid(bidder, amount, AuctionId);
  //     toast.success('Bid accepted');
  //     socket.emit('bidAccepted',{AuctionId,amount,user})
  //     queryClient.invalidateQueries({queryKey:["auction"]});
  //   } catch (error) {
  //     console.error("Failed to accept bid:", error);
  //     toast.error("Failed to accept bid. Please try again.");
  //   }
  // };
  const handleAccept = async (bidder: string, amount: number, user: string) => {
    try {
        await handleRaisedBid(bidder, amount, AuctionId);
        socket.emit("bidAccepted", {
            auctionId: AuctionId,
            amount,
            bidderName: user
        });
    } catch (error) {
        console.error("Failed to accept bid:", error);
        toast.error("Failed to accept bid. Please try again.");
    }
};

const handleDeal = async (id: string) => {
  try {
      const { data } = await finalizeDeal(id);
      if (data.success) {
          socket.emit("closeAuction", { auctionId: id });
      }
  } catch (error) {
      toast.error("Failed to close auction");
      console.error(error);
  }
};
  // const handleDeal = async(id:string) => {
  //   try {
  //    const {data} = await finalizeDeal(id)
  //   if(data.success){
  //     socket.emit('close Auction', {id}); 
  //   }
     
  //   } catch (error) {
      
  //   }
  // };

  const renderBidder = ({ bidder, size, accept}: avatarofBidder) => {
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
        <Avatar className={`${avatarSizes[size]} mb-2 ${accept ? "border-green-500 animate-pulse border-4" : ''}`}>
          <img
            src={
              bidder?.user?.profile
                ? bidder?.user?.profile
                : `https://api.dicebear.com/6.x/initials/svg?seed=${bidder?.user?.firstName[0]}`
            }
            alt={`${bidder?.user?.firstName}'`}
            className="object-cover"
          />
        </Avatar>
        <div className="text-center">
          <h2 className={`${textSizes[size]} font-semibold text-amber-500`}>
            {bidder?.user?.firstName}
          </h2>
          <div className="flex items-center justify-center gap-1 mt-1">
            {bidder?.amount ? (
              <>
                <Hammer className={`${size === "sm" ? "w-2 h-2" : "w-3 h-3"}`} />
                <span className={textSizes[size]}>₹{bidder?.amount}</span>
              </>
            ) : 'No user'}
          </div>
        </div>
      </div>
    );
  };

  return (
    isLoading ? <Loader/> :<div className="w-full min-h-screen text-white p-10 relative">
      {!auctionStarted && countdown&&(
        <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 border">
          <div className="text-center">
            <h2 className="text-4xl font-bold mb-4">Auction Starts In</h2>
            <p className="text-6xl font-bold">{countdown}</p>
          </div>
        </div>
      )}
      {!data?.auction?.isActive && ( // Added condition to render "Auction is Closed" overlay
        <div className="absolute inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50">
          <div className="text-center">
            <h2 className="text-4xl font-bold mb-4">Auction is Closed</h2>
            <p className="text-xl mb-4">Ended {moment(data?.auction?.endTime).fromNow()}</p>
              <div className="mt-4">
                <h3 className="text-2xl font-semibold mb-2">Winner</h3>
                <div className="flex items-center justify-center">
                  <Avatar className="w-16 h-16 mr-4">
                    <img
                      src={data?.auction?.bidders[0].user.profile || `https://api.dicebear.com/6.x/initials/svg?seed=${data?.auction?.bidders[0].user.firstName[0]}`}
                      alt={`${data?.auction?.bidders[0].user.firstName}'s avatar`}
                      className="object-cover"
                    />
                  </Avatar>
                  <div className="text-left">
                    <p className="text-lg font-semibold">{data?.auction?.bidders[0].user.firstName}</p>
                    <p className="text-amber-500">Winning Bid: ₹{data?.auction?.bidders[0].amount}</p>
                  </div>
                </div>
              </div>
          </div>
        </div>
      )}
      <button
        className="mb-6 rounded-full w-12 h-12 flex items-center justify-center border hover:bg-indigo-950 hover:text-white text-indigo-400"
        onClick={() => navigate(`/deals/auction/`,{state:{id:AuctionId}})}
      >
        <ArrowLeft className="w-6 h-6" />
      </button>
      <div className={`max-w-3xl mx-auto bg-slate-900/50 rounded-3xl border border-slate-700/50 p-6 ${!auctionStarted ? 'opacity-50 pointer-events-none' : ''}`}>
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

        {data?.auction?.image && (
          <div className="mb-6 relative">
            <img 
              src={data.auction.image} 
              alt="Auction Item" 
              className="w-full h-64 object-cover rounded-lg"
            />
          </div>
        )}

        {/* Top 3 Bidders */}
        <div className="flex justify-center items-end mb-6">
          {renderBidder({ bidder: data?.auction?.bidders?.[1], size: "sm" })}
          {renderBidder({ bidder: data?.auction?.bidders?.[0], size: "lg", accept: data?.auction?.bidders?.[0]?.isAccept})}
          {renderBidder({ bidder: data?.auction?.bidders?.[2], size: "sm" })}
        </div>

        {/* Current Bid Display */}
        <div className="text-center mb-8">
          <div className="inline-block bg-slate-800/50 rounded-full px-6 py-2 border border-slate-700">
            <div className="flex  items-center gap-2">
              <Hammer className="w-4 h-4" />
              <span className="text-sm font-semibold">
                Current Bid: ₹{data?.auction?.baseAmount}
              </span>
             
            </div>
          </div>
          <p></p>
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
                    {user?.user?.profile ? (
                      <img
                        src={user?.user?.profile}
                        alt={`${user?.user?.firstName}'s profile`}
                        className="w-full h-full object-cover rounded-full"
                      />
                    ) : (
                      <span className="text-s ps-[7px]">
                        {user?.user?.firstName[0].toUpperCase()}
                      </span>
                    )}
                  </Avatar>
                  <span className="text-sm text-slate-300">
                    {user?.user?.firstName}
                  </span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-sm">₹{user?.amount}</span>
                  <span className="text-xs text-slate-500">
                    {moment(user?.bidTime).format("LT")}
                  </span>
                  {data?.organizer && (
                    <Button
                      size="sm"
                      variant="outline"
                      className={`${user?.isAccept ? "rounded-full text-gray-500 opacity-90 border-gray-500 hover:bg-gray-500/20":"rounded-full text-green-400 border-green-400 hover:bg-green-400/20"}`}
                      onClick={() => handleAccept(user?.user?._id, user?.amount,user?.user?.firstName)}
                      disabled={user?.isAccept}
                    >
                      <Check className="w-4 h-4 mr-1" />
                    {user?.isAccept ? 'Accepted':'Accept'}
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
              onClick={() => handleBid(data?.auction?.baseAmount)}
              disabled ={data?.auction?.isActive==false}
            >
              <Hammer className="w-4 h-4" />
            </Button>
          </div>
        ) : (
          <Button 
            disabled={data?.auction?.bidders?.length < 1}
            className="w-full rounded-full bg-green-600 hover:bg-green-700"          >
            <AlertModal action={handleDeal} data={data?.auction} style=' w-full rounded-full bg-green-600 hover:bg-green-700 border-none'
             contents={[<p className="flex gap-2"><HandShake className="w-4 h-4 mr-2" />Finalize Deal</p> ,'Are you sure To Finalize This Deal ?']} />
          </Button>
        )}
      </div>
    </div>
  );
};

export default AuctionInterface;

