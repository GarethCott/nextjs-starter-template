import { gql } from '@apollo/client';

// Example query - replace with your actual Hasura queries
export const GET_USERS = gql`
  query GetUsers {
    users {
      id
      name
      email
      created_at
    }
  }
`;
