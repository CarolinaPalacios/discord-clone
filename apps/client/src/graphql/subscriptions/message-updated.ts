import { gql } from '@apollo/client';

export const MESSAGE_UPDATED = gql`
  subscription MessageUpdated($conversationId: Float, $channelId: Float) {
    messageUpdated(conversationId: $conversationId, channelId: $channelId) {
      message {
        ... on DirectMessage {
          id
          content
          deleted
          updatedAt
          createdAt
          conversationId
          fileUrl
          member {
            role
            id
            profileId
            profile {
              email
              id
              name
              imageUrl
            }
          }
        }
        ... on Message {
          id
          content
          deleted
          updatedAt
          createdAt
          fileUrl
          channel {
            id
          }
          member {
            role
            id
            profileId
            profile {
              email
              id
              name
              imageUrl
            }
          }
        }
      }
    }
  }
`;
