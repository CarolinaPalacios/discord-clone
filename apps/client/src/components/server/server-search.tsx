import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Flex, TextInput, Tooltip } from '@mantine/core';
import {
  SpotlightProvider,
  SpotlightAction,
  useSpotlight,
  spotlight,
} from '@mantine/spotlight';
import {
  IconCamera,
  IconCrown,
  IconHash,
  IconMicrophone,
  IconSearch,
  IconShieldCheck,
} from '@tabler/icons-react';
import { useServer } from '../../hooks';
import { ChannelType, MemberRole } from '../../gql/graphql';

interface ServerSearchProps {
  children: React.ReactNode;
}

export function ServerSearch({ children }: ServerSearchProps) {
  const navigate = useNavigate();
  const { serverId, textChannels, audioChannels, videoChannels, members } =
    useServer();
  const onTrigger = ({
    id,
    type,
  }: {
    id: number;
    type: 'channel' | 'member';
  }) => {
    spotlight.close();
    if (type === 'member') navigate(`/server/${serverId}/conversations/${id}`);
    if (type === 'channel') navigate(`/server/${serverId}/channels/${id}`);
  };

  const iconMap = {
    [ChannelType.Text]: <IconHash size={20} />,
    [ChannelType.Audio]: <IconMicrophone size={20} />,
    [ChannelType.Video]: <IconCamera size={20} />,
  };

  const roleIconMap = {
    [MemberRole.Guest]: null,
    [MemberRole.Moderator]: <IconShieldCheck />,
    [MemberRole.Admin]: <IconCrown />,
  };

  const buildActions = (): SpotlightAction[] => {
    const actions: SpotlightAction[] = [];

    textChannels.forEach((channel) => {
      actions.push({
        title: channel.name ?? '',
        group: 'Text Channels',
        onTrigger: () => onTrigger({ id: channel.id, type: 'channel' }),
        icon: iconMap[ChannelType.Text],
      });
    });

    audioChannels.forEach((channel) => {
      actions.push({
        title: channel.name ?? '',
        group: 'Voice Channels',
        onTrigger: () => onTrigger({ id: channel.id, type: 'channel' }),
        icon: iconMap[ChannelType.Audio],
      });
    });

    videoChannels.forEach((channel) => {
      actions.push({
        title: channel.name ?? '',
        group: 'Video Channels',
        onTrigger: () => onTrigger({ id: channel.id, type: 'channel' }),
        icon: iconMap[ChannelType.Video],
      });
    });

    members.forEach((member) => {
      actions.push({
        title: member.profile?.name ?? '',
        group: 'Members',
        onTrigger: () => onTrigger({ id: member.id!, type: 'member' }),
        icon: roleIconMap[member.role!],
      });
    });

    return actions;
  };

  return (
    <Flex>
      <SpotlightProvider
        w={'100%'}
        actions={buildActions()}
        searchPlaceholder="Search..."
        shortcut="shift + enter"
      >
        {children}
      </SpotlightProvider>
    </Flex>
  );
}

export function SpotLightTrigger() {
  const spotlight = useSpotlight();

  // close spotlight when esc is pressed
  useEffect(() => {
    const handler = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        spotlight.closeSpotlight();
      }
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [spotlight]);

  return (
    <Tooltip label="Shift + Enter" style={{ pointerEvents: 'auto' }}>
      <Flex
        mx="md"
        style={{ cursor: 'pointer' }}
        onClick={() => spotlight.toggleSpotlight()}
      >
        <TextInput
          style={{ pointerEvents: 'none' }}
          placeholder="Search..."
          rightSection={
            <Button variant="transparent">
              <IconSearch />
            </Button>
          }
        />
      </Flex>
    </Tooltip>
  );
}
