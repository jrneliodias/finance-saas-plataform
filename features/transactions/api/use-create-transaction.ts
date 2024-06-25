import { InferRequestType,InferResponseType } from "hono";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { client } from "@/lib/hono";
import { toast } from "sonner";


type ResponseType = InferResponseType<typeof client.api.transactions.$post>;
type RequestType = InferRequestType<typeof client.api.transactions.$post>['json'];


export const useCreateTransaction = () => {
    const queryClient = useQueryClient();

    const mutation = useMutation<ResponseType, Error, RequestType>({
        mutationFn: async (data) => {
            const response = await client.api.transactions.$post({ json: data });
            if (!response.ok) {
                throw new Error("Failed to create transaction.");
            }
            return await response.json();
        },
        onSuccess: () => {
            toast.success("Transaction created successfully");
            queryClient.invalidateQueries({queryKey: ["transactions"]});
        },
        onError: () => {
            toast.error("Failed to create transaction.");
        },
    });

    return mutation
}