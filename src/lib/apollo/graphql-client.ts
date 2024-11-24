import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

// Create an HTTP link to your Hasura endpoint
const httpLink = createHttpLink({
  uri: process.env.NEXT_PUBLIC_HASURA_GRAPHQL_URL,
});

// Auth link middleware to add headers
const authLink = setContext(async (_, { headers }) => {
  // For client-side requests, we'll use the auth token from the x-auth-token header
  // This header is set by our middleware
  const response = await fetch('/api/auth/token');
  const { token, role, userId } = await response.json();

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
      'x-hasura-role': role || 'anonymous',
      'x-hasura-user-id': userId || '',
    },
  };
});

// Create Apollo Client instance
export const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'cache-and-network',
    },
  },
});
