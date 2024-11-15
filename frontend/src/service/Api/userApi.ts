import axios from "axios";

type Tuser = {
  email: string;
  firstName: string;
  profile: string;
  lastName: string;
  phone: string;
  gender: string;
  password: string;
};

const api = axios.create({
  baseURL: import.meta.env.VITE_USER_BASE_URL,
  withCredentials:true
});

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
        return await api.post('/setbuyer')
}

export const setupSeller = async()=>{
      let res =await api.post('/setseller')
      return res
      
}