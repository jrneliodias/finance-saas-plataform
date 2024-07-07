import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { insertAccountSchema, insertTransactionSchema } from "@/db/schema";
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
import { date } from "drizzle-orm/mysql-core";

const formSchema = z.object({
    date: z.coerce.date(),
    accountId: z.string(),
    categoryId: z.string().nullable().optional(),
    payee: z.string(),
    amount: z.number(),
    notes: z.string().nullable().optional(),
})

const apiSchema = insertTransactionSchema.omit({ id: true })

type FormValues = z.infer<typeof formSchema>;
type ApiFormValues = z.infer<typeof apiSchema>;

type TransactionFormProps = {
    id?: string;
    defaultValues?: FormValues;
    categoriesOptions: { value: string; label: string }[];
    onCreateCategory: (name: string) => void;
    accountsOptions: { value: string; label: string }[];
    onCreateAccount: (name: string) => void;
    onSubmit: (values: ApiFormValues) => void;
    onDelete?: () => void;
    disabled?: boolean;
};


export const TransactionForm = ({
    id,
    defaultValues,
    onSubmit,
    onDelete,
    disabled,
    categoriesOptions,
    accountsOptions,
    onCreateCategory,
    onCreateAccount

}: TransactionFormProps) => {
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
                                    placeholder="e.g. Cash, Bank, etc."
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
                    {id ? "Update changes" : "Create account"}
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