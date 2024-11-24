'use client';

import { ApolloWrapper } from './apollo-provider';

export function Providers({ children }: { children: React.ReactNode }) {
  return <ApolloWrapper>{children}</ApolloWrapper>;
}
