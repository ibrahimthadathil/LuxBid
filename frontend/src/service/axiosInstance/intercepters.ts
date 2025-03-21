import { logout } from "@/redux/slice/authSlice";
import store, { AppDispatch } from "@/redux/store/store";
import axios, { AxiosError, AxiosRequestConfig } from "axios";
import { toast } from "sonner";
const USER_URL = import.meta.env.VITE_USER_BASE_URL;

const controllerMap = new Map();

export const axiosInstance = (baseURL: string) => {
  
  const instance = axios.create({
    baseURL,
    withCredentials: true,
  });

  // for request
  instance.interceptors.request.use(
    async (config) => {
      const token = localStorage.getItem("access-token");
      if (token) {
        console.log('token found');
        
        config.headers.Authorization = `${token}`;
      }
      if (!config.signal) {
        const controller = new AbortController(); // it hlps to abort any async operation b4 complete
        config.signal = controller.signal;
        controllerMap.set(config.url, controller);
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  // response
  instance.interceptors.response.use(
    (response) => {
      if (response.config.url) {
        controllerMap.delete(response.config.url);
      }
      return response;
    },

    async (error: AxiosError) => {
      if (!error.config) {
        return Promise.reject(error);
      }

      const originalRequest = error.config;
      const url = originalRequest.url ;
      if (error.response) {
        console.log('token not found');
        if (error.response.status === 401 && !(originalRequest as any)._retry) {
          (originalRequest as { _retry?: boolean })._retry = true;
          
          try {
            const newAccessToken = await getNewAccessToken();
            localStorage.setItem("access-token", newAccessToken);
            if (originalRequest.headers) {
              originalRequest.headers.Authorization = `${newAccessToken}`;
            }
            return instance(originalRequest);
          } catch (err) {
            toast.error("Session expired");
            store.dispatch(logout())
            return Promise.reject(err);
          }
        }
        if (error.response.status >= 500) {
          toast.error("Server error, please try again later.");
        }

        if (
          error.response.status >= 400 &&
          error.response.status < 500 &&
          error.response.status !== 401
        ) {
          console.log('llll',error.response.data);
                    
          toast.error(`${(error?.response.data as Error).message || (error.response.data as Error).message||"An error occurred"}`);
        }
      } else if (error.request) {
        toast.error("Network error, please check your connection.");
      } else {
        toast.error("An unexpected error occurred.");
      }

      controllerMap.delete(url);
      return Promise.reject(error);
    }
  );

  return instance;
};

async function getNewAccessToken() {
  const response = await axios.get(`${USER_URL}/refresh-token`, {
    withCredentials: true,
  });
  return response.data.accessToken;
}
