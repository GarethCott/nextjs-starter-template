'use client';

import { motion } from 'framer-motion';
import { AlertCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React from 'react';

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import Heading from '@/components/ui/heading';

type ErrorStateProps = {
  title?: string;
  subtitle?: string;
  error?: Error;
  reset?: () => void;
  showReset?: boolean;
  showHomeButton?: boolean;
  resetButtonLabel?: string;
  homeButtonLabel?: string;
};

const ErrorState: React.FC<ErrorStateProps> = ({
  title = 'Oops! Something went wrong',
  subtitle = 'We apologize for the inconvenience. An error has occurred.',
  error,
  reset,
  showReset = true,
  showHomeButton = true,
  resetButtonLabel = 'Try Again',
  homeButtonLabel = 'Go to Homepage',
}) => {
  const router = useRouter();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      className='min-h-[60vh] flex flex-col gap-6 justify-center items-center p-4'
    >
      <AlertCircle className='h-12 w-12 text-destructive' />
      <Heading center title={title} description={subtitle} />

      {error && (
        <Alert variant='destructive' className='max-w-md w-full'>
          <AlertCircle className='h-4 w-4' />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            {error.message || 'An unexpected error occurred.'}
          </AlertDescription>
        </Alert>
      )}

      <div className='flex flex-col sm:flex-row gap-4 mt-4'>
        {showReset && reset && (
          <Button onClick={() => reset()}>{resetButtonLabel}</Button>
        )}
        {showHomeButton && (
          <Button variant='outline' onClick={() => router.push('/dashboard')}>
            {homeButtonLabel}
          </Button>
        )}
      </div>

      <p className='text-center text-sm text-muted-foreground mt-6'>
        If the problem persists, please contact our support team.
      </p>
    </motion.div>
  );
};

export default ErrorState;
