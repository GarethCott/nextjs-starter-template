'use client';

import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { useState } from 'react';

import { useAuth } from '@/contexts/AuthContext';

export function ApolloWrapper({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const [client] = useState(
    () =>
      new ApolloClient({
        uri: process.env.NEXT_PUBLIC_HASURA_GRAPHQL_URL,
        cache: new InMemoryCache(),
        headers: {
          'x-hasura-admin-secret':
            process.env.NEXT_PUBLIC_HASURA_ADMIN_SECRET || '',
          ...(user && {
            Authorization: `Bearer ${user.signInUserSession.accessToken.jwtToken}`,
          }),
        },
      }),
  );

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}
