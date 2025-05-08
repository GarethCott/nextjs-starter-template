'use client';

import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/toaster';

import { AuthProvider } from '@/contexts/AuthContext';
import { CounterProvider } from '@/contexts/CounterContext';

import { ApolloWrapper } from './apollo-provider';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <ThemeProvider
        attribute='class'
        defaultTheme='system'
        enableSystem
        disableTransitionOnChange
      >
        <ApolloWrapper>
          <CounterProvider>
            {children}
            <Toaster />
          </CounterProvider>
        </ApolloWrapper>
      </ThemeProvider>
    </AuthProvider>
  );
}
