import { gql } from '@apollo/client';

export const GET_SERVER_BY_ID = gql`
  query GetServerById($id: Float!) {
    getServerById(id: $id) {
      id
      profileId
      name
      imageUrl
      inviteCode
      channels {
        id
        type
        name
      }

      members {
        id
        role
        profileId
        profile {
          id
          name
          imageUrl
          email
        }
      }
      profile {
        id
        name
        imageUrl
        email
      }
    }
  }
`;
