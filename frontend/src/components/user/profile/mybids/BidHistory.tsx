import React from 'react';
import moment from 'moment';
import { Button } from "@/components/ui/Button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface BidHistoryDialogProps {
  bidders: {
    user: {
      firstName: string,
      profile?: string
    },
    bidTime: Date,
    amount: number,
    isAccept:boolean
  }[]
}

export function BidHistoryDialog({ bidders }: BidHistoryDialogProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">History</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[800px]">
        <DialogHeader>
          <DialogTitle>Bid History</DialogTitle>
        </DialogHeader>
        <ScrollArea className="h-[300px] w-full rounded-md">
          <Table>
            <TableHeader >
              <TableRow>
                <TableHead className="w-16 ">No.</TableHead>
                <TableHead>Bidder</TableHead>
                <TableHead className="text-center">Raised Amount</TableHead>
                <TableHead className="text-center">Time</TableHead>
                <TableHead className="text-center">Acceptance</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {bidders?.map((bidder, index) => (
                <TableRow key={`${bidder.user.firstName}-${index}`}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Avatar className="h-8 w-8 border">
                        <AvatarImage src={bidder.user.profile} />
                        <AvatarFallback>
                          {bidder.user.firstName[0].toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <span>{bidder.user.firstName}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-center ">₹{bidder.amount.toLocaleString()}</TableCell>
                  <TableCell className="text-right">
                    {moment(bidder.bidTime).format('MMM D, YYYY h:mm A')}
                  </TableCell>
                  <TableCell className={`${bidder.isAccept?'text-green-700':'text-yellow-700'} text-center `}>{bidder.isAccept ? 'Accepted':'Not Accepted'}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}

export default BidHistoryDialog;