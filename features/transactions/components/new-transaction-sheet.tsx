import { TransactionForm } from '@/features/transactions/components/transaction-form'
import { useNewTransaction } from '@/features/transactions/hooks/use-new-transaction'
import { useCreateTransaction } from '@/features/transactions/api/use-create-transaction'
import { insertTransactionSchema } from '@/db/schema'
import { z } from 'zod'
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import React from 'react'
import { useGetCategories } from '@/features/categories/api/use-get-categories'
import { useCreateCategory } from '@/features/categories/api/use-create-category'
import { useGetAccounts } from '@/features/accounts/api/use-get-accounts'
import { useCreateAccount } from '@/features/accounts/api/use-create-account'
import { Loader2 } from 'lucide-react'

const formSchema = insertTransactionSchema.omit({ id: true })
type FormValues = z.infer<typeof formSchema>
export const NewTransactionSheet = () => {

    const { isOpen, onClose } = useNewTransaction()
    const createTransactionMutation = useCreateTransaction()
    const categoryQuery = useGetCategories()
    const categoryMutation = useCreateCategory()

    const onCreateCategory = (name: string) => {
        categoryMutation.mutate({ name })
    }

    const categoryOptions = (categoryQuery.data ?? []).map((category) => ({
        label: category.name,
        value: category.id
    }))

    const accountQuery = useGetAccounts()
    const accountMutation = useCreateAccount()

    const onCreateAccount = (name: string) => {
        accountMutation.mutate({ name })
    }

    const accountOptions = (accountQuery.data ?? []).map((account) => ({
        label: account.name,
        value: account.id
    }))

    const isPending =
        createTransactionMutation.isPending ||
        categoryMutation.isPending ||
        accountMutation.isPending

    const isLoading =
        categoryQuery.isLoading ||
        accountQuery.isLoading

    const onSubmit = (values: FormValues) => {
        createTransactionMutation.mutate(values, {
            onSuccess: () => {
                onClose()
            }
        })
    }

    return (
        <Sheet open={isOpen} onOpenChange={onClose}>
            <SheetContent className='space-y-4'>
                <SheetHeader>
                    <SheetTitle>New Transaction</SheetTitle>
                    <SheetDescription>
                        Create a new transaction to track your debits
                    </SheetDescription>
                </SheetHeader>
                {isLoading
                    ? (
                        <section>

                            <div className="absolute inset-0 flex items-center">
                                <Loader2 className='size-4 text-muted-foreground animate-spin' />
                            </div>
                        </section>
                    )
                    : (
                        <TransactionForm
                            disabled={isPending}
                            onSubmit={onSubmit}
                            categoriesOptions={categoryOptions}
                            accountsOptions={accountOptions}
                            onCreateCategory={onCreateCategory}
                            onCreateAccount={onCreateAccount}
                        />
                    )
                }
            </SheetContent>
        </Sheet>
    )
}


export default NewTransactionSheet