"use client"
import { useNewTransaction } from '@/features/transactions/hooks/use-new-transaction'
import { useGetTransactions } from '@/features/transactions/api/use-get-transactions'
import { useBulkDeleteTransactions } from '@/features/transactions/api/use-bulk-delete-transaction'

import { Button } from '@/components/ui/button'
import { Loader2, Plus } from 'lucide-react'
import { columns } from './columns'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { DataTable } from '@/components/data-table'
import { Skeleton } from '@/components/ui/skeleton'


const TransactionsPage = () => {
    const newTransaction = useNewTransaction()
    const transactionQuery = useGetTransactions()
    const deleteTransactions = useBulkDeleteTransactions()
    const transactionData = transactionQuery.data || []
    const isDisabled = transactionQuery.isLoading || deleteTransactions.isPending

    if (transactionQuery.isLoading) {
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
                        Transactions
                    </CardTitle>
                    <Button
                        onClick={newTransaction.onOpen}
                        size={'sm'}
                    >
                        <Plus className='size-4 mr-2' />
                        Add new
                    </Button>
                </CardHeader>
                <CardContent>
                    <DataTable
                        columns={columns}
                        data={transactionData}
                        filterKey='name'
                        onDelete={(rows) => {
                            const ids = rows.map((row) => row.original.id)
                            deleteTransactions.mutate({ ids })
                        }}
                        disabled={isDisabled}
                    />
                </CardContent>
            </Card>
        </div>
    )
}

export default TransactionsPage