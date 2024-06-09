import { AccountForm } from '@/features/accounts/components/account-form'
import { useNewAccount } from '@/features/accounts/hooks/use-new-account'
import { useCreateAccount } from '@/features/accounts/api/use-create-account'
import { insertAccountSchema } from '@/db/schema'
import { z } from 'zod'
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import React from 'react'

const formSchema = insertAccountSchema.pick({ name: true })
type FormValues = z.infer<typeof formSchema>
export const NewAccountSheet = () => {

    const { isOpen, onClose } = useNewAccount()
    const createAccountMutation = useCreateAccount()

    const onSubmit = (values: FormValues) => {
        createAccountMutation.mutate(values, {
            onSuccess: () => {
                onClose()
            }
        })
    }

    return (
        <Sheet open={isOpen} onOpenChange={onClose}>
            <SheetContent className='space-y-4'>
                <SheetHeader>
                    <SheetTitle>New Account</SheetTitle>
                    <SheetDescription>
                        Create a new account to track your transactions
                    </SheetDescription>
                </SheetHeader>
                <AccountForm
                    disabled={createAccountMutation.isPending}
                    onSubmit={onSubmit}
                    defaultValues={{ name: '' }}
                />
            </SheetContent>
        </Sheet>
    )
}


export default NewAccountSheet