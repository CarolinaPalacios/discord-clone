import { Divider, Flex, Menu, Text, rem } from '@mantine/core';
import { MemberRole, Server } from '../../gql/graphql';
import {
  IconArrowAutofitDown,
  IconPlus,
  IconSettings,
  IconTrash,
  IconX,
} from '@tabler/icons-react';
import { useModal } from '../../hooks/use-modal';

export function ServerHeader({
  server,
  memberRole,
}: {
  server: Server;
  memberRole: MemberRole;
}) {
  const isAdmin = memberRole === MemberRole.Admin;
  const isModerator = memberRole === MemberRole.Moderator || isAdmin;

  const inviteModal = useModal('InvitePeople');
  const updateServerModal = useModal('UpdateServer');
  const createChannelModal = useModal('CreateChannel');
  const deleteServerModal = useModal('DeleteServer');

  return (
    <Menu shadow="md" width={rem(300)}>
      <Menu.Target>
        <Flex
          p="md"
          justify={'space-between'}
          align={'center'}
          w="100%"
          style={{ cursor: 'pointer' }}
        >
          {server?.name} <IconArrowAutofitDown />
        </Flex>
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Item onClick={inviteModal.openModal} rightSection={<IconPlus />}>
          Invite people
        </Menu.Item>
        {isAdmin && (
          <Menu.Item
            onClick={updateServerModal.openModal}
            rightSection={<IconSettings />}
          >
            Update server
          </Menu.Item>
        )}
        {isModerator && (
          <Menu.Item
            onClick={createChannelModal.openModal}
            rightSection={<IconPlus />}
          >
            Create channel
          </Menu.Item>
        )}
        {isModerator && <Divider />}
        {isAdmin && (
          <Menu.Item
            onClick={deleteServerModal.openModal}
            color="red"
            rightSection={<IconTrash />}
          >
            <Text>Delete server</Text>
          </Menu.Item>
        )}
        {!isAdmin && (
          <Menu.Item color="red" rightSection={<IconX />}>
            <Text>Leave server</Text>
          </Menu.Item>
        )}
      </Menu.Dropdown>
    </Menu>
  );
}
