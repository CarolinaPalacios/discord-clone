import { gql } from '@apollo/client';

export const GET_MEMBER_BY_ID = gql`
  query GetMemberById($memberId: Float!, $serverId: Float!) {
    getMemberById(memberId: $memberId, serverId: $serverId) {
      id
      role
      profile {
        id
        name
        email
        imageUrl
        servers {
          id
          name
          channels {
            id
            name
            type
          }
        }
      }
    }
  }
`;
