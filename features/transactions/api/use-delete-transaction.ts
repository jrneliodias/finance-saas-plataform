import { InferRequestType,InferResponseType } from "hono";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { client } from "@/lib/hono";
import { toast } from "sonner";


type ResponseType = InferResponseType<typeof client.api.transactions[':id']['$delete']>;


export const useDeleteTransaction = (id?: string) => {
    const queryClient = useQueryClient();

    const mutation = useMutation<ResponseType, Error>({
        mutationFn: async (data) => {
            const response = await client.api.transactions[':id']['$delete']({ 
           
                param: { id}
            });
            if (!response.ok) {
                throw new Error("Failed to create transaction.");
            }
            return await response.json();
        },
        onSuccess: () => {
            toast.success("Transaction delete successfully");
            queryClient.invalidateQueries({queryKey: ["transaction.",{id}]});
            queryClient.invalidateQueries({queryKey: ["transactions"]});
        },
        onError: () => {
            toast.error("Failed to delete transaction.");
        },
    });

    return mutation
}