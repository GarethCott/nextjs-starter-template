import Link from 'next/link';

import { CounterDemo } from '@/components/counter/counter-demo';
import { CounterDisplay } from '@/components/counter/counter-display';

export default function CounterDemoPage() {
  return (
    <main className='container mx-auto py-8'>
      <h1 className='text-3xl font-bold mb-8 text-center'>
        Context Provider Demo
      </h1>

      <Link
        className='mb-8 block text-center text-blue-500 hover:text-blue-600'
        href='/counter-display'
      >
        Counter Display
      </Link>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
        <div className='flex flex-col gap-6'>
          <h2 className='text-xl font-semibold'>Counter Component</h2>
          <p className='text-gray-600'>
            This component includes the full counter interface with increment,
            decrement, reset, and setValue buttons. Any change here will be
            reflected in the display component.
          </p>
          <CounterDemo />
        </div>

        <div className='flex flex-col gap-6'>
          <h2 className='text-xl font-semibold'>Display Component</h2>
          <p className='text-gray-600'>
            This component only displays the counter value without any controls.
            It demonstrates how state is shared between components using
            context.
          </p>
          <CounterDisplay />
          <div className='mt-4'>
            <h3 className='text-lg font-semibold mb-2'>How it works:</h3>
            <ul className='list-disc pl-6 space-y-2 text-gray-600'>
              <li>
                Both components use the{' '}
                <code className='bg-gray-100 px-1 rounded'>useCounter()</code>{' '}
                hook to access counter state
              </li>
              <li>
                The state is maintained in{' '}
                <code className='bg-gray-100 px-1 rounded'>
                  CounterContext.tsx
                </code>
              </li>
              <li>
                Changes in one component are instantly reflected in the other
              </li>
              <li>No need to pass props through component trees</li>
            </ul>
          </div>
        </div>
      </div>
    </main>
  );
}
