import { CategoryForm } from '@/features/categories/components/category-form'
import { useNewCategory } from '@/features/categories/hooks/use-new-category'
import { useCreateCategory } from '@/features/categories/api/use-create-category'
import { insertCategorySchema } from '@/db/schema'
import { z } from 'zod'
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import React from 'react'

const formSchema = insertCategorySchema.pick({ name: true })
type FormValues = z.infer<typeof formSchema>


export const NewCategorySheet = () => {

    const { isOpen, onClose } = useNewCategory()
    const createCategoryMutation = useCreateCategory()

    const onSubmit = (values: FormValues) => {
        createCategoryMutation.mutate(values, {
            onSuccess: () => {
                onClose()
            }
        })
    }

    return (
        <Sheet open={isOpen} onOpenChange={onClose}>
            <SheetContent className='space-y-4'>
                <SheetHeader>
                    <SheetTitle>New Category</SheetTitle>
                    <SheetDescription>
                        Create a new category to organize
                    </SheetDescription>
                </SheetHeader>
                <CategoryForm
                    disabled={createCategoryMutation.isPending}
                    onSubmit={onSubmit}
                    defaultValues={{ name: '' }}
                />
            </SheetContent>
        </Sheet>
    )
}


export default NewCategorySheet