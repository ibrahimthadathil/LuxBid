import DataTable from "@/components/global/dataTable";
import Loader from "@/components/global/Loader";
import { PostModal } from "@/components/global/PostModal";

import { useRQ } from "@/hooks/userRQ";
import { showCommittedBids } from "@/service/Api/buyerApi";
import { Tauction, Tbuyer, Tproduct } from "@/types/types";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import { CalendarClock, Radio, Users } from "lucide-react";
import moment from "moment";
import { useMemo } from "react";
import { BidHistoryDialog } from "./BidHistory";
import { useTheme } from "@/components/theme/theme-provider";

const MyBids = () => {
  const { data, isLoading } = useRQ(showCommittedBids, "mybids");
  const {theme} =useTheme()
  console.log(data, "oo");

  const Columns = useMemo(
    () => [
      {
        header: "No",
        render: (_item: Tbuyer, i: number) => `LBMB 00${i + 1}`,
      },
      {
        header: "Auction Title",
        render: (auction: any) => (
          <div className="flex items-center gap-2">
            <Avatar className="h-8 w-8 border rounded-full ">
              <AvatarImage
                src={(auction?.auction?.post as Tproduct)?.images[0]}
                alt={auction?.auction?.title}
                className="object-cover w-8 h-8 rounded-full"
              />
            </Avatar>
            <span>{auction?.auction?.title}</span>
          </div>
        ),
      },
      {
        header: "Auction Result",
        render: (auction: any) => (
          <p
            className={` ${
              auction?.bidStatus == "WIN"
                ? "text-green-700"
                : auction?.bidStatus == "LOST"
                ? "text-red-700"
                : "text-yellow-700"
            }`}
          >
            {auction?.bidStatus}
          </p>
        ),
      },
      {
        header: "Auction Type",
        render: (auction: any) => (
          <span>
            {auction?.auction?.auctionType == "Live" ? (
              <div className="flex gap-2">
                <Radio size={20} />
                <p>Live</p>
              </div>
            ) : (
              <div className="flex gap-2">
                <CalendarClock size={20} />
                <p>Scheduled</p>
              </div>
            )}
          </span>
        ),
      },
      {
        header: "Auction Status",
        render: (auction: any) => (
          <span
            className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${
              auction?.auction?.isActive ? "text-green-700" : "text-red-700"
            }`}
          >
            {auction?.auction?.isActive ? "Active" : "Closed"}
          </span>
        ),
      },
      {
        header: "Details",
        render: (auction: any) => (
          <PostModal
            images={(auction?.auction?.post as Tproduct)?.images}
            buttonText="Details"
            sideContent={viewContent}
            key={auction._id}
            data={auction.auction}
          />
        ),
      },
      {
        header: "Bid History",
        render: (auction: any) => <BidHistoryDialog bidders={auction?.auction?.bidders} />,
      }
      ,
    ],
    [data]
  );

  const viewContent = useMemo(
    () => [
      {
        render: (post: any) => 
        !post?.isActive&&(<>
            <div className="bg-zinc-900 shadow-inner rounded-xl py-1">
            <h1 className="text-center text-xl font-semibold text-gray-200">🎉 WINNER 🎉</h1>
            <div className="flex flex-col py-2  items-center justify-cente ">
              {post.bidders[0].user?.profile ? (
                <img
                  src={post.bidders[0].user.profile}
                  alt="Profile"
                  className="w-10 h-10 rounded-full object-cover"
                />
              ) : (
                <div className="w-10 h-10 rounded-full bg-indigo-500 text-white flex items-center justify-center font-bold">
                  {post.bidders[0].user?.firstName?.[0]?.toUpperCase() || "L"}
                </div>
              )}
              <p className="text-md text-gray-200 ">WON AMOUNT :<span className="font-bold"> ₹ {post.bidders[0].amount}</span> </p>
              <p>Name : {post.bidders[0].user?.firstName}</p>
              <p>Email : {post.bidders[0].user?.email}</p>
            </div>
            </div>
          </>
        ),
      },
      {
        header: "Title of The Auction",
        render: (post: Tauction) => <p>{post?.title?.toUpperCase()}</p>,
      },
      {
        header: "Active Participants",
        render: (item: Tauction) => (
          <div className="">
            <div className="flex gap-2">
              <Users size={20} />
              <p>{item?.bidders?.length} Members</p>
            </div>
          </div>
        ),
      },
      {
        header: "Created Time",
        render: (post: Tauction) => (
          <p>{moment(post?.startTime).format("LLLL")}</p>
        ),
      },
      {
        header: "End Time",
        render: (post: Tauction) => {
          if (post?.auctionType == "Scheduled")
            return (
              <p className="text-red-800">
                {moment(post?.endTime).format("LLLL")}
              </p>
            );
          else if (post?.auctionType == "Live" && !post?.isActive)
            return (
              <p className="text-red-800">
                {moment(post?.endTime).format("LLLL")}
              </p>
            );
          else
            return (
              <p className="text-yellow-700 animate-pulse">
                Will End while Close the Deal
              </p>
            );
        },
      },
      {
        header: "Fianl Bid Amount ",
        render: (post: Tauction) =>{ 
        if(!post.isActive)return<p > This Auction is Finalized for ₹<span className="text-indigo-400">{post?.baseAmount}</span></p>
        else return <p>Last Rised Bid ₹{post.baseAmount}</p>  
        },
      },
    ],
    [data]
  );
  return (
    <div className={`flex-1 flex flex-col items-center justify-start p-5 ${theme=='dark'?'bg-[#1a191996]':'bg-gray-100'} m-4 rounded-3xl shadow-inner`}>
      <h1 className={`text-3xl font-semibold ${theme=='dark'?'text-zinc-300':'text-indigo-900'}  mb-4`}>
        Committed Bids
      </h1>
      <div className="w-[95%] min-h-44 rounded-3xl flex flex-col px-3">
        {isLoading ? (
          <Loader />
        ) : (
          <DataTable
            columns={Columns}
            data={data?.committedBids}
            itemsPerPage={8}
          />
        )}
      </div>
    </div>
  );
};

export default MyBids;
