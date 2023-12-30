import { useNavigate } from 'react-router-dom';
import {
  IconCamera,
  IconEdit,
  IconHash,
  IconMessage,
  IconMicrophone,
  IconTrash,
} from '@tabler/icons-react';
import { Channel, ChannelType, MemberRole, Server } from '../../gql/graphql';
import { useModal } from '../../hooks';
import { rem, NavLink, Stack, Sx } from '@mantine/core';
import { useGeneralStore } from '../../stores';

interface ServerChannelProps {
  channel: Channel;
  server: Server;
  role?: MemberRole;
  isActive?: boolean;
}

const iconMap = {
  [ChannelType.Text]: <IconHash size={15} />,
  [ChannelType.Audio]: <IconMicrophone size={15} />,
  [ChannelType.Video]: <IconCamera size={15} />,
};

export function ServerChannel({
  channel,
  server,
  role,
  isActive,
}: ServerChannelProps) {
  const deleteChannelModal = useModal('DeleteChannel');
  const updateChannelModal = useModal('UpdateChannel');

  const setChannelToBeDeletedOrUpdatedId = useGeneralStore(
    (state) => state.setChannelToBeDeletedOrUpdatedId
  );

  const navigate = useNavigate();

  if (!channel && !server) return null;

  const Icon = iconMap[channel.type];

  const styles: Sx = (theme) => ({
    backgroundColor:
      theme.colorScheme === 'dark'
        ? theme.colors.dark[6]
        : theme.colors.gray[4],
    color:
      theme.colorScheme === 'dark'
        ? theme.colors.gray[1]
        : theme.colors.dark[7],
    '&:hover': {
      backgroundColor:
        theme.colorScheme === 'dark'
          ? theme.colors.dark[7]
          : theme.colors.gray[5],
    },
    '&:active': {
      backgroundColor:
        theme.colorScheme === 'dark'
          ? theme.colors.dark[8]
          : theme.colors.gray[9],
    },
    '&.active': {
      backgroundColor:
        theme.colorScheme === 'dark'
          ? theme.colors.dark[5]
          : theme.colors.gray[3],
      color:
        theme.colorScheme === 'dark'
          ? theme.colors.dark[7]
          : theme.colors.gray[1],
    },
  });

  if (channel.name !== 'general') {
    return (
      <NavLink
        w={rem(260)}
        label={channel.name}
        sx={styles}
        active={isActive}
        icon={Icon}
      >
        {channel.name !== 'general' && role !== MemberRole.Guest && (
          <Stack>
            <NavLink
              sx={styles}
              onClick={() => {
                navigate(
                  `/server/${server.id}/channels/${channel.type}/${channel.id}`
                );
              }}
              label="Join"
              icon={<IconMessage style={{ marginLeft: '8px' }} size={20} />}
            />
            <NavLink
              sx={styles}
              onClick={() => {
                setChannelToBeDeletedOrUpdatedId(channel.id);
                updateChannelModal.openModal();
              }}
              label="Edit"
              icon={<IconEdit style={{ marginLeft: '8px' }} size={20} />}
            />
            <NavLink
              sx={styles}
              onClick={() => {
                setChannelToBeDeletedOrUpdatedId(channel.id);
                deleteChannelModal.openModal();
              }}
              label="Delete"
              icon={<IconTrash style={{ marginLeft: '8px' }} size={20} />}
            />
          </Stack>
        )}
      </NavLink>
    );
  } else {
    return (
      <NavLink
        active={isActive}
        w={rem(260)}
        sx={styles}
        label={channel.name}
        icon={Icon}
        onClick={() => {
          navigate(
            `/server/${server.id}/channels/${channel.type}/${channel.id}`
          );
        }}
      />
    );
  }
}
