'use server';

// !STARTERCONF This is an example file that can be removed

import { gql } from '@apollo/client';

import { serverClient } from '@/lib/apollo/server-graphql-client';
import logger from '@/lib/logger';

// Example query that requires authentication
const GET_USER_PROFILE = gql`
  query GetUserProfile {
    users {
      id
      name
      email
      profile {
        avatar_url
        bio
      }
    }
  }
`;

export async function getUserProfile() {
  try {
    // The serverClient will automatically include the auth headers
    const result = await serverClient.query({
      query: GET_USER_PROFILE,
    });

    return {
      success: true,
      data: result.data.users[0],
    };
  } catch (error) {
    logger.error('Error fetching user profile', error);
    return {
      success: false,
      error: 'Failed to fetch user profile',
    };
  }
}
