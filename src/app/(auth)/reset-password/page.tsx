import { Metadata } from 'next';
import { Suspense } from 'react';

import ResetPasswordForm from '@/components/forms/reset-password-form';
import { Icons } from '@/components/ui/icons';

export const metadata: Metadata = {
  title: 'Reset Password',
  description: 'Create a new password for your account',
};

export default function ResetPasswordPage() {
  return (
    <div className='flex justify-center items-center min-h-[calc(100vh-8rem)]'>
      <div className='w-full max-w-md'>
        <Suspense
          fallback={
            <div className='flex flex-col items-center justify-center py-8 space-y-4'>
              <Icons.spinner className='h-8 w-8 animate-spin text-primary' />
              <p className='text-sm text-muted-foreground'>Loading form...</p>
            </div>
          }
        >
          <ResetPasswordForm />
        </Suspense>
      </div>
    </div>
  );
}
