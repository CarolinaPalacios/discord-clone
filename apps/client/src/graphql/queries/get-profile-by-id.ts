import { gql } from '@apollo/client';

export const GET_PROFILE_BY_ID = gql`
  query GetProfileById($profileId: Float!) {
    getProfileById(profileId: $profileId) {
      id
      name
      email
      servers {
        id
        name
        profile {
          name
          id
        }
        channels {
          id
          name
          type
        }
      }
    }
  }
`;
