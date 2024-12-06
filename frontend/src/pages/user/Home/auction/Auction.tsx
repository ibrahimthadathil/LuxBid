import { Button } from "@/components/ui/Button";
import { useMemo, useState } from "react";
import { FaPlusCircle } from "react-icons/fa";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/hooks/useAuth";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { AuctionModal } from "@/components/global/AuctionModal";
import Loader from "@/components/global/Loader";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tproduct } from "@/types/types";
import { Card, CardContent } from "@/components/ui/card";
import { useRQ } from "@/hooks/userRQ";
import { fetchApprovedPost } from "@/service/Api/productApi";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useForm } from "react-hook-form";

const Auction = () => {
  useAuth();
const {isLoading,data}=useRQ(fetchApprovedPost,'post')
const {register,formState:{errors}}=useForm()


const Content = useMemo(()=>[
{
  render:()=>(
      <div className="w-full sm:w-2/5">
        <h3 className="text-base font-semibold mb-2">Choose Post Type</h3>
        {isLoading?<Loader/>:<ScrollArea className="h-[280px] w-full ">
          <div className="space-y-2 pr-2">
            
            { data?.length?(data as Tproduct[]).map((post) => (
              <Card
                // key={post._id} 
                // className={`cursor-pointer transition-all ${
                //   selectedOption === post._id ? 'ring-2 ring-primary' : ''
                // }`}
                // onClick={() => setSelectedOption(post._id)}
              >
                <CardContent className="p-2 flex items-center space-x-3">
                  <img
                    src={post.images[0]}
                    alt={post.title}
                    width={80}
                    height={80}
                    className="rounded-md"
                  />
                  <h4 className="font-medium text-sm">{post.title}</h4>
                </CardContent>
              </Card>
            )):<p className='text-red-500 self-center'>No Approved Post</p>}
          </div>
        </ScrollArea>}
      </div> 
  )
},{
  render:()=>(
    <div className="w-full sm:w-3/5">
        <h3 className="text-base font-semibold mb-2">Auction Details</h3>
        <form className="space-y-3">
          <div>
            <Label htmlFor="title" className="text-sm">Title</Label>
            <Input
              id="title"
              // value={title}
              // onChange={(e) => setTitle(e.target.value)}
              required
              className="h-8 text-sm"
            />
          </div>
          <div>
            <Label htmlFor="description" className="text-sm">Description</Label>
            <Textarea
              id="description"
              // value={description}
              // onChange={(e) => setDescription(e.target.value)}
              required
              className="h-20 text-sm"
            />
          </div>
          <div>
            <Label htmlFor="baseAmount" className="text-sm">Base Amount</Label>
            <Input
              id="baseAmount"
              type="number"
              // value={baseAmount}
              // onChange={(e) => setBaseAmount(e.target.value)}
              required
              className="h-8 text-sm"
            />
          </div>
          <div>
            <Label className="text-sm">Status</Label>
            <RadioGroup 
            // value={status} onValueChange={setStatus}
             className="flex space-x-2">
              <div className="flex items-center space-x-1">
                <RadioGroupItem value="live" id="live" />
                <Label htmlFor="live" className="text-sm">Live</Label>
              </div>
              <div className="flex items-center space-x-1">
                <RadioGroupItem value="scheduled" id="scheduled" />
                <Label htmlFor="scheduled" className="text-sm">Scheduled</Label>
              </div>
            </RadioGroup>
          </div>
          <Button type="submit" className="w-full h-8 text-sm">Host Auction</Button>
        </form>
      </div> 
  )
}
]
,[data])
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
                 <AuctionModal node={Content}/>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>
        {/* {table display part} */}
        <div className="h-14 min-h-5  w-[95%] flex justify-between items-center px-3">
          <p className="text-">Created Auctions</p>
        </div>
      </div>
    </div>
  );
};

export default Auction;
