import { AccountForm } from '@/features/accounts/components/account-form'
import { useGetAccount } from '@/features/accounts/api/use-get-account'
import { useEditAccount } from '@/features/accounts/api/use-edit-account'
import { useDeleteAccount } from '@/features/accounts/api/use-delete-account'
import { useOpenAccount } from '@/features/accounts/hooks/use-open-account'
import { insertAccountSchema } from '@/db/schema'
import { z } from 'zod'
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from '@/components/ui/sheet'

import { Loader2 } from 'lucide-react'
import { useConfirm } from '@/hooks/use-confirm'

const formSchema = insertAccountSchema.pick({ name: true })
type FormValues = z.infer<typeof formSchema>
export const EditAccountSheet = () => {

    const { isOpen, onClose, id } = useOpenAccount()
    const accountQuery = useGetAccount(id)
    const editMutation = useEditAccount(id)
    const deleteMutation = useDeleteAccount(id)
    const [ConfirmationDialog, confirm] = useConfirm(
        "Are you sure you want to delete this account?",
        "This action cannot be undone.",
    )


    const isPending = editMutation.isPending || deleteMutation.isPending

    const isLoading = accountQuery.isLoading

    const onSubmit = (values: FormValues) => {
        editMutation.mutate(values, {
            onSuccess: () => {
                onClose()
            }
        })
    }

    const onDelete = async () => {
        const ok = await confirm()
        if (ok) {

            deleteMutation.mutate(undefined, {
                onSuccess: () => {
                    onClose()
                }
            })
        }
    }

    const defaultValues = accountQuery.data ? {
        name: accountQuery.data.name,

    } : {
        name: '',
    }

    return (
        <>
            <ConfirmationDialog />
            <Sheet open={isOpen} onOpenChange={onClose}>
                <SheetContent className='space-y-4'>
                    <SheetHeader>
                        <SheetTitle>Edit Account</SheetTitle>
                        <SheetDescription>
                            Create a Edit account to track your transactions
                        </SheetDescription>
                    </SheetHeader>

                    {isLoading
                        ?
                        (
                            <div className='flex h-[500px] w-full items-center justify-center'>
                                <Loader2 className='size-6 text-slate-300 animate-spin' />
                            </div>
                        )
                        : (
                            <AccountForm
                                id={id}
                                disabled={isPending}
                                onSubmit={onSubmit}
                                defaultValues={defaultValues}
                                onDelete={onDelete}
                            />
                        )
                    }

                </SheetContent>
            </Sheet>
        </>
    )
}


export default EditAccountSheet