import { gql } from '@apollo/client';

export const GET_OR_CREATE_CONVERSATION = gql`
  mutation GetOrCreateConversation($input: GetOrCreateConversationDto!) {
    getOrCreateConversation(input: $input) {
      id
      memberOneId
      memberTwoId
      memberOne {
        profile {
          id
          name
          email
          imageUrl
        }
      }
      memberTwo {
        profile {
          id
          name
          email
          imageUrl
        }
      }
    }
  }
`;
