import { gql } from '@apollo/client';

export const GET_SERVER_BY_PROFILE_ID_OF_MEMBER = gql`
  query GetServerByProfileIdOfMember($profileId: Float!) {
    getServerByProfileIdOfMember(profileId: $profileId) {
      id
      name
      imageUrl
    }
  }
`;
