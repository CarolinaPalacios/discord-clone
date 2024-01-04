import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { useProfileStore } from '../stores/profile-store';
import { GET_SERVER_BY_ID, GET_PROFILE_BY_ID } from '../graphql/queries';
import {
  ChannelType,
  GetProfileByIdQuery,
  GetProfileByIdQueryVariables,
  GetServerByIdQuery,
  GetServerByIdQueryVariables,
} from '../gql/graphql';

export function useServer() {
  const [activeMemberId, setActiveMemberId] = useState<number | null>(null);
  const [activeChannel, setActiveChannelId] = useState<number | null>(null);

  const navigate = useNavigate();
  const { serverId, channelId, memberId } = useParams<{
    serverId: string;
    channelId: string;
    memberId: string;
  }>();

  const profile = useProfileStore((state) => state.profile);

  const { data: dataProfileById } = useQuery<
    GetProfileByIdQuery,
    GetProfileByIdQueryVariables
  >(GET_PROFILE_BY_ID, {
    variables: {
      profileId: Number(profile?.id),
    },
    onError: (error) => {
      console.log(error);
    },
    skip: !profile?.id,
  });

  const { data: dataServerById } = useQuery<
    GetServerByIdQuery,
    GetServerByIdQueryVariables
  >(GET_SERVER_BY_ID, {
    variables: {
      id: Number(serverId),
    },
    skip: !serverId,
    onError: (error) => {
      const errorCode = error?.graphQLErrors[0]?.extensions?.code;
      if (errorCode === 'SERVER_NOT_FOUND') navigate('/server');
    },
  });

  const textChannels =
    dataServerById?.getServerById?.channels?.filter(
      (channel) => channel.type === ChannelType.Text
    ) || [];

  const audioChannels =
    dataServerById?.getServerById?.channels?.filter(
      (channel) => channel.type === ChannelType.Audio
    ) || [];

  const videoChannels =
    dataServerById?.getServerById?.channels?.filter(
      (channel) => channel.type === ChannelType.Video
    ) || [];

  const members =
    dataServerById?.getServerById?.members?.filter(
      (member) => member.profileId !== dataProfileById?.getProfileById?.id
    ) || [];

  const role = dataServerById?.getServerById?.members?.find(
    (member) => member.profileId === dataProfileById?.getProfileById?.id
  )?.role;

  // const activeChannelId =
  //   channelId ||
  //   textChannels.find((ch) => ch?.name?.toLowerCase() === 'general')?.id;

  useEffect(() => {
    if (!channelId && !memberId && textChannels.length) {
      navigate(`/server/${serverId}/channels/TEXT/${textChannels[0]?.id}`);
    }
  });

  useEffect(() => {
    if (memberId) {
      setActiveMemberId(Number(memberId));
      setActiveChannelId(null);
    }

    if (channelId) {
      setActiveChannelId(Number(channelId));
      setActiveMemberId(null);
    }
  }, [memberId, channelId]);

  return {
    serverId,
    channelId,
    memberId,
    textChannels,
    audioChannels,
    videoChannels,
    server: dataServerById?.getServerById,
    role,
    members,
    activeMemberId,
    activeChannel,
  };
}
