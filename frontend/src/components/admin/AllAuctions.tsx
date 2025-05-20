import { useRQ } from "@/hooks/userRQ";
import { listByType } from "@/service/Api/adminApi";
import { Iuser, Tauction, Tproduct } from "@/types/types";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import { Calendar, CalendarClock, Phone, Radio, Users } from "lucide-react";
import moment from "moment";
import  { useMemo } from "react";
import { useParams } from "react-router-dom";
import DataTable from "../global/dataTable";
import Loader from "../global/Loader";
import { PostModal } from "../global/PostModal";

const AllAuctions = () => {
  const { child } = useParams();
  const auctionType =
    child === "Live" || child === "Scheduled" ? child : "Live";

  const { isLoading, data } = useRQ(
    async () => await listByType(auctionType),
    auctionType
  );
  const Columns = useMemo(
    () => [
      {
        header: "No",
        render: (_auction: Tauction, i: number) => `LBANO ${i + 101}`,
      },
      {
        key: "title",
        header: "Title",
        render: (auction: Tauction) => (
          <div className="flex items-center  gap-2">
            <Avatar className="h-8 w-8 border rounded-full ">
              <AvatarImage
                src={(auction.post as Tproduct).images[0]}
                alt={auction.title}
                className="object-cover w-8 h-8 rounded-full"
              />
            </Avatar>
            <span className="items-center">{auction.title}</span>
          </div>
        ),
      },
      {
        header: "Participents",
        render: (auction: Tauction) => (
          <p className="flex gap-2 text-center">
            <Users />
            {auction?.bidders?.length}
          </p>
        ),
      },

      {
        header: "Auction Type",
        render: (item: Tauction) => (
          <span>
            {item.auctionType == "Live" ? (
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
        key: "createdAt",
        header: "Hosted",
        render: (auction: Tauction) => moment(auction.startTime).format("L"),
      },
      {
        key: "isActive",
        header: "Status",
        render: (auction: Tauction) => (
          <span
            className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${
              auction.isActive ? "text-green-700" : "text-red-700"
            }`}
          >
            {auction.isActive ? "on-Air" : "Closed"}
          </span>
        ),
      },
      {
        header: "Details",
        render: (auction: Tauction) => (
          <PostModal
            data={auction}
            key={auction._id}
            images={(auction?.post as Tproduct).images}
            sideContent={sideContent}
          />
        ),
      },
    ],
    [data]
  );
  const sideContent = useMemo(
    () => [
      {
        header: "Organizer :",
        render: (auction: Tauction) => (
          <div className="flex gap-5">
            <Avatar className="w-8 h-8">
              <AvatarImage
                src={(auction.seller as Iuser).profile}
                alt={(auction.seller as Iuser).firstName}
                className="object-cover w-8 h-8 rounded-full"
              />
            </Avatar>
            <h3 className="text-lg font-thin">{(auction.seller as Iuser).firstName}</h3>
            <h3 className="text-lg font-thin flex gap-1"><Phone className="mt-1.5" size={17}/>+91 {(auction.seller as Iuser).phone}</h3>
          </div>
        ),
      },
      {
        header: "Title of The Auction",
        render: (post: Tauction) => <p className="font-thin text-gray-300">{post.title.toUpperCase()}</p>,
      },
      {
        header: "Active Participants",
        render: (item: Tauction) => (
          <div className="font-thin">
            <div className="flex gap-2">
              <Users size={20} />
              <p >{item.bidders.length} Members</p>
            </div>
          </div>
        ),
      },
      {
        header: "Auction Type",
        render: (item: Tauction) => (
          <span>
            {item.auctionType == "Live" ? (
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
        header: "Created Time",
        render: (post: Tauction) => (
          <p className="font-thin">{moment(post.startTime).format("LLLL")}</p>
        ),
      },
      {
        header: "End Time",
        render: (post: Tauction) => {
          if (post.auctionType == "Scheduled")
            return <p>{moment(post.endTime).format("LLLL")}</p>;
          else return <p className="font-thin">Will End while Close the Deal</p>;
        },
      },
      {
        header: "Fianl Bid Amount ",
        render: (post: Tauction) => (
          <p className="text-orange-200"> ₹ {post.baseAmount}</p>
        ),
      },
    ],
    [data]
  );
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="container m mx-auto px-4 py-4">
          <div className="flex justify-center items-center mb-5">
            <h1 className="text-2xl font-bold flex items-center gap-2">
              {child == "Live" ? (
                <>
                  <Radio />
                  Live Auctions
                </>
              ) : (
                <>
                  <Calendar />
                  Scheduled Auction
                </>
              )}
            </h1>
          </div>
          <DataTable data={data} columns={Columns} />
        </div>
      )}
    </>
  );
};

export default AllAuctions;
