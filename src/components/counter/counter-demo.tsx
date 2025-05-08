'use client';

import { Button } from '@/components/ui/button';

import { useCounter } from '@/contexts/CounterContext';

export function CounterDemo() {
  const { count, increment, decrement, reset, setValue } = useCounter();

  return (
    <div className='flex flex-col items-center gap-4 p-6 border rounded-lg shadow-sm'>
      <h2 className='text-2xl font-bold'>Counter Demo</h2>
      <p className='text-4xl font-bold'>{count}</p>

      <div className='flex gap-2'>
        <Button onClick={decrement} variant='outline'>
          Decrement
        </Button>
        <Button onClick={increment} variant='default'>
          Increment
        </Button>
        <Button onClick={reset} variant='destructive'>
          Reset
        </Button>
      </div>

      <div className='flex gap-2 mt-4'>
        <Button onClick={() => setValue(10)} variant='secondary'>
          Set to 10
        </Button>
        <Button onClick={() => setValue(100)} variant='secondary'>
          Set to 100
        </Button>
      </div>
    </div>
  );
}
