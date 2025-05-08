'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Mail } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import * as React from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import logger from '@/lib/logger';

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
import { Icons } from '@/components/ui/icons';
import { Input } from '@/components/ui/input';

import { useAuth } from '@/contexts/AuthContext';

const forgotPasswordSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
});

export type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;

export default function ForgotPasswordForm() {
  const { forgotPassword } = useAuth();
  const router = useRouter();
  const [isLoading, setIsLoading] = React.useState(false);
  const [success, setSuccess] = React.useState(false);

  const form = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: '',
    },
  });

  async function onSubmit(values: ForgotPasswordFormData) {
    try {
      setIsLoading(true);
      await forgotPassword(values.email);
      logger.success('Password reset email sent successfully');
      setSuccess(true);

      // Navigate to reset-password page after a short delay
      setTimeout(() => {
        router.push(
          `/reset-password?email=${encodeURIComponent(values.email)}`,
        );
      }, 2000);
    } catch (error: unknown) {
      logger.error('Forgot password error occurred', error);
      form.setError('root', {
        message: (error as Error).message || 'Failed to send reset email',
      });
      setIsLoading(false);
    }
  }

  return (
    <Card className='w-full'>
      <CardHeader className='space-y-1'>
        <CardTitle className='text-2xl'>Forgot Password</CardTitle>
        <CardDescription>
          Enter your email to receive a password reset code
        </CardDescription>
      </CardHeader>
      <CardContent>
        {success ? (
          <div className='flex flex-col items-center justify-center py-4 space-y-4'>
            <Icons.check className='h-8 w-8 text-green-500' />
            <p className='text-center'>
              Reset code sent! Redirecting you to reset your password...
            </p>
          </div>
        ) : (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
              <FormField
                control={form.control}
                name='email'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <div className='flex items-center border rounded-md focus-within:ring-1 focus-within:ring-primary'>
                        <div className='flex items-center justify-center w-10 h-10 pointer-events-none'>
                          <Mail className='h-5 w-5 text-muted-foreground' />
                        </div>
                        <Input
                          placeholder='Enter your email'
                          className='flex-1 border-0 focus-visible:ring-0 focus-visible:ring-offset-0'
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {form.formState.errors.root && (
                <p className='text-sm text-red-500 mt-2'>
                  {form.formState.errors.root.message}
                </p>
              )}
              <Button type='submit' className='w-full' disabled={isLoading}>
                {isLoading ? (
                  <Icons.spinner className='mr-2 h-4 w-4 animate-spin' />
                ) : (
                  <Mail className='mr-2 h-4 w-4' />
                )}
                Send Reset Code
              </Button>
            </form>
          </Form>
        )}
      </CardContent>
      <CardFooter className='flex flex-col space-y-2'>
        <div className='text-sm text-center text-muted-foreground'>
          Remember your password?{' '}
          <Link
            href='/sign-in'
            className='underline underline-offset-4 hover:text-primary'
          >
            Sign in
          </Link>
        </div>
      </CardFooter>
    </Card>
  );
}
