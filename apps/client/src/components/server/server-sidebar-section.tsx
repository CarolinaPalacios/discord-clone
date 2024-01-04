import { Flex, Text, Tooltip } from '@mantine/core';
import { IconPlus, IconSettings } from '@tabler/icons-react';

import { ChannelType, MemberRole } from '../../gql/graphql';
import { useModal } from '../../hooks';
import { useGeneralStore } from '../../stores';

interface ServerSidebarSectionProps {
  sectionType: 'channels' | 'members';
  channelType: ChannelType;
  role: MemberRole | undefined;
  label: string;
}
export function ServerSidebarSection({
  sectionType,
  channelType,
  role,
  label,
}: ServerSidebarSectionProps) {
  const channelModel = useModal('CreateChannel');
  const manageMembersModel = useModal('ManageMembers');
  const setChannelType = useGeneralStore(
    (state) => state.setChannelTypeForCreateChannelModal
  );
  const handleOnClick = () => {
    setChannelType(channelType);
    channelModel.openModal();
  };

  if (role !== MemberRole.Guest && sectionType === 'channels') {
    return (
      <Tooltip label="Create Channel" withArrow onClick={handleOnClick}>
        <Flex py="md" px={'md'} style={{ cursor: 'pointer' }}>
          <Flex justify={'space-between'} w="100%">
            {' '}
            <Flex>
              <Text style={{ color: 'grey', fontSize: 14, fontWeight: 'bold' }}>
                {label.toUpperCase()}
              </Text>{' '}
            </Flex>
          </Flex>
          <IconPlus />
        </Flex>
      </Tooltip>
    );
  }

  if (role === MemberRole.Admin && sectionType === 'members') {
    return (
      <Tooltip
        label="Manage Members"
        withArrow
        onClick={manageMembersModel.openModal}
      >
        <Flex py="md" px={'md'} style={{ cursor: 'pointer' }}>
          <Flex justify={'space-between'} w="100%">
            <Text style={{ color: 'grey', fontSize: 14, fontWeight: 'bold' }}>
              {label.toUpperCase()}
            </Text>
          </Flex>
          <IconSettings />
        </Flex>
      </Tooltip>
    );
  }
}
