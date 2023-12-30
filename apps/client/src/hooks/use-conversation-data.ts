import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useMutation, useQuery } from '@apollo/client';
import { useProfileStore } from '../stores/profile-store';
import {
  GetMemberByProfileIdQuery,
  GetMemberByProfileIdQueryVariables,
  GetOrCreateConversationMutation,
  GetOrCreateConversationMutationVariables,
} from '../gql/graphql';
import { GET_MEMBER_BY_PROFILE_ID } from '../graphql/queries';
import { GET_OR_CREATE_CONVERSATION } from '../graphql/mutations';

interface UseConversationArgs {
  memberId?: number | null;
}

export function useConversationData({ memberId }: UseConversationArgs) {
  const { serverId } = useParams<{ serverId: string }>();

  const profileId = useProfileStore((state) => state.profile?.id);

  const { data: dataGetMemberByProfileId } = useQuery<
    GetMemberByProfileIdQuery,
    GetMemberByProfileIdQueryVariables
  >(GET_MEMBER_BY_PROFILE_ID, {
    variables: {
      profileId: Number(profileId),
      serverId: Number(serverId),
    },
  });

  console.log(dataGetMemberByProfileId?.getMemberByProfileId.id, memberId);

  const [getOrCreateConversation, { data: dataConversation }] = useMutation<
    GetOrCreateConversationMutation,
    GetOrCreateConversationMutationVariables
  >(GET_OR_CREATE_CONVERSATION, {
    variables: {
      input: {
        memberOneId: Number(dataGetMemberByProfileId?.getMemberByProfileId.id),
        memberTwoId: Number(memberId),
      },
    },
    onError: (error) => {
      console.log(error);
    },
  });

  useEffect(() => {
    if (!dataGetMemberByProfileId?.getMemberByProfileId) return;
    getOrCreateConversation();
  }, [
    getOrCreateConversation,
    memberId,
    profileId,
    dataGetMemberByProfileId?.getMemberByProfileId,
  ]);

  return {
    dataGetMemberByProfileId,
    getOrCreateConversation,
    conversation: dataConversation?.getOrCreateConversation,
  };
}
