import { Metadata } from 'next';
import React, { Suspense } from 'react';

import SignUpForm from '@/components/forms/sign-up-form';

export const metadata: Metadata = {
  title: 'Sign Up',
  description: 'Create a new account',
};

export default function SignUpPage() {
  return (
    <div className='flex justify-center items-center min-h-[60vh]'>
      <div className='w-full max-w-md'>
        <Suspense fallback={null}>
          <SignUpForm />
        </Suspense>
      </div>
    </div>
  );
}
