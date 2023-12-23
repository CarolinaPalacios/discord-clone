import { useNavigate, useParams } from 'react-router-dom';
import { ServerHeader } from './server-header';
import { useEffect, useState } from 'react';
import { useServer } from '../../hooks/graphql/server/use-server';
import classes from './server-sidebar.module.css';
import { ScrollArea, Stack } from '@mantine/core';
import { ServerSidebarSection } from './server-sidebar-section';
import { ServerChannel } from './server-channel';
import { ChannelType } from '../../gql/graphql';

export function ServerSidebar() {
  const navigate = useNavigate();
  const [activeMemberId, setActiveMemberId] = useState<number | null>();
  const [activeChannelId, setActiveChannelId] = useState<number | null>();
  const { serverId, memberId, channelId } = useParams();

  const { textChannels, audioChannels, videoChannels, server, role } =
    useServer();

  useEffect(() => {
    if (!channelId && !memberId && textChannels.length > 0) {
      navigate(`/server/${serverId}/channel/TEXT/${textChannels[0]?.id}`);
    }
  }, [channelId, memberId, serverId, textChannels, navigate]);

  useEffect(() => {
    if (memberId) {
      setActiveMemberId(Number(memberId));
      setActiveChannelId(null);
    }

    if (channelId) {
      setActiveChannelId(Number(channelId));
      setActiveMemberId(null);
    }
  }, [channelId, memberId, textChannels]);

  if (!server || !role) return null;

  return (
    <nav className={classes.nav}>
      <ServerHeader server={server} memberRole={role} />
      {/* <ServerSearch/> */}
      <ScrollArea>
        {!!textChannels.length && (
          <ServerSidebarSection
            sectionType="channels"
            channelType={ChannelType.Text}
            role={role}
            label="Text Channels"
          />
        )}
        <Stack>
          {textChannels.map((channel) => (
            <ServerChannel
              key={channel?.id}
              channel={channel}
              server={server}
              role={role}
              isActive={activeChannelId === channel?.id}
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
        <Stack>
          {audioChannels.map((channel) => (
            <ServerChannel
              key={channel?.id}
              channel={channel}
              server={server}
              role={role}
              isActive={activeChannelId === channel?.id}
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
        <Stack>
          {videoChannels.map((channel) => (
            <ServerChannel
              key={channel?.id}
              channel={channel}
              server={server}
              role={role}
              isActive={activeChannelId === channel?.id}
            />
          ))}
        </Stack>
      </ScrollArea>
    </nav>
  );
}
