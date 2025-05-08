'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Eye, EyeOff, KeyRound } from 'lucide-react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
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
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from '@/components/ui/input-otp';

import { useAuth } from '@/contexts/AuthContext';

const resetPasswordSchema = z
  .object({
    email: z.string().email('Please enter a valid email address'),
    code: z
      .string()
      .min(6, 'Verification code must be 6 characters')
      .max(6, 'Verification code must be 6 characters')
      .regex(/^\d+$/, 'Verification code must contain only numbers'),
    password: z.string().min(8, 'Password must be at least 8 characters'),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

export type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;

export default function ResetPasswordForm() {
  const { resetPassword } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get('email') || '';

  const [isLoading, setIsLoading] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);

  const form = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      email,
      code: '',
      password: '',
      confirmPassword: '',
    },
  });

  async function onSubmit(values: ResetPasswordFormData) {
    try {
      setIsLoading(true);
      await resetPassword(values.email, values.code, values.password);
      logger.success('Password reset successfully');
      setSuccess(true);

      // Redirect to sign-in page after a short delay
      setTimeout(() => {
        router.push('/sign-in');
      }, 2000);
    } catch (error: unknown) {
      logger.error('Reset password error occurred', error);
      form.setError('root', {
        message: (error as Error).message || 'Failed to reset password',
      });
      setIsLoading(false);
    }
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <Card className='w-full'>
      <CardHeader className='space-y-1'>
        <CardTitle className='text-2xl'>Reset Password</CardTitle>
        <CardDescription>
          Enter your verification code and new password
        </CardDescription>
      </CardHeader>
      <CardContent>
        {success ? (
          <div className='flex flex-col items-center justify-center py-4 space-y-4'>
            <Icons.check className='h-8 w-8 text-green-500' />
            <p className='text-center'>
              Password reset successful! Redirecting to sign in...
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
                      <Input placeholder='Your email address' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='code'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Verification Code</FormLabel>
                    <FormControl>
                      <InputOTP maxLength={6} {...field}>
                        <InputOTPGroup>
                          <InputOTPSlot index={0} />
                          <InputOTPSlot index={1} />
                          <InputOTPSlot index={2} />
                          <InputOTPSlot index={3} />
                          <InputOTPSlot index={4} />
                          <InputOTPSlot index={5} />
                        </InputOTPGroup>
                      </InputOTP>
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
                    <FormLabel>New Password</FormLabel>
                    <FormControl>
                      <div className='relative'>
                        <Input
                          placeholder='Create a new password'
                          type={showPassword ? 'text' : 'password'}
                          {...field}
                        />
                        <button
                          type='button'
                          onClick={togglePasswordVisibility}
                          className='absolute right-3 top-2.5 text-muted-foreground'
                        >
                          {showPassword ? (
                            <EyeOff className='h-4 w-4' />
                          ) : (
                            <Eye className='h-4 w-4' />
                          )}
                        </button>
                      </div>
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
                      <div className='relative'>
                        <Input
                          placeholder='Confirm your new password'
                          type={showConfirmPassword ? 'text' : 'password'}
                          {...field}
                        />
                        <button
                          type='button'
                          onClick={toggleConfirmPasswordVisibility}
                          className='absolute right-3 top-2.5 text-muted-foreground'
                        >
                          {showConfirmPassword ? (
                            <EyeOff className='h-4 w-4' />
                          ) : (
                            <Eye className='h-4 w-4' />
                          )}
                        </button>
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
                  <KeyRound className='mr-2 h-4 w-4' />
                )}
                Reset Password
              </Button>
            </form>
          </Form>
        )}
      </CardContent>
      <CardFooter className='flex flex-col space-y-2'>
        <div className='text-sm text-center text-muted-foreground'>
          Didn't receive a code?{' '}
          <Link
            href='/forgot-password'
            className='underline underline-offset-4 hover:text-primary'
          >
            Request a new one
          </Link>
        </div>
      </CardFooter>
    </Card>
  );
}
