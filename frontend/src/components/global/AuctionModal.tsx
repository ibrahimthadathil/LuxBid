import React, { useState } from 'react'
import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Card, CardContent } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { fetchApprovedPost } from '@/service/Api/productApi'
import { useRQ } from '@/hooks/userRQ'
import { Tproduct } from '@/types/types'
import Loader from './Loader'


interface PostOption {
  id: string
  title: string
  image: string
}

const postOptions: PostOption[] = [
  { id: 'option1', title: 'Regular Post', image: '/placeholder.svg?height=80&width=80' },
  { id: 'option2', title: 'Featured Post', image: '/placeholder.svg?height=80&width=80' },
  { id: 'option3', title: 'Premium Post', image: '/placeholder.svg?height=80&width=80' },
  { id: 'option4', title: 'Sponsored Post', image: '/placeholder.svg?height=80&width=80' },
  { id: 'option5', title: 'Event Post', image: '/placeholder.svg?height=80&width=80' },
]

export function AuctionModal() {
const {isLoading,data}=useRQ(fetchApprovedPost,'post')

  const [selectedOption, setSelectedOption] = useState<string | null>(null)
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [baseAmount, setBaseAmount] = useState('')
  const [status, setStatus] = useState('live')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log({ selectedOption, title, description, baseAmount, status })
  }

  return (
    <div className="flex flex-col sm:flex-row gap-4">
      {/* Left side - Post options */}
      <div className="w-full sm:w-2/5">
        <h3 className="text-base font-semibold mb-2">Choose Post Type</h3>
        {isLoading?<Loader/>:<ScrollArea className="h-[280px] w-full ">
          <div className="space-y-2 pr-2">
            
            { data?.length?(data as Tproduct[]).map((post) => (
              <Card 
                key={post._id} 
                className={`cursor-pointer transition-all ${
                  selectedOption === post._id ? 'ring-2 ring-primary' : ''
                }`}
                onClick={() => setSelectedOption(post._id)}
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

      {/* Right side - Auction data form */}
      <div className="w-full sm:w-3/5">
        <h3 className="text-base font-semibold mb-2">Auction Details</h3>
        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <Label htmlFor="title" className="text-sm">Title</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="h-8 text-sm"
            />
          </div>
          <div>
            <Label htmlFor="description" className="text-sm">Description</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              className="h-20 text-sm"
            />
          </div>
          <div>
            <Label htmlFor="baseAmount" className="text-sm">Base Amount</Label>
            <Input
              id="baseAmount"
              type="number"
              value={baseAmount}
              onChange={(e) => setBaseAmount(e.target.value)}
              required
              className="h-8 text-sm"
            />
          </div>
          <div>
            <Label className="text-sm">Status</Label>
            <RadioGroup value={status} onValueChange={setStatus} className="flex space-x-2">
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
    </div>
  )
}

