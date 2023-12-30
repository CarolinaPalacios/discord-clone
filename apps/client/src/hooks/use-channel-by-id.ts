import { useNavigate, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import {
  GetChannelByIdQuery,
  GetChannelByIdQueryVariables,
} from '../gql/graphql';
import { GET_CHANNEL_BY_ID } from '../graphql/queries';

interface UseChannelByIdArgs {
  channelId: number;
}

export function useChannelById({ channelId }: UseChannelByIdArgs) {
  const navigate = useNavigate();
  const { serverId } = useParams<{ serverId: string }>();

  const { data } = useQuery<GetChannelByIdQuery, GetChannelByIdQueryVariables>(
    GET_CHANNEL_BY_ID,
    {
      variables: {
        input: {
          channelId,
          serverId: Number(serverId),
        },
      },
      skip: !channelId,
      onError: (error) => {
        navigate('/');
      },
    }
  );

  return data?.getChannelById;
}
