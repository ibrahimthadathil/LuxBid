export interface Iuser extends Document{

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