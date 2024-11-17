import { useQuery } from "@tanstack/react-query";
export const useRQ = (fetchuser:Function,dependecy?:any) => {
 return useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const { data } = await fetchuser();
      return data.data
    },
    
    enabled:dependecy,
    
  });
};
