import { Button } from "@/components/ui/Button";
import { useState } from "react";
import { FaPlusCircle } from "react-icons/fa";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/hooks/useAuth";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { AuctionModal } from "@/components/global/AuctionModal";

const Auction = () => {
  useAuth();
  // const [filter, setFilter] = useState("approved");
  return (
    <div className="flex-1 flex flex-col  p-5 bg-[#1a191996]  m-4  rounded-3xl shadow-inner ">
      <h1 className="text-2xl font-semibold mb-4 text-gray-200 ps-1">
        Create Auction
      </h1>
      <div className="flex flex-col items-center h-full">
        {/* {create post box} */}
        <div className="w-[95%] h-[8.4rem] border-2 border-dashed rounded-xl border-[#5b4baeaf]">
          <div className="flex h-full">
            <div className="w-[70%] h-full flex justify-center items-center text-[#cbcacf] text-xl">
              <h5 className="font-light">
                Click the Button
                <span className="text-[#7664cf]"> "Create Auction!"</span> To
                create an auction,
                <br />
                Rise to the challenge, claim what’s yours.
              </h5>
            </div>
            <div className="w-[30%] flex justify-center flex-1 items-center">
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="py-3 px-8 rounded-lg border border-[#5b4bae] flex gap-2 text-white bg-transparent hover:bg-[#5b4bae]">
                    <FaPlusCircle /> Create Auction
                  </Button>
                </DialogTrigger>
                <DialogContent  className="max-w-2xl w-full max-h-[80vh] overflow-y-auto p-4 sm:p-6">
                 <AuctionModal/>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>
        {/* {table display part} */}
        <div className="h-14 min-h-5  w-[95%] flex justify-between items-center px-3">
          <p className="text-">Created Auctions</p>
          {/* <Tabs value={filter} onValueChange={setFilter} className="w-[200px]">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="approved">Approved</TabsTrigger>
              <TabsTrigger value="pending">Pending</TabsTrigger>
            </TabsList>
          </Tabs> */}
        </div>
      </div>
    </div>
  );
};

export default Auction;
