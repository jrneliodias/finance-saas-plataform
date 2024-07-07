"use client"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { insertTransactionSchema } from "@/db/schema";
import { Trash } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel
} from "@/components/ui/form";
import { Select } from "@/components/select";
import { DatePicker } from "@/components/date-picker";
import { Textarea } from "@/components/ui/textarea";
import { AmountInput } from "@/components/amount-input";
import { convertAmountToMiliunits } from "@/lib/utils";

const formSchema = z.object({
    date: z.coerce.date(),
    accountId: z.string(),
    categoryId: z.string().nullable().optional(),
    payee: z.string(),
    amount: z.string(),
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
        const amount = parseFloat(values.amount)
        const amountInMiliUnits = convertAmountToMiliunits(amount)

        console.log({ values })
        onSubmit({
            ...values,
            amount: amountInMiliUnits,
        })
    }

    const handleDelete = () => {
        onDelete?.()
    }
    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(handleSubmit)}
                className="pt-4 space-y-4"
            >
                <FormField
                    control={form.control}
                    name="date"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <DatePicker
                                    onChange={field.onChange}
                                    value={field.value}
                                    disabled={disabled}
                                />
                            </FormControl>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="accountId"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>
                                Account
                            </FormLabel>
                            <FormControl>
                                <Select
                                    placeholder="Select account"
                                    options={accountsOptions}
                                    onCreate={onCreateAccount}
                                    onChange={field.onChange}
                                    disabled={disabled}

                                />
                            </FormControl>
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="categoryId"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>
                                Category
                            </FormLabel>
                            <FormControl>
                                <Select
                                    placeholder="Select category"
                                    options={categoriesOptions}
                                    onCreate={onCreateCategory}
                                    onChange={field.onChange}
                                    disabled={disabled}

                                />
                            </FormControl>
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="payee"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>
                                Payee
                            </FormLabel>
                            <FormControl>
                                <Input
                                    {...field}
                                    disabled={disabled}
                                    placeholder="Add a payee"

                                />
                            </FormControl>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="notes"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>
                                Notes
                            </FormLabel>
                            <FormControl>
                                <Textarea
                                    {...field}
                                    value={field.value || ""}
                                    disabled={disabled}
                                    placeholder="Optional notes"

                                />
                            </FormControl>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="amount"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>
                                Amount
                            </FormLabel>
                            <FormControl>
                                <AmountInput
                                    disabled={disabled}
                                    {...field}
                                    placeholder="0,00"
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
                    {id ? "Update transaction" : "Create transaction"}
                </Button>
                {!!id && <Button
                    variant="outline"
                    onClick={handleDelete}
                    disabled={disabled}
                    type="button"
                    className="w-full"

                >
                    <Trash className="size-4 mr-2" />
                    <span>Delete transaction</span>
                </Button>}


            </form>
        </Form>
    );
}