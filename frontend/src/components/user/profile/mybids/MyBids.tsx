import DataTable from "@/components/global/dataTable"
import Loader from "@/components/global/Loader"
import { PostModal } from "@/components/global/PostModal"
import { useRQ } from "@/hooks/userRQ"
import { showCommittedBids } from "@/service/Api/buyerApi"
import { Tauction, Tbuyer, Tproduct } from "@/types/types"
import { Avatar, AvatarImage } from "@radix-ui/react-avatar"
import { CalendarClock, Radio, Users } from "lucide-react"
import moment from "moment"
import { useMemo } from "react"

const MyBids = () => {
  const {data,isLoading}=useRQ(showCommittedBids,'mybids')
console.log(data,'oo');


    const Columns =useMemo(()=>[
      {
        header:'No',
        render:(item:Tbuyer,i:number)=>`LBMB 00${i+1}`
      },
      {
        header:'Auction Title',
        render:(auction:any)=>(
      
          
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
        )
      },
      {
        header:'Auction Type',
        render:(auction:any)=>(<p>{auction?.auction?.auctionType}</p>)
      },
      {
        header:'Auction Status',
        render:(auction:any)=>(
          <span
          className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${
            auction?.auction?.isActive ? "text-green-700" :"text-red-700"}`}
        >
          {auction?.auction?.isActive ? 'Active':'Closed'}
        </span>)
      },
      {
        header:'Details',
        render:(auction:any)=>(
          <PostModal images={(auction?.auction?.post as Tproduct)?.images} sideContent={viewContent} key={auction._id} data={auction.auction} />
        )
      }
    ],[data])

    const viewContent = useMemo(()=>[
      {
        header:'Title of The Auction',
        render :(post:Tauction)=>(
          <p>{post?.title?.toUpperCase()}</p>
        )
      },
      {
        header:'Active Participants',
        render :(item:Tauction)=>(
          <div className="">
            <div className="flex gap-2"><Users size={20}/><p>{item?.bidders?.length} Members</p></div>
          </div>
        )
      },
      {
        header:'Auction Type',
        render:(item:Tauction)=>(
          <span>{item?.auctionType =='Live' ? <div className="flex gap-2"><Radio size={20}/><p>Live</p></div> : <div className="flex gap-2"><CalendarClock size={20}/><p>Scheduled</p></div>}</span>
        )
      },
      {
        header:'Created Time',
        render:(post:Tauction)=>(
            <p>{moment(post?.startTime).format('LLLL')}</p>
        )
      },
      {
        header:'End Time',
        render:(post:Tauction)=>{
          if(post?.auctionType=='Scheduled')return <p>{moment(post?.endTime).format('LLLL')}</p>
          else return <p>Will End while Close the Deal</p>
        }
      },
      {
        header:'Fianl Bid Amount ',
        render:(post:Tauction)=>(
          <p className="text-orange-200"> ₹ {post?.baseAmount}</p>
      )
      }
    ],[data])
  return (
    <div className="flex-1 flex flex-col items-center justify-start p-5 bg-[#1a191996] m-4 rounded-3xl shadow-inner">
  <h1 className="text-3xl font-semibold text-zinc-300 mb-4">Committed Bids</h1>
  <div className="w-[95%] min-h-44 rounded-3xl flex flex-col px-3">
    {isLoading ? <Loader /> : <DataTable columns={Columns} data={data?.committedBids} itemsPerPage={8} />}
  </div>
</div>

  )
}

export default MyBids
