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
        Auction:string,
        bidAmt :number,
        bidDate:Date ,
        bisStatus: string ,
    }],
}

export type Tcategory ={
    _id:string,
    name:string,
    isActive:boolean,
}

export type Tproduct ={
    _id:string,
    seller:string,
    price:number,
    images:string[],
    category:string,
    description:string,
    title:string,
    isApproved:boolean,
    location:string
}

