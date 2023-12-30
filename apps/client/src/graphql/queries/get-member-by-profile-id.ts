import { gql } from '@apollo/client';

export const GET_MEMBER_BY_PROFILE_ID = gql`
  query GetMemberByProfileId($profileId: Float!, $serverId: Float!) {
    getMemberByProfileId(profileId: $profileId, serverId: $serverId) {
      id
      role
      profile {
        id
        name
        email
      }
    }
  }
`;
