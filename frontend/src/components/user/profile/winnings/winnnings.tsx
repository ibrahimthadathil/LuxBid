import { useTheme } from "@/components/theme/theme-provider";
import Address from "./address/address";
import { getWonAuction } from "@/service/Api/userApi";
import { useRQ } from "@/hooks/userRQ";
import DataTable from "@/components/global/dataTable";
import { useMemo, useState } from "react";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { CalendarClock, CreditCard, Radio, User2 } from "lucide-react";
import { PostModal } from "@/components/global/PostModal";
import { TAddress, Tauction, Tproduct } from "@/types/types";
import moment from "moment";
import { Button } from "@/components/ui/Button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useSelector } from "react-redux";
import { Rootstate } from "@/redux/store/store";

const Winnnings = () => {
  const { theme } = useTheme();
  const { isLoading, data } = useRQ(getWonAuction, "winnings");
  const address = useSelector((root:Rootstate)=>root.user.address)
  console.log('### from winnings',address);
  const navigate = useNavigate();
  const cardPaymendHandle = async (auction: Tauction) => {
    try {
      
      if(!address)toast.error('Choose address')
      if (auction&&address)
        navigate("/payment", {
          state: {
            price: auction?.baseAmount,
            img: (auction.post as any)[0]?.images[0],
            title: auction?.title,
            id:auction._id,
            address,
            placeOrder:true
          },
        });
    } catch (error) {
      console.log((error as Error).message);
    }
  };
  const columns = useMemo(
    () => [
      {
        header: "No",
        render: (_item: any, i: number) => `LBA 00${i + 1}`,
      },
      {
        header: "Auction",
        render: (auction: any) => (
          <div className="flex items-center gap-2">
            <Avatar className="h-8 w-8 border rounded-full ">
              <AvatarImage
                src={auction?.auction?.post[0]?.images[0]}
                alt={auction?.auction?.title}
                className="object-cover w-8 h-8 rounded-full"
              />
            </Avatar>
            <span>{auction?.auction?.title}</span>
          </div>
        ),
      },
      {
        header: "Auction Type",
        render: (auction: any) => (
          <div className="flex justify-center items-center">
            {auction?.auction?.auctionType == "Live" ? (
              <div className="flex gap-2 items-center">
                <Radio size={20} />
                <p>Live</p>
              </div>
            ) : (
              <div className="flex gap-2 items-center">
                <CalendarClock size={20} />
                <p>Scheduled</p>
              </div>
            )}
          </div>
        ),
      },
      {
        header: "Total Participents",
        render: (auction: any) => (
          <div className="flex justify-center gap-2">
            <User2 size="20" />
            <p>{auction?.auction?.bidders?.length}</p>
          </div>
        ),
      },
      {
        header: "Details",
        render: (content: any) => (
          <PostModal
            data={content?.auction}
            images={(content?.auction?.post[0] as Tproduct).images}
            sideContent={viewContent}
          />
        ),
      },
      {
        header: "Order Payment",
        render: (content: any) => (
          <>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline"> Pay </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px] bg-black text-white border-zinc-800">
                <DialogHeader>
                  <DialogTitle className="text-sm font-normal">
                    Auction ID : #0898LB012
                  </DialogTitle>
                  <Button
                    variant="ghost"
                    className="h-6 w-6 p-0 text-white"
                    onClick={() => document.querySelector("dialog")?.close()}
                  >
                    {/* Close Icon (e.g., X mark) */}
                  </Button>
                </DialogHeader>
                <div className="space-y-6">
                  <div className="relative h-48 w-full overflow-hidden rounded-lg">
                    <img
                      src={content?.auction?.post[0]?.images[0]}
                      alt="Auction Item"
                      className="object-cover w-full h-full"
                    />
                  </div>

                  <div className="space-y-4">
                    <h4 className="text-sm font-medium leading-none">
                      Payment:
                    </h4>
                    <Button
                      variant="outline"
                      className="w-full bg-transparent border-zinc-700 text-white hover:bg-zinc-800 hover:text-white rounded-lg py-2"
                      onClick={() => cardPaymendHandle(content?.auction)}
                    >
                      <CreditCard className="mr-2 h-4 w-4" />
                      Pay ₹ {content?.auction?.baseAmount}
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </>
        ),
      },
    ],
    [data,address]
  );

  const viewContent = useMemo(
    () => [
      {
        header: "Title of The Auction",
        render: (post: Tauction) => <p>{post?.title.toUpperCase()}</p>,
      },
      {
        header: "Entry Fee",
        render: (post: Tauction) => <p> $ {post?.baseAmount}</p>,
      },
      {
        header: "Description",
        render: (post: Tauction) => <p>{post?.description}</p>,
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
            return <p>{moment(post?.endTime).format("LLLL")}</p>;
          else return <p>Will End while Close the Deal</p>;
        },
      },
    ],
    [data]
  );
  console.log('from winnings',address);
  
  return (
    <div className="w-full max-h-full h-full overflow-y-auto flex flex-col gap-3  p-2">
      
      <div
        className={` min-h-[220px] shadow-inner rounded-lg ${
          theme == "dark" ? "" : "bg-gray-100"
        }`}
      >
        
        <Address />
      </div>
      <h1 className="text-center font-bold text-2xl text-indigo-900">
        {" "}
        Winnings
      </h1>
      <div
        className={`${
          theme == "dark" ? "" : "bg-gray-100"
        } p-10 h-full rounded-t-lg max-h-[159px] overflow-y-scroll scrollbar-hide ${
          theme == "dark" ? "" : "bg-gray-100"
        }`}
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {!isLoading && <DataTable data={data ? data : []} columns={columns} />}
      </div>
    </div>
  );
};

export default Winnnings;
