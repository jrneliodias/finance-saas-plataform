import { InferRequestType,InferResponseType } from "hono";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { client } from "@/lib/hono";
import { toast } from "sonner";


type ResponseType = InferResponseType<typeof client.api.accounts[':id']['$patch']>;
type RequestType = InferRequestType<typeof client.api.accounts[':id']['$patch']>['json'];


export const useEditAccount = (id?: string) => {
    const queryClient = useQueryClient();

    const mutation = useMutation<ResponseType, Error, RequestType>({
        mutationFn: async (data) => {
            const response = await client.api.accounts[':id']['$patch']({ 
                json: data ,
                param: { id}
            });
            if (!response.ok) {
                throw new Error("Failed to create account");
            }
            return await response.json();
        },
        onSuccess: () => {
            toast.success("Account update successfully");
            queryClient.invalidateQueries({queryKey: ["account",{id}]});
            queryClient.invalidateQueries({queryKey: ["accounts"]});
        },
        onError: () => {
            toast.error("Failed to edit account");
        },
    });

    return mutation
}