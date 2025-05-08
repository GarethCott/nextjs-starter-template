'use client';

import { Icons } from '@/components/ui/icons';

export default function ForgotPasswordLoading() {
  return (
    <div className='flex justify-center items-center min-h-[calc(100vh-8rem)]'>
      <div className='w-full max-w-md'>
        <div className='flex flex-col items-center justify-center py-8 space-y-4'>
          <Icons.spinner className='h-8 w-8 animate-spin text-primary' />
          <p className='text-sm text-muted-foreground'>
            Loading password reset form...
          </p>
        </div>
      </div>
    </div>
  );
}
