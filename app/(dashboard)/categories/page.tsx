"use client"
import { useNewCategory } from '@/features/categories/hooks/use-new-category'
import { useGetCategories } from '@/features/categories/api/use-get-categories'
import { useBulkDeleteCategory } from '@/features/categories/api/use-bulk-delete-categories'

import { Button } from '@/components/ui/button'
import { Loader2, Plus } from 'lucide-react'
import { columns } from './columns'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { DataTable } from '@/components/data-table'
import { Skeleton } from '@/components/ui/skeleton'


const CategoryPage = () => {
    const newCategory = useNewCategory()
    const categoryQuery = useGetCategories()
    const deleteCategorys = useBulkDeleteCategory()
    const categoryData = categoryQuery.data || []
    const isDisabled = categoryQuery.isLoading || deleteCategorys.isPending

    if (categoryQuery.isLoading) {
        return (
            <div className='max-w-screen-2xl mx-auto w-full pb-10 -mt-24'>
                <Card className='border-none drop-shadow-sm'>
                    <CardHeader className='gap-y-2 lg:flex-row lg:items-center lg:justify-between'>
                        <Skeleton className='w-48 h-8' />

                    </CardHeader>
                    <CardContent>
                        <div className='flex h-[500px] w-full items-center justify-center'>
                            <Loader2 className='size-6 text-slate-300 animate-spin' />
                        </div>
                    </CardContent>
                </Card>
            </div>
        )
    }

    return (
        <div className='max-w-screen-2xl mx-auto w-full pb-10 -mt-24'>
            <Card className='border-none drop-shadow-sm'>
                <CardHeader className='gap-y-2 lg:flex-row lg:items-center lg:justify-between'>
                    <CardTitle className='text-xl line-clamp-1'>
                        Categories
                    </CardTitle>
                    <Button
                        onClick={newCategory.onOpen}
                        size={'sm'}
                    >
                        <Plus className='size-4 mr-2' />
                        Add new
                    </Button>
                </CardHeader>
                <CardContent>
                    <DataTable
                        columns={columns}
                        data={categoryData}
                        filterKey='name'
                        onDelete={(rows) => {
                            const ids = rows.map((row) => row.original.id)
                            deleteCategorys.mutate({ ids })
                        }}
                        disabled={isDisabled}
                    />
                </CardContent>
            </Card>
        </div>
    )
}

export default CategoryPage