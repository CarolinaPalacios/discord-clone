import { gql } from '@apollo/client';

export const LEAVE_SERVER = gql`
  mutation LeaveServer($input: LeaveServerDto!) {
    leaveServer(input: $input)
  }
`;
