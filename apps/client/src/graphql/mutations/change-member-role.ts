import { gql } from '@apollo/client';

export const CHANGE_MEMBER_ROLE = gql`
  mutation ChangeMemberRole($input: ChangeMemberRoleDto!) {
    changeMemberRole(input: $input) {
      id
      name
      imageUrl
      members {
        id
        role
      }
    }
  }
`;
