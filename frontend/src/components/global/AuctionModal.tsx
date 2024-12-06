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


interface ModalProps{
  node:{render:()=>React.ReactNode}[]
}

export function AuctionModal({node}:ModalProps) {
// const {isLoading,data}=useRQ(fetchApprovedPost,'post')

  // const [selectedOption, setSelectedOption] = useState<string | null>(null)
  // const [title, setTitle] = useState('')
  // const [description, setDescription] = useState('')
  // const [baseAmount, setBaseAmount] = useState('')
  // const [status, setStatus] = useState('live')

  // const handleSubmit = (e: React.FormEvent) => {
  //   e.preventDefault()
  //   console.log({ selectedOption, title, description, baseAmount, status })
  // }

  return (
    <div className="flex flex-col sm:flex-row gap-4">
      {/* Left side - Post options */}
      {node.length >0 && node.map((e)=>(
        e.render()
      ))}
    </div>
  )
}

