import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';

// Create an HTTP link to your Hasura endpoint
const httpLink = createHttpLink({
  uri: process.env.NEXT_PUBLIC_HASURA_GRAPHQL_URL,
});

// Create Apollo Client instance with basic configuration
export const createApolloClient = (token?: string) => {
  return new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache(),
    headers: {
      'x-hasura-admin-secret':
        process.env.NEXT_PUBLIC_HASURA_ADMIN_SECRET || '',
      ...(token && {
        Authorization: `Bearer ${token}`,
      }),
    },
    defaultOptions: {
      watchQuery: {
        fetchPolicy: 'cache-and-network',
      },
    },
  });
};
