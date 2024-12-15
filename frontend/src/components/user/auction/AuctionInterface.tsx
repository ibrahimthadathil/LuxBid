import { useState } from "react"
import { Avatar } from "@/components/ui/avatar"
import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/input"
import { Hammer, Timer, Users, Check, HandshakeIcon as HandShake, ArrowLeft } from 'lucide-react'

interface Bid {
  user: string
  amount: number
  time: string
}

interface AuctionInterfaceProps {
  userType: 'bidder' | 'organizer'
}

const AuctionInterface=({ userType }: AuctionInterfaceProps)=> {
  const [currentBid, setCurrentBid] = useState(17564)
  const [currentBidder, setCurrentBidder] = useState("John")
  const [bidAmount, setBidAmount] = useState("")
  
  const bids: Bid[] = [
    { user: "John", amount: 3000, time: "22:10" },
    { user: "Alice", amount: 2800, time: "22:05" },
    { user: "Bob", amount: 2600, time: "21:55" },
    { user: "Rahul G", amount: 2300, time: "23:14" },
    { user: "Sanjal P", amount: 2700, time: "22:38" },
  ]

  const handleBid = () => {
    if (bidAmount) {
      setCurrentBid(parseInt(bidAmount))
      setCurrentBidder("You") // Assuming the current user is bidding
      setBidAmount("")
    }
  }

  const handleAccept = (bidder: string, amount: number) => {
    setCurrentBid(amount)
    setCurrentBidder(bidder)
    console.log(`Accepted bid from ${bidder} for ₹${amount}`)
    // Add logic to handle bid acceptance
  }

  const handleDeal = () => {
    console.log("Deal finalized with", currentBidder, "for ₹", currentBid)
    // Add logic to finalize the deal
  }

  const renderBidder = (bidder: Bid, size: 'sm' | 'md' | 'lg') => {
    const avatarSizes = {
      sm: 'w-16 h-16',
      md: 'w-20 h-20',
      lg: 'w-24 h-24'
    }
    const textSizes = {
      sm: 'text-xs',
      md: 'text-sm',
      lg: 'text-base'
    }

    return (
      <div className={`flex flex-col items-center ${size === 'lg' ? 'mx-4' : 'mx-2'}`}>
        <Avatar className={`${avatarSizes[size]} mb-2`}>
          <img
            src={`https://api.dicebear.com/6.x/initials/svg?seed=${bidder.user}`}
            alt={`${bidder.user}'s avatar`}
            className="object-cover"
          />
        </Avatar>
        <div className="text-center">
          <h2 className={`${textSizes[size]} font-semibold text-amber-500`}>{bidder.user}</h2>
          <div className="flex items-center justify-center gap-1 mt-1">
            <Hammer className={`${size === 'sm' ? 'w-2 h-2' : 'w-3 h-3'}`} />
            <span className={textSizes[size]}>₹{bidder.amount}</span>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full  text-white p-10">
        <button
          className="mb-6 rounded-full w-12 h-12 flex items-center justify-center border hover:bg-indigo-950 hover:text-white text-indigo-400"
          onClick={() => ''}
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
      <div className="max-w-3xl mx-auto bg-slate-900/50 rounded-3xl border border-slate-700/50 p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-xl font-light text-amber-500">Jatayu vadham By RR</h1>
            <div className="flex items-center gap-4 text-sm text-slate-400 mt-2">
              <div className="flex items-center gap-1">
                <Users className="w-4 h-4" />
                <span>11.5k</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2 text-slate-400">
            <Timer className="w-4 h-4" />
            <span>3 hr 20 minutes</span>
          </div>
        </div>

        {/* Top 3 Bidders */}
        <div className="flex justify-center items-end mb-6">
          {renderBidder(bids[1], 'sm')}
          {renderBidder(bids[0], 'lg')}
          {renderBidder(bids[2], 'sm')}
        </div>

        {/* Current Bid Display */}
        <div className="text-center mb-8">
          <div className="inline-block bg-slate-800/50 rounded-full px-6 py-2 border border-slate-700">
            <div className="flex items-center gap-2">
              <Hammer className="w-4 h-4" />
              <span className="text-sm font-semibold">Current Bid: ₹{currentBid}</span>
            </div>
          </div>
        </div>

        {/* Bids List */}
        <div className="space-y-3 mb-6">
          {bids.map((bid, index) => (
            <div
              key={index}
              className="flex items-center justify-between bg-slate-800/30 rounded-full px-4 py-2"
            >
              <div className="flex items-center gap-2">
                <Avatar className="w-6 h-6 bg-slate-700">
                  <span className="text-xs">{bid.user[0]}</span>
                </Avatar>
                <span className="text-sm text-slate-300">{bid.user}</span>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-sm">₹{bid.amount}</span>
                <span className="text-xs text-slate-500">{bid.time}</span>
                {userType=='organizer'&&<Button
                  size="sm"
                  variant="outline"
                  className="rounded-full text-green-400 border-green-400 hover:bg-green-400/20"
                  onClick={() => handleAccept(bid.user, bid.amount)}
                  
                >
                  <Check className="w-4 h-4 mr-1" />
                  Accept
                </Button>}
              </div>
            </div>
          ))}
        </div>

        {/* Bidding Area or Deal Button */}
        {userType === 'bidder' ? (
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
              onClick={handleBid}
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
  )
}
export default AuctionInterface
