import { InferRequestType,InferResponseType } from "hono";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { client } from "@/lib/hono";
import { toast } from "sonner";


type ResponseType = InferResponseType<typeof client.api.categories[':id']['$patch']>;
type RequestType = InferRequestType<typeof client.api.categories[':id']['$patch']>['json'];


export const useEditCategories = (id?: string) => {
    const queryClient = useQueryClient();

    const mutation = useMutation<ResponseType, Error, RequestType>({
        mutationFn: async (data) => {
            const response = await client.api.categories[':id']['$patch']({ 
                json: data ,
                param: { id}
            });
            if (!response.ok) {
                throw new Error("Failed to create category");
            }
            return await response.json();
        },
        onSuccess: () => {
            toast.success("Category update successfully");
            queryClient.invalidateQueries({queryKey: ["category",{id}]});
            queryClient.invalidateQueries({queryKey: ["categories"]});
        },
        onError: () => {
            toast.error("Failed to edit category");
        },
    });

    return mutation
}