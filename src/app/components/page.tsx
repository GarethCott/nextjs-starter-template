'use client';

import { CreditCard, Info, Laptop, Phone, Plus, Shield } from 'lucide-react';
import { useTheme } from 'next-themes';
import React from 'react';

import { cn } from '@/lib/utils';

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/components/ui/use-toast';

export default function ComponentPage() {
  const { theme, setTheme } = useTheme();

  return (
    <main className='min-h-screen bg-background text-foreground'>
      <div className='container mx-auto py-10'>
        <div className='max-w-4xl mx-auto'>
          <div className='flex justify-between items-center mb-8'>
            <div>
              <h1 className='text-4xl font-bold'>Shadcn UI Components</h1>
              <p className='text-lg text-muted-foreground mt-2'>
                A collection of reusable components built with Radix UI and
                Tailwind CSS.
              </p>
            </div>
          </div>

          <Tabs defaultValue='buttons' className='space-y-4'>
            <TabsList>
              <TabsTrigger value='buttons'>Buttons</TabsTrigger>
              <TabsTrigger value='inputs'>Inputs</TabsTrigger>
              <TabsTrigger value='alerts'>Alerts</TabsTrigger>
              <TabsTrigger value='badges'>Badges</TabsTrigger>
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
          </Tabs>

          <Card className='mt-8'>
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
        </div>
      </div>
    </main>
  );
}
