import { useQuery } from '@apollo/client';
import {
  GetMemberByProfileIdQuery,
  MemberRole,
  MessageUnion,
} from '../gql/graphql';
import { GET_MEMBER_BY_PROFILE_ID } from '../graphql/queries';

interface UseMessageRoleArgs {
  message: MessageUnion;
  profileId: number | undefined | null;
  serverId: number | undefined;
}

export function useMessageRole({
  message,
  profileId,
  serverId,
}: UseMessageRoleArgs) {
  const { data } = useQuery<GetMemberByProfileIdQuery>(
    GET_MEMBER_BY_PROFILE_ID,
    {
      variables: { profileId, serverId: Number(serverId) },
      skip: !profileId,
    }
  );

  const canDeleteMessage =
    message.member?.id === data?.getMemberByProfileId?.id ||
    data?.getMemberByProfileId.role === MemberRole.Admin ||
    data?.getMemberByProfileId.role === MemberRole.Moderator;

  const canUpdateMessage = message.member?.id === data?.getMemberByProfileId.id;

  return { canDeleteMessage, canUpdateMessage };
}
