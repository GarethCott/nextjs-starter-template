import { Metadata } from 'next';
import React, { Suspense } from 'react';

import SignInForm from '@/components/forms/sign-in-form';

export const metadata: Metadata = {
  title: 'Sign In',
  description: 'Sign in to your account',
};

export default function SignInPage() {
  return (
    <div className='flex justify-center items-center min-h-[60vh]'>
      <div className='w-full max-w-md'>
        <Suspense fallback={null}>
          <SignInForm />
        </Suspense>
      </div>
    </div>
  );
}
