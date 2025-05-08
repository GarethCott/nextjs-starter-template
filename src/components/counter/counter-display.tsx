'use client';

import { useCounter } from '@/contexts/CounterContext';

export function CounterDisplay() {
  const { count } = useCounter();

  return (
    <div className='flex flex-col items-center gap-2 p-4 border rounded-lg shadow-sm'>
      <h3 className='text-lg font-semibold'>Counter Display</h3>
      <p className='text-2xl font-bold'>{count}</p>
      <p className='text-sm text-gray-500'>
        This component only displays the count
      </p>
    </div>
  );
}
