import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { headers } from 'next/headers';

// Create an HTTP link to your Hasura endpoint
const httpLink = createHttpLink({
  uri: process.env.NEXT_PUBLIC_HASURA_GRAPHQL_URL,
});

// Auth link middleware to add headers from server context
const authLink = setContext(async (_, { headers: existingHeaders }) => {
  const headersList = headers();
  const authToken = headersList.get('x-auth-token');
  const userRole = headersList.get('x-user-role');
  const userId = headersList.get('x-user-id');

  return {
    headers: {
      ...existingHeaders,
      authorization: authToken ? `Bearer ${authToken}` : '',
      'x-hasura-role': userRole || 'anonymous',
      'x-hasura-user-id': userId || '',
    },
  };
});

// Create Apollo Client instance for server-side operations
export const serverClient = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
  defaultOptions: {
    query: {
      fetchPolicy: 'no-cache', // Disable caching for server-side operations
    },
  },
});
