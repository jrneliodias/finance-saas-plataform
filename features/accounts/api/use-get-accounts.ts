import { client } from "@/lib/hono";
import { useQuery } from "@tanstack/react-query";

export const useGetAccounts = () => {
    return useQuery({
        queryKey: ["accounts"],
        queryFn: async () => {
            const response = await client.api.accounts.$get();
            if(!response.ok){
                throw new Error("Failed to get accounts");
            }
            const {data} = await response.json();
            return data
        },
    });
}