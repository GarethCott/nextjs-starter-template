'use client';

import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown } from 'lucide-react';
import Link from 'next/link';
import * as React from 'react';

import { Button, buttonVariants } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { DataTable } from '@/components/ui/data-table/data-table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import Logo from '~/svg/Logo.svg';

type Payment = {
  id: string;
  amount: number;
  status: 'pending' | 'processing' | 'success' | 'failed';
  email: string;
};

export default function HomePage() {
  // Mock data for the table demo
  const data: Payment[] = Array.from({ length: 5 }, (_, i) => ({
    id: `INV-${(i + 1).toString().padStart(4, '0')}`,
    amount: Math.floor(Math.random() * 10000),
    status: ['pending', 'processing', 'success', 'failed'][
      Math.floor(Math.random() * 4)
    ] as Payment['status'],
    email: `user${i + 1}@example.com`,
  }));

  const columns: ColumnDef<Payment>[] = [
    {
      accessorKey: 'id',
      header: 'Invoice ID',
    },
    {
      accessorKey: 'status',
      header: 'Status',
    },
    {
      accessorKey: 'email',
      header: ({ column }) => {
        return (
          <Button
            variant='ghost'
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            Email
            <ArrowUpDown className='ml-2 h-4 w-4' />
          </Button>
        );
      },
    },
    {
      accessorKey: 'amount',
      header: () => <div className='text-right'>Amount</div>,
      cell: ({ row }) => {
        const amount = parseFloat(row.getValue('amount'));
        const formatted = new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD',
        }).format(amount);
        return <div className='text-right font-medium'>{formatted}</div>;
      },
    },
  ];

  return (
    <main className='min-h-screen bg-background'>
      <div className='container mx-auto py-10'>
        <div className='flex flex-col items-center justify-center text-center mb-12'>
          <Logo className='w-16' />
          <h1 className='mt-4 text-4xl font-bold'>Next.js Starter Template</h1>
          <p className='mt-2 text-lg text-muted-foreground max-w-2xl'>
            A modern starter template with Next.js 14, Tailwind CSS, TypeScript,
            and Shadcn UI components. Includes TanStack Table, authentication,
            and more.
          </p>
          <div className='flex gap-4 mt-6'>
            <Link
              className={buttonVariants({ variant: 'default', size: 'lg' })}
              href='/components'
            >
              View Components
            </Link>
            <Link
              className={buttonVariants({ variant: 'outline', size: 'lg' })}
              href='https://github.com/shadcn/ui'
              target='_blank'
            >
              Documentation
            </Link>
          </div>
        </div>

        <div className='grid gap-8'>
          <Card>
            <CardHeader>
              <CardTitle>Featured Components</CardTitle>
              <CardDescription>
                Explore some of our featured components built with Shadcn UI and
                TanStack Table.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue='table' className='space-y-4'>
                <TabsList>
                  <TabsTrigger value='table'>Data Table</TabsTrigger>
                  <TabsTrigger value='auth'>Authentication</TabsTrigger>
                  <TabsTrigger value='forms'>Forms</TabsTrigger>
                </TabsList>

                <TabsContent value='table' className='space-y-4'>
                  <Card>
                    <CardHeader>
                      <CardTitle>TanStack Table Integration</CardTitle>
                      <CardDescription>
                        A powerful data table with sorting, filtering, and
                        pagination.
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <DataTable
                        columns={columns}
                        data={data}
                        searchKey='email'
                      />
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value='auth'>
                  <Card>
                    <CardHeader>
                      <CardTitle>Authentication</CardTitle>
                      <CardDescription>
                        Secure authentication with NextAuth.js and AWS Amplify
                        integration.
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className='flex justify-center gap-4'>
                        <Link
                          href='/auth/login'
                          className={buttonVariants({ variant: 'outline' })}
                        >
                          Sign In
                        </Link>
                        <Link
                          href='/auth/register'
                          className={buttonVariants({ variant: 'default' })}
                        >
                          Sign Up
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value='forms'>
                  <Card>
                    <CardHeader>
                      <CardTitle>Form Components</CardTitle>
                      <CardDescription>
                        Beautiful and accessible form components with React Hook
                        Form.
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className='flex justify-center'>
                        <Link
                          href='/components'
                          className={buttonVariants({ variant: 'outline' })}
                        >
                          View Form Components
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        <footer className='text-center mt-12 text-sm text-muted-foreground'>
          {new Date().getFullYear()} Next.js Starter Template. Built with Shadcn
          UI.
        </footer>
      </div>
    </main>
  );
}
