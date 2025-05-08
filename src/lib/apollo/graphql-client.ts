import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

// Create an HTTP link to your Hasura endpoint
const httpLink = createHttpLink({
  uri: process.env.NEXT_PUBLIC_HASURA_GRAPHQL_URL,
  // Include credentials to send cookies with every request
  credentials: 'include',
});

// Create Apollo Client instance
export const createApolloClient = () => {
  // Auth link middleware
  const authLink = setContext((_, { headers }) => {
    // Return the headers to the context so httpLink can read them
    // The middleware already sets x-auth-token and x-user-id cookies
    // We only need basic headers here
    return {
      headers: {
        ...headers,
        // You can add additional headers if needed, but auth comes from cookies
      },
    };
  });

  return new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
    defaultOptions: {
      watchQuery: {
        fetchPolicy: 'cache-and-network',
      },
      query: {
        fetchPolicy: 'network-only', // Doesn't check cache before making a request
        errorPolicy: 'all',
      },
      mutate: {
        errorPolicy: 'all',
      },
    },
  });
};
