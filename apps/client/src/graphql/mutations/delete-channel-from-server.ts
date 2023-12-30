import { gql } from '@apollo/client';

export const DELETE_CHANNEL_FROM_SERVER = gql`
  mutation DeleteChannelFromServer($input: DeleteChannelFromServerDto!) {
    deleteChannelFromServer(input: $input)
  }
`;
