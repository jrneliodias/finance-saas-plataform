"use client"
import { useNewAccount } from '@/features/accounts/hooks/use-new-account'
import { useGetAccounts } from '@/features/accounts/api/use-get-accounts'
import { useBulkDeleteAccount } from '@/features/accounts/api/use-bulk-delete'

import { Button } from '@/components/ui/button'
import { Loader2, Plus } from 'lucide-react'
import { columns } from './columns'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { DataTable } from '@/components/data-table'
import { Skeleton } from '@/components/ui/skeleton'


const AccountPage = () => {
    const newAccount = useNewAccount()
    const accountQuery = useGetAccounts()
    const deleteAccounts = useBulkDeleteAccount()
    const accountData = accountQuery.data || []
    const isDisabled = accountQuery.isLoading || deleteAccounts.isPending

    if (accountQuery.isLoading) {
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
                        Accounts
                    </CardTitle>
                    <Button
                        onClick={newAccount.onOpen}
                        size={'sm'}
                    >
                        <Plus className='size-4 mr-2' />
                        Add new
                    </Button>
                </CardHeader>
                <CardContent>
                    <DataTable
                        columns={columns}
                        data={accountData}
                        filterKey='name'
                        onDelete={(rows) => {
                            const ids = rows.map((row) => row.original.id)
                            deleteAccounts.mutate({ ids })
                        }}
                        disabled={isDisabled}
                    />
                </CardContent>
            </Card>
        </div>
    )
}

export default AccountPage