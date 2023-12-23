import { Flex, Text, Tooltip } from '@mantine/core';
import { ChannelType, MemberRole } from '../../gql/graphql';
import { useModal } from '../../hooks/use-modal';
import { useGeneralStore } from '../../stores/general-store';
import { IconPlus, IconSettings } from '@tabler/icons-react';

interface ServerSidebarSectionProps {
  sectionType: 'channels' | 'members';
  channelType: ChannelType;
  role: MemberRole;
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
        <Flex p="md" style={{ cursor: 'pointer' }}>
          <Flex justify={'space-between'} w="100%">
            <Text fw={700}>{label}</Text>
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
        <Flex p="md" style={{ cursor: 'pointer' }}>
          <Flex justify={'space-between'} w="100%">
            <Text fw={700}>{label}</Text>
          </Flex>
          <IconSettings />
        </Flex>
      </Tooltip>
    );
  }
}
