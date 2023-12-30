import { useNavigate } from 'react-router-dom';
import { Image, NavLink, Sx, rem } from '@mantine/core';
import { IconCrown, IconShieldCheck } from '@tabler/icons-react';
import {
  ChannelType,
  Member,
  MemberRole,
  Profile,
  Server,
} from '../../gql/graphql';
import { useConversationData } from '../../hooks';

type ServerMemberProps = {
  member: Member & { profile: Profile };
  server: Server;
  isActive: boolean;
};

const roleIconMap = {
  [MemberRole.Guest]: null,
  [MemberRole.Moderator]: <IconShieldCheck size="15" />,
  [MemberRole.Admin]: <IconCrown size="15" />,
};

export function ServerMember({ member, server, isActive }: ServerMemberProps) {
  const navigate = useNavigate();
  const { getOrCreateConversation } = useConversationData({
    memberId: member?.id,
  });

  const styles: Sx = (theme) => ({
    backgroundColor:
      theme.colorScheme === 'dark'
        ? theme.colors.dark[6]
        : theme.colors.gray[4],
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
          : theme.colors.gray[6],
    },
  });

  const roleIcon = member?.role != null ? roleIconMap[member?.role] : null;

  return (
    <NavLink
      sx={styles}
      active={isActive}
      rightSection={roleIcon}
      onClick={async () => {
        await getOrCreateConversation({
          onCompleted: (data) => {
            navigate(
              `/server/${member?.server?.id}/conversations/${data.getOrCreateConversation.id}/members/${ChannelType.Text}/${member?.id}`
            );
          },
        });
      }}
      icon={
        <Image
          width={rem(25)}
          height={rem(25)}
          radius={rem(25)}
          src={member?.profile?.imageUrl}
        />
      }
      label={member?.profile?.name}
    />
  );
}
