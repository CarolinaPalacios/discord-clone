import { gql } from '@apollo/client';

export const CREATE_CHANNEL_MESSAGE = gql`
  mutation CreateChannelMessage(
    $input: CreateChannelMessageDto!
    $file: Upload
  ) {
    createChannelMessage(input: $input, file: $file) {
      id
      content
      fileUrl
      channel {
        id
        name
      }
      member {
        id
        name
        imageUrl
        profile {
          id
          name
        }
      }
    }
  }
`;
