import { useQuery } from "@tanstack/react-query";
export const useRQ = (executer:Function,key:string,dependecy?:any) => {
 return useQuery({
    queryKey: [key],
    queryFn: async () => {
      const { data } = await executer();
      console.log('from rQ',data);
      
      return data.data
    },
    enabled:dependecy!== false,
    
  });
};
