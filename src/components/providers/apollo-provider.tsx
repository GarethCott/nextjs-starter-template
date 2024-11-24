'use client';

import { ApolloProvider } from '@apollo/client';
import { useEffect, useState } from 'react';

import { createApolloClient } from '@/lib/apollo/graphql-client';

import { useAuth } from '@/contexts/AuthContext';

export function ApolloWrapper({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const [client, setClient] = useState(createApolloClient());

  useEffect(() => {
    if (user) {
      const token = user.signInUserSession.accessToken.jwtToken;
      setClient(createApolloClient(token));
    } else {
      setClient(createApolloClient());
    }
  }, [user]);

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}
