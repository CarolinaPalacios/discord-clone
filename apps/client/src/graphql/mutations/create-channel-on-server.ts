import { gql } from '@apollo/client';

export const CREATE_CHANNEL_ON_SERVER = gql`
  mutation CreateChannelOnServer($input: CreateChannelOnServerDto!) {
    createChannelOnServer(input: $input) {
      id
      name
      imageUrl
      members {
        id
      }
    }
  }
`;
