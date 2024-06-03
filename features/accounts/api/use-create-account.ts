import { InferRequestType,InferResponseType } from "hono";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { client } from "@/lib/hono";
import { toast } from "sonner";


type ResponseType = InferResponseType<typeof client.api.accounts.$post>;
type RequestType = InferRequestType<typeof client.api.accounts.$post>['json'];


export const useCreateAccount = () => {
    const queryClient = useQueryClient();

    const mutation = useMutation<ResponseType, Error, RequestType>({
        mutationFn: async (data) => {
            const response = await client.api.accounts.$post({ json: data });
            if (!response.ok) {
                throw new Error("Failed to create account");
            }
            return await response.json();
        },
        onSuccess: () => {
            toast.success("Account created successfully");
            queryClient.invalidateQueries({queryKey: ["accounts"]});
        },
        onError: () => {
            toast.error("Failed to create account");
        },
    });

    return mutation
}