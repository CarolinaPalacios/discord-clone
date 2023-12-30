import { gql } from '@apollo/client';

export const ADD_MEMBER_TO_SERVER = gql`
  mutation AddMemberToServer($inviteCode: String!) {
    addMemberToServer(inviteCode: $inviteCode) {
      id
      name
    }
  }
`;
