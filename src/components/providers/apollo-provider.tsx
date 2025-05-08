'use client';

import { ApolloProvider } from '@apollo/client';
import { useEffect, useState } from 'react';

import { createApolloClient } from '@/lib/apollo/graphql-client';

// Token refresh interval in milliseconds (15 minutes)
const TOKEN_REFRESH_INTERVAL = 15 * 60 * 1000;

export function ApolloWrapper({ children }: { children: React.ReactNode }) {
  const [client, setClient] = useState(createApolloClient());

  useEffect(() => {
    let refreshInterval: NodeJS.Timeout | null = null;

    // Create Apollo client that will use auth token from cookies
    // The token is already set by middleware
    const apolloClient = createApolloClient();
    setClient(apolloClient);

    // Setup refresh interval
    refreshInterval = setInterval(async () => {
      // Force a client refresh which will use the latest cookies
      setClient(createApolloClient());
    }, TOKEN_REFRESH_INTERVAL);

    return () => {
      if (refreshInterval) {
        clearInterval(refreshInterval);
      }
    };
  }, []);

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}
