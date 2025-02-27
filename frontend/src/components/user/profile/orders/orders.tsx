import DataTable from "@/components/global/dataTable"
import Loader from "@/components/global/Loader"
import { PostModal } from "@/components/global/PostModal"
import { useTheme } from "@/components/theme/theme-provider"
import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/Button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { useRQ } from "@/hooks/userRQ"
import { Rootstate } from "@/redux/store/store"
import { addSellerRating, fetchAllOrders } from "@/service/Api/orderApi"
import { TAddress, Tauction, TOrder, Tproduct } from "@/types/types"
import { Star } from "lucide-react"
import moment from "moment"
import { useMemo, useState } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

const OrdersStatus = () => {
  const {isLoading,data} = useRQ(fetchAllOrders,'orders')
  const organizer =useSelector((state:Rootstate)=>state.user.role) 
  const {theme}=useTheme()
  const navigate = useNavigate()
  const handleRating =async(orderId:string,rating:number)=>{
    try {
      const data = await addSellerRating(orderId,rating)
    } catch (error) {
      
    } 
  }
  const getStatusColor =(status:string)=>{
    switch (status) {
      case "Shipped":
        return "bg-green-300 hover:bg-green-500"
      case "Delivered":
        return "bg-green-500 hover:bg-green-600"
      case "Pending":
        return "bg-yellow-500 hover:bg-yellow-600"
      case "Canceled":
        return "bg-red-500 hover:bg-red-600"
      default:
        return "bg-gray-500 hover:bg-gray-600"
    }
  }
  const columns = useMemo(() => [
    {
      header: "No",
        render: (_item: any, i: number) => `LBO 00${i + 1}`,
    },
    {
      header: "Auction",
      render: (auction: any) => (
        <div className="flex items-center justify-center gap-2">
          <Avatar className="h-8 w-8 border rounded-full ">
            <AvatarImage
              src={auction?.auction?.post?.images[0]}
              alt={auction?.auction?.title}
              className="object-cover w-8 h-8 rounded-full"
            />
          </Avatar>
          <span>{auction?.auction?.title}</span>
        </div>
      ),
    },
    {
      header:'Order Amount',
      render:(order:TOrder)=>(
        <p>$ {order?.orderAmt}</p>
      )
    },
    {
      header:'Order Status',
      render:(order:TOrder)=>(
        <Badge  className={getStatusColor(order.orderStatus)}>{order?.orderStatus}</Badge>
      )
    },
    {
      header:'Order Details',
      render :(order:TOrder)=>(
        <PostModal
        data={order}
        images={((order?.auction as Tauction). post as Tproduct).images}
        sideContent={viewContent}
        />
      )
    },
    {
      header:'Review',
      render:(order:TOrder)=>{
        const [rating, setRating] = useState(0);
        const [hover, setHover] = useState(0);
      return(  <Dialog>
        <DialogTrigger asChild>
          <Button disabled={order.orderStatus !== "Delivered"}>Rate Organizer</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Review</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col items-center space-y-4">
            <p>How would you rate your experience?</p>
            <div className="flex">
              {[...Array(5)].map((_, index) => {
                const ratingValue = index + 1
                return (
                  <Star
                    key={index}
                    className={`h-8 w-8 cursor-pointer ${
                      ratingValue <= (hover || rating) ? "text-yellow-400" : "text-gray-300"
                    }`}
                    onClick={() => setRating(ratingValue)}
                    onMouseEnter={() => setHover(ratingValue)}
                    onMouseLeave={() => setHover(0)}
                    fill={ratingValue <= (hover || rating) ? "currentColor" : "none"}
                  />
                )
              })}
            </div>
            <Button onClick={() => handleRating(order._id,rating)}>Submit Rating</Button>
          </div>
        </DialogContent>
      </Dialog>
       
      )
    }}

  ],[data])

  const viewContent = useMemo(()=>[
    
    {
      header: "Order Payment Status",
      render: (post: TOrder) => <Badge>{post?.paymentStatus}</Badge>,
    },
    {
      header:'Order Date',
      render:(post:TOrder)=>(
        <p>{moment(post.createdAt).format('LLLL')}</p>
      )
    },
    {
      header:'Shipping Address',
      render:(order:TOrder)=>(
        <>
        <p>House No : {(order.shippingAddress as TAddress).propertyName}</p>
        <p>street : {(order.shippingAddress as TAddress).street}</p>
        <p>city : {(order.shippingAddress as TAddress).city}</p>
        <p>state : {(order.shippingAddress as TAddress).state}</p>
        <p>Pincode : {(order.shippingAddress as TAddress).pincode}</p>
        </>
      )
    },
    
  ],[data])
  return (
    <div className="w-full max-h-full h-full overflow-y-auto flex flex-col gap-3  p-2">
    <h1 className={`text-2xl text-center font-bold mb-4 ${theme=='dark'? 'text-gray-200':'text-indigo-900'} `}>
         Orders
        </h1>
        {organizer=='Seller'&&<Button variant={"outline"} onClick={()=>navigate('/user/orders/dispatch')}>Dispatch Orders</Button>}
        {isLoading ? <Loader/> :<>
        <DataTable data={data} columns={columns} key={data}  />
        </>}
    </div>
  )
}

export default OrdersStatus
