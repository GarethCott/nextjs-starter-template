'use client';

import { createContext, useContext, useState } from 'react';

// Define the context type
interface CounterContextType {
  count: number;
  increment: () => void;
  decrement: () => void;
  reset: () => void;
  setValue: (value: number) => void;
}

// Create the context with undefined as default value
const CounterContext = createContext<CounterContextType | undefined>(undefined);

// Create the provider component
export function CounterProvider({ children }: { children: React.ReactNode }) {
  const [count, setCount] = useState(0);

  const increment = () => setCount((prev) => prev + 1);
  const decrement = () => setCount((prev) => prev - 1);
  const reset = () => setCount(0);
  const setValue = (value: number) => setCount(value);

  // Value object that will be provided to consumers
  const value = {
    count,
    increment,
    decrement,
    reset,
    setValue,
  };

  return (
    <CounterContext.Provider value={value}>{children}</CounterContext.Provider>
  );
}

// Custom hook to use the counter context
export function useCounter() {
  const context = useContext(CounterContext);

  if (context === undefined) {
    throw new Error('useCounter must be used within a CounterProvider');
  }

  return context;
}
