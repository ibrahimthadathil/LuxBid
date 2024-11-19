import { useQuery } from "@tanstack/react-query";
export const useRQ = (fetchuser:Function,key:string,dependecy?:any) => {
 return useQuery({
    queryKey: [key],
    queryFn: async () => {
      const { data } = await fetchuser();
      return data.data
    },
    
    enabled:dependecy,
    
  });
};
