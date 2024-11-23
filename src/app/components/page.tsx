'use client';

import { ColumnDef } from '@tanstack/react-table';
import {
  CreditCard,
  Home,
  Info,
  Laptop,
  Phone,
  Plus,
  Shield,
} from 'lucide-react';
import Link from 'next/link';
import { useTheme } from 'next-themes';
import React from 'react';

import { cn } from '@/lib/utils';

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { DataTable } from '@/components/ui/data-table/data-table';
import { Input } from '@/components/ui/input';
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from '@/components/ui/input-otp';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/components/ui/use-toast';

export default function ComponentPage() {
  const { theme, setTheme } = useTheme();
  const [date, setDate] = React.useState<Date | undefined>(new Date());
  const [otpValue, setOtpValue] = React.useState('');

  // Define the Payment type
  type Payment = {
    id: string;
    amount: number;
    status: 'pending' | 'processing' | 'success' | 'failed';
    email: string;
  };

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
      header: 'Email',
    },
    {
      accessorKey: 'amount',
      header: 'Amount',
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
    <main className='min-h-screen bg-background text-foreground'>
      <div className='container mx-auto py-10'>
        <div className=' mx-auto'>
          <div className='flex justify-between items-center mb-8'>
            <div>
              <h1 className='text-4xl font-bold'>Shadcn UI Components</h1>
              <p className='text-lg text-muted-foreground mt-2'>
                A collection of reusable components built with Radix UI and
                Tailwind CSS.
              </p>
            </div>
          </div>

          <Card className='mb-8'>
            <CardHeader>
              <CardTitle>Theme Settings</CardTitle>
              <CardDescription>
                Customize the appearance of the components.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className='flex gap-2'>
                <Button
                  variant='outline'
                  onClick={() => setTheme('light')}
                  className={cn(
                    'border border-input',
                    theme === 'light' && 'border-primary'
                  )}
                >
                  Light
                </Button>
                <Button
                  variant='outline'
                  onClick={() => setTheme('dark')}
                  className={cn(
                    'border border-input',
                    theme === 'dark' && 'border-primary'
                  )}
                >
                  Dark
                </Button>
                <Button
                  variant='outline'
                  onClick={() => setTheme('system')}
                  className={cn(
                    'border border-input',
                    theme === 'system' && 'border-primary'
                  )}
                >
                  System
                </Button>
              </div>
            </CardContent>
          </Card>

          <Tabs defaultValue='buttons' className='space-y-4'>
            <TabsList className='grid w-full grid-cols-4 lg:grid-cols-9'>
              <TabsTrigger value='buttons'>Buttons</TabsTrigger>
              <TabsTrigger value='inputs'>Inputs</TabsTrigger>
              <TabsTrigger value='alerts'>Alerts</TabsTrigger>
              <TabsTrigger value='badges'>Badges</TabsTrigger>
              <TabsTrigger value='calendar'>Calendar</TabsTrigger>
              <TabsTrigger value='otp'>OTP Input</TabsTrigger>
              <TabsTrigger value='sheet'>Sheet</TabsTrigger>
              <TabsTrigger value='table'>Table</TabsTrigger>
              <TabsTrigger value='breadcrumb'>Breadcrumb</TabsTrigger>
            </TabsList>

            <TabsContent value='buttons' className='space-y-4'>
              <Card>
                <CardHeader>
                  <CardTitle>Buttons</CardTitle>
                  <CardDescription>
                    A collection of button variants and sizes with different
                    styles.
                  </CardDescription>
                </CardHeader>
                <CardContent className='space-y-4'>
                  <div className='space-x-2'>
                    <Button>Primary Button</Button>
                    <Button variant='secondary'>Secondary Button</Button>
                    <Button variant='outline'>Outline Button</Button>
                    <Button variant='ghost'>Ghost Button</Button>
                    <Button variant='destructive'>Destructive</Button>
                  </div>

                  <div className='space-x-2'>
                    <Button size='lg'>Large</Button>
                    <Button>Default</Button>
                    <Button size='sm'>Small</Button>
                  </div>

                  <div className='space-x-2'>
                    <Button>
                      <Plus className='mr-2 h-4 w-4' /> With Icon
                    </Button>
                    <Button variant='secondary'>
                      <Laptop className='mr-2 h-4 w-4' /> With Icon
                    </Button>
                    <Button variant='outline'>
                      <Phone className='mr-2 h-4 w-4' /> With Icon
                    </Button>
                  </div>

                  <div className='space-x-2'>
                    <Button disabled>
                      <Shield className='mr-2 h-4 w-4' /> Disabled
                    </Button>
                    <Button disabled variant='secondary'>
                      <CreditCard className='mr-2 h-4 w-4' /> Disabled
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value='inputs' className='space-y-4'>
              <Card>
                <CardHeader>
                  <CardTitle>Input Fields</CardTitle>
                  <CardDescription>
                    Various input field components for forms and data entry.
                  </CardDescription>
                </CardHeader>
                <CardContent className='space-y-4'>
                  <div className='grid gap-4'>
                    <Input type='email' placeholder='Email' />
                    <Input type='password' placeholder='Password' />
                    <Input type='text' placeholder='Disabled input' disabled />
                    <Textarea placeholder='Type your message here.' />
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder='Select an option' />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value='option1'>Option 1</SelectItem>
                        <SelectItem value='option2'>Option 2</SelectItem>
                        <SelectItem value='option3'>Option 3</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value='alerts' className='space-y-4'>
              <Card>
                <CardHeader>
                  <CardTitle>Alerts</CardTitle>
                  <CardDescription>
                    Display important messages and notifications.
                  </CardDescription>
                </CardHeader>
                <CardContent className='space-y-4'>
                  <Alert>
                    <Info className='h-4 w-4' />
                    <AlertTitle>Default Alert</AlertTitle>
                    <AlertDescription>
                      This is a default alert message.
                    </AlertDescription>
                  </Alert>
                  <Alert variant='destructive'>
                    <Info className='h-4 w-4' />
                    <AlertTitle>Destructive Alert</AlertTitle>
                    <AlertDescription>
                      This is a destructive alert message.
                    </AlertDescription>
                  </Alert>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Toast Notifications</CardTitle>
                  <CardDescription>
                    Different types of toast notifications
                  </CardDescription>
                </CardHeader>
                <CardContent className='grid gap-4'>
                  <div className='grid gap-2 w-12'>
                    <Button
                      variant='default'
                      onClick={() => {
                        toast({
                          title: 'Default Toast',
                          description: 'This is a default toast notification',
                        });
                      }}
                    >
                      Show Default Toast
                    </Button>
                    <Button
                      variant='destructive'
                      onClick={() => {
                        toast({
                          variant: 'destructive',
                          title: 'Error Toast',
                          description: 'Something went wrong!',
                        });
                      }}
                    >
                      Show Error Toast
                    </Button>
                    <Button
                      variant='outline'
                      onClick={() => {
                        toast({
                          title: 'With Action',
                          description: 'Toast with an action button',
                          action: (
                            <Button
                              variant='outline'
                              size='sm'
                              onClick={() => {
                                toast({
                                  description: 'Action clicked!',
                                });
                              }}
                            >
                              Undo
                            </Button>
                          ),
                        });
                      }}
                    >
                      Toast with Action
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value='badges' className='space-y-4'>
              <Card>
                <CardHeader>
                  <CardTitle>Badges</CardTitle>
                  <CardDescription>
                    Status indicators and labels.
                  </CardDescription>
                </CardHeader>
                <CardContent className='space-y-4'>
                  <div className='flex gap-2 flex-wrap'>
                    <Badge>Default</Badge>
                    <Badge variant='secondary'>Secondary</Badge>
                    <Badge variant='outline'>Outline</Badge>
                    <Badge variant='destructive'>Destructive</Badge>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value='calendar' className='space-y-4'>
              <Card>
                <CardHeader>
                  <CardTitle>Calendar</CardTitle>
                  <CardDescription>
                    A date picker component with various selection modes.
                  </CardDescription>
                </CardHeader>

                <CardContent className='flex justify-center'>
                  <Calendar
                    mode='single'
                    selected={date}
                    onSelect={setDate}
                    className='rounded-md border w-[300px]'
                  />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value='otp' className='space-y-4'>
              <Card>
                <CardHeader>
                  <CardTitle>OTP Input</CardTitle>
                  <CardDescription>
                    A one-time password input component with controlled state.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className='space-y-2'>
                    <InputOTP
                      maxLength={6}
                      value={otpValue}
                      onChange={(value) => setOtpValue(value)}
                    >
                      <InputOTPGroup>
                        <InputOTPSlot index={0} />
                        <InputOTPSlot index={1} />
                        <InputOTPSlot index={2} />
                        <InputOTPSlot index={3} />
                        <InputOTPSlot index={4} />
                        <InputOTPSlot index={5} />
                      </InputOTPGroup>
                    </InputOTP>
                    <div className='text-center text-sm text-muted-foreground'>
                      {otpValue === '' ? (
                        <>Enter your one-time password.</>
                      ) : (
                        <>You entered: {otpValue}</>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value='sheet' className='space-y-4'>
              <Card>
                <CardHeader>
                  <CardTitle>Sheet</CardTitle>
                  <CardDescription>
                    A slide-out panel component that can be triggered from any
                    side.
                  </CardDescription>
                </CardHeader>
                <CardContent className='space-x-4'>
                  <Sheet>
                    <SheetTrigger asChild>
                      <Button variant='outline'>Open Sheet</Button>
                    </SheetTrigger>
                    <SheetContent>
                      <SheetHeader>
                        <SheetTitle>Sheet Title</SheetTitle>
                        <SheetDescription>
                          This is a sheet component that slides out from the
                          side of the screen.
                        </SheetDescription>
                      </SheetHeader>
                      <div className='py-6'>Sheet content goes here...</div>
                    </SheetContent>
                  </Sheet>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value='table' className='space-y-4'>
              <div className='grid gap-4'>
                <Card>
                  <CardHeader>
                    <CardTitle>Data Table</CardTitle>
                    <CardDescription>
                      A fully featured data table with sorting, filtering, and
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
              </div>
            </TabsContent>

            <TabsContent value='breadcrumb' className='space-y-4'>
              <Card>
                <CardHeader>
                  <CardTitle>Breadcrumb</CardTitle>
                  <CardDescription>
                    A navigation component that helps users keep track of their
                    location.
                  </CardDescription>
                </CardHeader>
                <CardContent className='space-y-4'>
                  <div className='w-full'>
                    <Breadcrumb>
                      <BreadcrumbList>
                        <BreadcrumbItem>
                          <BreadcrumbLink asChild>
                            <Link href='/'>
                              <div className='flex items-center gap-2'>
                                <Home className='h-4 w-4' />
                                Home
                              </div>
                            </Link>
                          </BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                          <BreadcrumbEllipsis />
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                          <BreadcrumbLink asChild>
                            <Link href='/components'>Components</Link>
                          </BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                          <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
                        </BreadcrumbItem>
                      </BreadcrumbList>
                    </Breadcrumb>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </main>
  );
}
