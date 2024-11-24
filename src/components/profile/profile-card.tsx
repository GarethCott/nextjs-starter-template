'use client';

import { useQuery } from '@apollo/client';
import { gql } from '@apollo/client';
import Image from 'next/image';

const GET_PROFILE = gql`
  query GetProfile {
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

export function ProfileCard() {
  // This uses the client-side Apollo client
  const { loading, error, data } = useQuery(GET_PROFILE);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const user = data.users[0];

  return (
    <div className='p-4 border rounded-lg'>
      <div className='flex items-center gap-4'>
        {user.profile?.avatar_url && (
          <Image
            src={user.profile.avatar_url}
            alt={user.name}
            className='w-16 h-16 rounded-full'
          />
        )}
        <div>
          <h2 className='text-xl font-bold'>{user.name}</h2>
          <p className='text-gray-600'>{user.email}</p>
        </div>
      </div>
      {user.profile?.bio && (
        <p className='mt-4 text-gray-700'>{user.profile.bio}</p>
      )}
    </div>
  );
}
