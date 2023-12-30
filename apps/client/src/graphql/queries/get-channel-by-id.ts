import { gql } from '@apollo/client';

export const GET_CHANNEL_BY_ID = gql`
  query GetChannelById($input: FindChannelByIdDto!) {
    getChannelById(input: $input) {
      id
      name
      type
      members {
        id
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
