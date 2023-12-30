import { gql } from '@apollo/client';

export const DELETE_MEMBER_FROM_SERVER = gql`
  mutation DeleteMemberFromServer($input: DeleteMemberDto!) {
    deleteMemberFromServer(input: $input) {
      id
      name
      imageUrl
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
    }
  }
`;
