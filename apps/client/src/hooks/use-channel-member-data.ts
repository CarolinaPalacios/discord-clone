import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { useProfileStore } from '../stores/profile-store';
import { GetMemberByProfileIdQuery } from '../gql/graphql';
import { GET_MEMBER_BY_PROFILE_ID } from '../graphql/queries';

export function useChannelMemberData() {
  const profileId = useProfileStore((state) => state.profile?.id);
  const { serverId } = useParams<{ serverId: string }>();

  const { data: dataGetMemberByProfileId, ...queryProps } =
    useQuery<GetMemberByProfileIdQuery>(GET_MEMBER_BY_PROFILE_ID, {
      variables: {
        profileId,
        serverId: Number(serverId),
      },
      skip: !profileId,
    });

  return {
    profileId,
    serverId: Number(serverId),
    member: dataGetMemberByProfileId?.getMemberByProfileId,
    ...queryProps,
  };
}
