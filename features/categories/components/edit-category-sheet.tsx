import { CategoryForm } from '@/features/categories/components/category-form'
import { useGetCategory } from '@/features/categories/api/use-get-category'
import { useEditCategory } from '@/features/categories/api/use-edit-category'
import { useDeleteCategory } from '@/features/categories/api/use-delete-category'
import { useOpenCategory } from '@/features/categories/hooks/use-open-category'
import { insertCategorySchema } from '@/db/schema'
import { z } from 'zod'
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from '@/components/ui/sheet'

import { Loader2 } from 'lucide-react'
import { useConfirm } from '@/hooks/use-confirm'

const formSchema = insertCategorySchema.pick({ name: true })
type FormValues = z.infer<typeof formSchema>
export const EditCategorySheet = () => {

    const { isOpen, onClose, id } = useOpenCategory()
    const categoryQuery = useGetCategory(id)
    const editMutation = useEditCategory(id)
    const deleteMutation = useDeleteCategory(id)
    const [ConfirmationDialog, confirm] = useConfirm(
        "Are you sure you want to delete this category?",
        "This action cannot be undone.",
    )


    const isPending = editMutation.isPending || deleteMutation.isPending

    const isLoading = categoryQuery.isLoading

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

    const defaultValues = categoryQuery.data ? {
        name: categoryQuery.data.name,

    } : {
        name: '',
    }

    return (
        <>
            <ConfirmationDialog />
            <Sheet open={isOpen} onOpenChange={onClose}>
                <SheetContent className='space-y-4'>
                    <SheetHeader>
                        <SheetTitle>Edit Category</SheetTitle>
                        <SheetDescription>
                            Edit a existent category
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
                            <CategoryForm
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


export default EditCategorySheet