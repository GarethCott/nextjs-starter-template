'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import * as React from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';

import { useAuth } from '@/contexts/AuthContext';

const signInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});

export default function SignInPage() {
  const { signIn } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const { toast } = useToast();
  const message = searchParams.get('message');

  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  React.useEffect(() => {
    if (message) {
      toast({
        title: 'Verification Email Sent',
        description: message,
      });
    }
  }, [message, toast]);

  async function onSubmit(values: z.infer<typeof signInSchema>) {
    try {
      await signIn(values.email, values.password);
      router.push('/dashboard');
    } catch (error: unknown) {
      // eslint-disable-next-line no-console
      console.error('Sign in error:', error);
      form.setError('root', {
        message: (error as Error).message || 'Failed to sign in',
      });
    }
  }

  return (
    <>
      <Card>
        <CardHeader className='space-y-1'>
          <CardTitle className='text-2xl font-bold'>Sign in</CardTitle>
          <CardDescription>
            Enter your email and password to sign in to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
              <FormField
                control={form.control}
                name='email'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        placeholder='m@example.com'
                        type='email'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='password'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        placeholder='Enter your password'
                        type='password'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {form.formState.errors.root && (
                <div className='text-sm font-medium text-destructive'>
                  {form.formState.errors.root.message}
                </div>
              )}
              <Button type='submit' className='w-full'>
                Sign In
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter className='flex flex-wrap items-center justify-between gap-2'>
          <div className='text-sm text-muted-foreground'>
            <span className='mr-1'>Don&apos;t have an account?</span>
            <Link
              href='/sign-up'
              className='text-primary underline-offset-4 transition-colors hover:underline'
            >
              Sign up
            </Link>
          </div>
          <Link
            href='/forgot-password'
            className='text-sm text-primary underline-offset-4 transition-colors hover:underline'
          >
            Forgot password?
          </Link>
        </CardFooter>
      </Card>
    </>
  );
}
