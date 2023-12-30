import { gql } from '@apollo/client';

export const UPDATE_CHANNEL = gql`
  mutation UpdateChannel($input: UpdateChannelDto!) {
    updateChannel(input: $input) {
      id
      name
      type
    }
  }
`;
