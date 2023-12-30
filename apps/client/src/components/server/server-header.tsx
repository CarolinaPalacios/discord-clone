import { Menu, rem, Flex, Divider, Text, Box, Sx } from '@mantine/core';
import { ChannelType, MemberRole, Server } from '../../gql/graphql';
import {
  IconArrowAutofitDown,
  IconPlus,
  IconSettings,
  IconTrash,
  IconUserPlus,
  IconUsers,
  IconX,
} from '@tabler/icons-react';
import { useModal } from '../../hooks';
import { useGeneralStore } from '../../stores';

export function ServerHeader({
  server,
  role,
}: {
  server?: Server;
  role?: MemberRole;
}) {
  const isAdmin = role === MemberRole.Admin;
  const isModerator = role === MemberRole.Moderator || isAdmin;

  const createChannelModal = useModal('CreateChannel');
  const deleteServerModal = useModal('DeleteServer');
  const inviteModal = useModal('InviteFriends');
  const leaveServerModal = useModal('LeaveServer');
  const manageMemberModal = useModal('ManageMembers');
  const updateServerModal = useModal('UpdateServer');

  const setChannelType = useGeneralStore(
    (state) => state.setChannelTypeForCreateChannelModal
  );

  const sx: Sx = (theme) => ({
    backgroundColor:
      theme.colorScheme === 'dark'
        ? theme.colors.dark[6]
        : theme.colors.gray[4],
    textAlign: 'center',
    padding: theme.spacing.md,
    margin: '0px',
    cursor: 'pointer',

    '&:hover': {
      backgroundColor:
        theme.colorScheme === 'dark'
          ? theme.colors.dark[7]
          : theme.colors.gray[5],
    },
  });

  return (
    <Menu shadow="md" width={200}>
      <Menu.Target>
        <Box sx={sx} style={{ borderRadius: 0 }}>
          <Flex p="md" justify={'space-between'} align={'center'}>
            {server?.name} <IconArrowAutofitDown />
          </Flex>
        </Box>
      </Menu.Target>

      <Menu.Dropdown>
        {isModerator && (
          <Menu.Item
            rightSection={<IconUserPlus size={rem(14)} />}
            component="button"
            onClick={inviteModal.openModal}
          >
            Invite people
          </Menu.Item>
        )}
        {isAdmin && (
          <Menu.Item
            rightSection={<IconSettings size={rem(14)} />}
            component="button"
            onClick={updateServerModal.openModal}
          >
            Server settings
          </Menu.Item>
        )}
        {isAdmin && (
          <Menu.Item
            rightSection={<IconUsers size={rem(14)} />}
            component="button"
            onClick={manageMemberModal.openModal}
          >
            Manage members
          </Menu.Item>
        )}
        {isModerator && (
          <Menu.Item
            rightSection={<IconPlus size={rem(14)} />}
            component="button"
            onClick={() => {
              setChannelType(ChannelType.Text);
              createChannelModal.openModal();
            }}
          >
            Create channel
          </Menu.Item>
        )}
        {isModerator && <Divider />}
        {isAdmin && (
          <Menu.Item
            rightSection={<IconTrash size={rem(14)} />}
            component="button"
            onClick={deleteServerModal.openModal}
            color="red"
          >
            <Text>Delete server</Text>
          </Menu.Item>
        )}
        {!isAdmin && (
          <Menu.Item
            rightSection={<IconX size={rem(14)} />}
            component="button"
            onClick={leaveServerModal.openModal}
            color="red"
          >
            <Text>Leave server</Text>
          </Menu.Item>
        )}
      </Menu.Dropdown>
    </Menu>
  );
}
