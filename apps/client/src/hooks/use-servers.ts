import { useQuery } from '@apollo/client';
import {
  GetServerByProfileIdOfMemberQuery,
  GetServerByProfileIdOfMemberQueryVariables,
} from '../gql/graphql';
import { GET_SERVER_BY_PROFILE_ID_OF_MEMBER } from '../graphql/queries';
import { useProfileStore } from '../stores/profile-store';

export function useServers() {
  const profile = useProfileStore((state) => state.profile);
  console.log('profile', profile);

  const { data: dataServers, loading: loadingServers } = useQuery<
    GetServerByProfileIdOfMemberQuery,
    GetServerByProfileIdOfMemberQueryVariables
  >(GET_SERVER_BY_PROFILE_ID_OF_MEMBER, {
    variables: {
      profileId: Number(profile?.id),
    },
    skip: !profile?.id,
  });
  console.log('dataServers', dataServers);

  return {
    servers: dataServers?.getServerByProfileIdOfMember,
    loadingServers,
  };
}
