"use client"
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useNewAccount } from '@/features/accounts/hooks/use-new-account'
import { Plus } from 'lucide-react'
import React from 'react'
import { Payment, columns } from './columns'
import { DataTable } from '@/components/data-table'


async function getData(): Promise<Payment[]> {
    // Fetch data from your API here.
    return [
        {
            id: "728ed52f",
            amount: 100,
            status: "pending",
            email: "m@example.com",
        },
        // ...
    ]
}

const data: Payment[] = [
    {
        id: "728ed52f",
        amount: 100,
        status: "pending",
        email: "m@example.com",
    },
    {
        id: "a2b4d6e8",
        amount: 250,
        status: "success",
        email: "a@example.com",
    },
    {
        id: "c3d5e7f9",
        amount: 75,
        status: "failed",
        email: "b@example.com",
    },
    {
        id: "d4e6f8g1",
        amount: 300,
        status: "pending",
        email: "c@example.com",
    },
    {
        id: "e5f7g9h2",
        amount: 450,
        status: "success",
        email: "d@example.com",
    },
    {
        id: "f6g8h1i3",
        amount: 120,
        status: "failed",
        email: "e@example.com",
    },
    {
        id: "g7h9i2j4",
        amount: 600,
        status: "pending",
        email: "f@example.com",
    },
    {
        id: "h8i1j3k5",
        amount: 200,
        status: "success",
        email: "g@example.com",
    },
    {
        id: "i9j2k4l6",
        amount: 90,
        status: "failed",
        email: "h@example.com",
    },
    {
        id: "j1k3l5m7",
        amount: 350,
        status: "pending",
        email: "i@example.com",
    },
    {
        id: "k2l4m6n8",
        amount: 500,
        status: "success",
        email: "j@example.com",
    },
]
const AccountPage = () => {
    const newAccount = useNewAccount()
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
                        data={data}
                        filterKey='email'
                        onDelete={() => { }}
                    />
                </CardContent>
            </Card>
        </div>
    )
}

export default AccountPage