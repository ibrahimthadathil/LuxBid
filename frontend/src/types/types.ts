export interface Iuser extends Document{
    _id:string,
    firstName : string ;
    lastName ?: string ;
    email : string ;
    phone : string ;
    gender : 'Male' | 'Female' ;
    password:string;
    role : string ;
    isActive : boolean ;
    createdAt? : Date ;
    profile : string;
    isVerified : boolean

}

export type Tbuyer= {
    CommittedBids:[{
        Auction:Tauction,
        bidAmt :number,
        bidDate:Date ,
        bisStatus: string ,
    }],
}

export type Tcategory ={
    _id:string,
    name:string,
    isActive:boolean,
    createdAt?:Date
}

export type Tproduct ={
    _id:string,
    seller:string | Iuser,
    images:string[],
    category:string |Tcategory,
    description:string,
    title:string,
    isApproved:boolean,
    location:string,
    createdAt?:Date,
    status: 'Pending'|'Approved'|'Rejected'

}

export type Tauction = {
    _id:string,
    title:string,
    seller : string | Iuser,
    description:string,
    post:string | Tproduct,
    baseAmount:number,
    bidders:{
        user:string | Iuser ,
        bidTime:Date,
        isAccept:boolean,
        amount:number
    }[],
    endTime:Date,
    startTime :Date,
    auctionType : 'Live'| 'Scheduled',
    createdAt?:Date,
    isActive :boolean,
    entryAmt:number
}

export type TAddress = {
    _id?:string
    propertyName:string  
    user?:string
    street: string;
    city: string;
    state: string;
    pincode: string;
}
export type TOrder = {
    _id:string
    user: string | Iuser;
    shippingAddress: string | TAddress;
    paymentStatus: 'Success' | 'Failed' | 'Pending';
    orderStatus: 'Pending' | 'Shipped' | 'Delivered' | 'Canceled';
    auction: Tauction|string;
    orderAmt: number;
    createdAt?: Date;
    updatedAt?: Date;
    rating?:[{rate:number}]
}

// chat 
export type IEmoji = {
    emoji: string;
    count: number;
    users: string[];
    _id: string;
  }

export type Message = {
    _id: string;
    category: string;
    user: { 
      _id: string;
      firstName: string;
      profile: string;
    };
    content: string;
    timestamp: Date;
    replyTo?: {
      messageId: string;
      content: string;
      attachments?:string[]
      user: {
        _id: string;
        firstName: string;
        profile: string;
      };
    } | null;
    emojis: IEmoji[];
    attachments: string[];
    __v: number;
  }