import { gql } from '@apollo/client';

export const DELETE_SERVER = gql`
  mutation DeleteServer($input: DeleteServerDto!) {
    deleteServer(input: $input)
  }
`;
