'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
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

import { useAuth } from '@/contexts/AuthContext';

const signUpSchema = z
  .object({
    email: z.string().email(),
    password: z.string().min(8, 'Password must be at least 8 characters'),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

export default function SignUpPage() {
  const router = useRouter();
  const { signUp } = useAuth();

  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  async function onSubmit(values: z.infer<typeof signUpSchema>) {
    try {
      await signUp(values.email, values.password);
      router.push(
        '/sign-in?message=Please check your email to verify your account',
      );
    } catch (error: unknown) {
      // eslint-disable-next-line no-console
      console.error('Sign up error:', error);
      form.setError('root', {
        message: (error as Error).message || 'Failed to sign up',
      });
    }
  }

  return (
    <>
      <Card>
        <CardHeader className='space-y-1'>
          <CardTitle className='text-2xl font-bold'>
            Create an account
          </CardTitle>
          <CardDescription>
            Enter your email below to create your account
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
              <FormField
                control={form.control}
                name='confirmPassword'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <Input
                        placeholder='Confirm your password'
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
                Create Account
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter>
          <div className='text-sm text-muted-foreground'>
            Already have an account?{' '}
            <Link
              href='/sign-in'
              className='text-primary underline-offset-4 transition-colors hover:underline'
            >
              Sign in
            </Link>
          </div>
        </CardFooter>
      </Card>
    </>
  );
}
