import { Button } from "@/components/ui/Button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { FaPlusCircle } from "react-icons/fa";
import { useAuth } from "@/hooks/useAuth";
import AuctionModal from "@/components/global/AuctionModal";
import DataTable from "@/components/global/dataTable";
import { useRQ } from "@/hooks/userRQ";
import { changeActionStatus, deleteAuction, fetchAuction } from "@/service/Api/auctionApi";
import { useMemo } from "react";
import { Tauction, Tproduct } from "@/types/types";
import { Avatar } from "@radix-ui/react-avatar";
import { AvatarImage } from "@/components/ui/avatar";
import Loader from "@/components/global/Loader";
import { Radio, Users } from 'lucide-react';
import { CalendarClock } from 'lucide-react';
import moment from "moment";
import { PostModal } from "@/components/global/PostModal";
import AlertModal from "@/components/global/AlertModal";
import useActionHook from "@/hooks/actionHook";
import { useTheme } from "@/components/theme/theme-provider";


const ListAuction = () => {
  useAuth();
  const {data,isLoading} = useRQ(fetchAuction,'auction')
  const {theme} = useTheme()
  const {handler}=useActionHook()
  const closeAuction =async(id:string)=>{
    await handler(changeActionStatus,id,'auction')
  }
  const deletDeal =async(id:string)=>{
    await handler(deleteAuction,id,'auction')
  }
  const Columns = useMemo(()=>[
    {
    header:'No',render:(item:Tauction,i:number)=>`LBA 00${i+1}`
    },
    {
      key:'title',
      header:'Title',
      render :(item:Tauction)=>(
        <div className="flex items-center gap-2">
        <Avatar className="h-8 w-8 border rounded-full ">
          <AvatarImage 
            src={(item.post as Tproduct).images[0]} 
            alt={item.title} 
            className="object-cover w-8 h-8 rounded-full" 
          />
          </Avatar>
          <span>{item.title}</span>
          </div>)
    },
    {
      header:'Base Amount',
      key:'baseAmount'
    },
    {
      header:'Status',
      render:(item:Tauction)=>(
        <span
          className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${
            item.isActive ? "text-green-700" :"text-red-700"}`}
        >
          {item.isActive ? 'Active':'Closed'}
        </span>
      )
    },
    {
      header:'Auction Type',
      render:(item:Tauction)=>(
        <span>{item.auctionType =='Live' ? <div className="flex gap-2"><Radio size={20}/><p>Live</p></div> : <div className="flex gap-2"><CalendarClock size={20}/><p>Scheduled</p></div>}</span>
      )
    },
    {
      header:'Launch Date',
      render:(item:Tauction)=>{
        const time = moment(item.startTime).format('L')
        return <p>{time}</p>
      }
    },
    {
      header:'Launch Time',
      render:(item:Tauction)=>{
        const time = moment(item.startTime).format('LT')
        return <p>{time}</p>
      }
    },
    
    {
      header:'Details',
      render:(item:Tauction)=>(
        <PostModal data={item} images={(item.post as Tproduct).images} sideContent={viewContent} />
      )
    }

    
  ],[data])
  const viewContent = useMemo(()=>[
    {
      header:'Title of The Auction',
      render :(post:Tauction)=>(
        <p>{post.title.toUpperCase()}</p>
      )
    },
    {
      header:'Active Participants',
      render :(item:Tauction)=>(
        <div className="">
          <div className="flex gap-2"><Users size={20}/><p>{item.bidders.length} Members</p></div>
        </div>
      )
    },
    {
      header:'Auction Type',
      render:(item:Tauction)=>(
        <span>{item.auctionType =='Live' ? <div className="flex gap-2"><Radio size={20}/><p>Live</p></div> : <div className="flex gap-2"><CalendarClock size={20}/><p>Scheduled</p></div>}</span>
      )
    },
    {
      header:'Created Time',
      render:(post:Tauction)=>(
          <p>{moment(post.startTime).format('LLLL')}</p>
      )
    },
    {
      header:'End Time',
      render:(post:Tauction)=>{
        if(post.auctionType=='Scheduled')return <p>{moment(post.endTime).format('LLLL')}</p>
        else return <p>Will End while Close the Deal</p>
      }
    },
    {
      header:'Actions',
      render:(post:Tauction)=>(
        <>
        <div className="flex gap-2">
          {post.isActive ? <AlertModal contents={['Close Deal','Are You sure to close this Deal ?']} style="bg-yellow-600 text-white" data={post} action={closeAuction}/>
            : <></>}
          <AlertModal contents={['Delete','Are You sure to Delete this Deal,Ensure The deal is closed before Delete..! ?']} style="bg-red-900 text-white" data={post} action={deletDeal}/>
          {!post.isActive && <div className="text-red-500 items-center flex border border-red-800 rounded-xl p-2">*Deal is closed</div>}
        </div>
        </>
      )
    },
  ],[data])
  return (
    <div className={`flex-1 flex flex-col p-5 ${theme=='dark'?'bg-[#1a191996]':'bg-gray-100'} m-4 rounded-3xl shadow-inner`}>
      <h1 className={`text-2xl font-semibold mb-4 ${theme=='dark'?'text-gray-200':'text-indigo-900'}  ps-1`}>
        Create Auction
      </h1>
      <div className="flex flex-col  h-full">
        <div className="w-[95%] h-[8.4rem] border-2 border-dashed rounded-xl border-[#5b4baeaf]">
          <div className="flex h-full">
            <div className={`w-[70%] h-full flex justify-center items-center ${theme=='dark'?'text-[#cbcacf]':'text-black'} text-xl`}>
              <h5 className="font-light">
                Click the Button
                <span className="text-[#7664cf]"> "Create Auction!"</span> To
                create an auction,
                <br />
                Rise to the challenge, claim what's yours.
              </h5>
            </div>
            <div className="w-[30%] flex justify-center flex-1 items-center">
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="py-3 px-8 rounded-lg border border-[#5b4bae] flex gap-2 text-white bg-indigo-800 hover:bg-[#5b4bae]">
                    <FaPlusCircle /> Create Auction
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl w-full max-h-[80vh] overflow-y-auto p-4 sm:p-6">
                  <AuctionModal />
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>
        <div className="h-14 min-h-5 w-[95%] flex justify-between items-center px-3">
          <p>Created Auctions</p>
        </div>
        {isLoading ? <Loader/>:<DataTable columns={Columns} data={data} itemsPerPage={3}/>}
      </div>
      
    </div>
  );
};

export default ListAuction;