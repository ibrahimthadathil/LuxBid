import { useQuery } from "@tanstack/react-query";
export const useRQ = (executer:Function,key:string,dependecy?:unknown) => {
 return useQuery({
    queryKey: [key],
    queryFn: async () => {
      const { data } = await executer();
      return data.data
    },
    enabled:dependecy!== false,
    
  });
};
