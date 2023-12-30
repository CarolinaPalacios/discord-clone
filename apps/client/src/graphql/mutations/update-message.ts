import { gql } from '@apollo/client';

export const UPDATE_MESSAGE = gql`
  mutation UpdateMessage(
    $messageId: Float!
    $content: String!
    $channelId: Float
    $conversationId: Float
  ) {
    updateMessage(
      messageId: $messageId
      content: $content
      channelId: $channelId
      conversationId: $conversationId
    ) {
      message {
        ... on DirectMessage {
          content
          updatedAt
        }
        ... on Message {
          content
          updatedAt
        }
      }
    }
  }
`;
