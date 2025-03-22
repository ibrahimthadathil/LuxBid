import { TZprofile } from "@/utils/validation/user";
import  { AxiosError } from "axios";
import { axiosInstance } from "../axiosInstance/intercepters";
import { toast } from "sonner";

type Tuser = {
  email: string;
  firstName: string;
  profile: string;
  lastName: string;
  phone: string;
  gender: string;
  password: string;
};

// const api = axios.create({
//   baseURL: import.meta.env.VITE_USER_BASE_URL,
//   withCredentials:true
// });

const api = axiosInstance(import.meta.env.VITE_USER_BASE_URL)

// signup request

export const signUpRequest = async (email: string) => {
  const res = await api.post("/signup", { email });
  return res;
};

//Registration

export const registration = async (datas: Partial<Tuser>, token: string) => {
  return await api.post("/register", datas, {
    headers: { Authorization: token },
  });
};
// otp
export const otpVerification = async (otp: string, token: string) => {
  return await api.post(
    "/otpverify",
    { otp },
    { headers: { Authorization: token } }
  );
};
// googleauth
export const googleAuthSignIn = async (userDetails: Partial<Tuser>) => {
  return await api.post("/auth/google", userDetails, );
};
// signIn
export const signInRequest = async (userDetails: Partial<Tuser>) => {
  const response = await api.post("/signin", userDetails, {

  });
  return response;
};
//forget
export const forgetRequest = async (email: string) => {
  return await api.post("/forget/password", { email });
};
//reset otp
export const resetOTP = async (otp: string, token: string) => {
  return await api.post(
    "/reset/otp",
    { otp },
    { headers: { Authorization: token } }
  );
};
// rest pass
export const resetPassword = async (
  password: string,
  newPassword: string,
  token: string
) => {
  return await api.post(
    "/reset/password",
    { password, newPassword },
    { headers: { Authorization: token } }
  );
};

// get user
export const fetchuser = async () => {
  try {
    const response = await api.get("/user");
    return response;
  } catch (error) {
    console.log("from api");
    throw new Error("error from fetch user");
  }
};

export const setupBuyer = async()=>{
        return await api.put('/setbuyer')
}

export const setupSeller = async()=>{
      let res =await api.put('/setseller')
      return res
      
}

export const userLogout =async()=>{
  try {
    await api.post('/logout')
  } catch (error) {
    throw new Error('Logout failed')
  }
}

export const uploadProfile = async(image:File)=>{
  const data=new FormData();
  data.append("image",image)  
  return await api.post('/uploadprofile',data)

}

// profile update
export const saveEdit = async(data:TZprofile)=>{
return await api.post('/editprofile',data)
}

// Auction join stripe 

export const joinPayment=async(data:{price:string,title:string,img:string,id:string})=>{
  try {
    const response = await api.post('/create-checkout-session',data)    
    return response.data.clientSecret
  } catch (error) {
  toast.error(((error as AxiosError).response?.data as Record<string,any>).message)

  }
}
// get status of the payment after the request
export const getSessionStatus = async (sessionId:string,auctionId:string)=>{
  try {
    const response = await api.get(`/session-status?session_id=${sessionId}&aid=${auctionId}`)
    return response.data
  } catch (error) {
    toast.error('failed to complete payment')
  }
}

//get transaction history 

export const getTransactionHistory = async()=>{
  try {
    return await api.get('/transactionHistory')
  } catch (error) {
    console.log(error);
    
  }
} 

// get won history
 
export const getWonAuction = async()=>{
  try {
      return await api.get('/find-won-auction')
      
  } catch (error) {
    console.log(error);    
  }
}  



