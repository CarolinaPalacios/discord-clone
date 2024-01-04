import { ScrollArea, Stack, Navbar, rem } from '@mantine/core';

import { ServerSidebarSection } from './server-sidebar-section';
import { SpotLightTrigger } from './server-search';
import { ServerChannel } from './server-channel';
import { ServerHeader } from './server-header';
import { ServerMember } from './server-member';
import { useServer } from '../../hooks';
import { ChannelType, Profile } from '../../gql/graphql';

export function ServerSidebar() {
  const {
    textChannels,
    audioChannels,
    videoChannels,
    server,
    role,
    members,
    activeChannel,
    activeMemberId,
  } = useServer();

  if (!server || !role) return null;

  return (
    <Navbar
      w={rem(270)}
      ml={rem(80)}
      zIndex={1}
      pos={'fixed'}
      h={'100%'}
      sx={(theme) => ({
        backgroundColor:
          theme.colorScheme === 'dark'
            ? theme.colors.dark[6]
            : theme.colors.gray[4],
      })}
    >
      <Navbar.Section>
        {' '}
        <Stack>
          <ServerHeader role={role ?? undefined} server={server} />
          <SpotLightTrigger />
          <ScrollArea h={'calc(100vh - 200px)'}>
            {!!textChannels.length && (
              <ServerSidebarSection
                sectionType="channels"
                channelType={ChannelType.Text}
                role={role}
                label="Text Channels"
              />
            )}
            <Stack spacing={0}>
              {' '}
              {server &&
                textChannels.map((channel) => (
                  <ServerChannel
                    key={channel.id}
                    channel={channel}
                    isActive={activeChannel === channel.id}
                    role={role}
                    server={server}
                  />
                ))}
            </Stack>
            {!!audioChannels.length && (
              <ServerSidebarSection
                sectionType="channels"
                channelType={ChannelType.Audio}
                role={role}
                label="Audio Channels"
              />
            )}
            <Stack spacing={0}>
              {server &&
                audioChannels.map((channel) => (
                  <ServerChannel
                    key={channel.id}
                    channel={channel}
                    isActive={activeChannel === channel.id && !activeMemberId}
                    role={role}
                    server={server}
                  />
                ))}
            </Stack>
            {!!videoChannels.length && (
              <ServerSidebarSection
                sectionType="channels"
                channelType={ChannelType.Video}
                role={role}
                label="Video Channels"
              />
            )}
            <Stack spacing={0}>
              {server &&
                videoChannels.map((channel) => (
                  <ServerChannel
                    key={channel.id}
                    isActive={activeChannel === channel.id}
                    channel={channel}
                    role={role}
                    server={server}
                  />
                ))}
            </Stack>
            {!!members.length && server && (
              <ServerSidebarSection
                sectionType="members"
                role={role}
                channelType={ChannelType.Video}
                label="Members"
              />
            )}
            <Stack>
              {server &&
                members.map((member) => (
                  <ServerMember
                    key={member.id}
                    server={server}
                    member={{
                      ...member,
                      profile: member.profile || ({} as Profile),
                    }}
                    isActive={activeMemberId === member.id}
                  />
                ))}
            </Stack>
          </ScrollArea>
        </Stack>
      </Navbar.Section>
    </Navbar>
  );
}
