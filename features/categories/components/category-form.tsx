import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { insertCategorySchema } from "@/db/schema";
import { Trash } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form";

const formSchema = insertCategorySchema.pick({ name: true })

type FormValues = z.infer<typeof formSchema>;

type CategoryFormProps = {
    id?: string;
    defaultValues?: FormValues;
    onSubmit: (values: FormValues) => void;
    onDelete?: () => void;
    disabled?: boolean;
};


export const CategoryForm = ({
    id,
    defaultValues,
    onSubmit,
    onDelete,
    disabled
}: CategoryFormProps) => {
    const form = useForm<FormValues>({
        defaultValues,
        resolver: zodResolver(formSchema)
    });

    const handleSubmit = (values: FormValues) => {

        console.log({ values })
        onSubmit(values)
    }

    const handleDelete = () => {
        onDelete?.()
    }
    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="pt-4 space-y-4"
            >
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                                <Input
                                    disabled={disabled}
                                    placeholder="e.g. Food, Travel etc."
                                    {...field}
                                />
                            </FormControl>
                        </FormItem>
                    )}
                />

                <Button
                    type="submit"
                    disabled={disabled}
                    className="w-full"
                >
                    {id ? "Update changes" : "Create Category"}
                </Button>
                {!!id && <Button
                    variant="outline"
                    onClick={handleDelete}
                    disabled={disabled}
                    type="button"
                    className="w-full"

                >
                    <Trash className="size-4 mr-2" />
                    <span>Delete</span>
                </Button>}


            </form>
        </Form>
    );
}