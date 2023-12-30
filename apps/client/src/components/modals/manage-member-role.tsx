import { useState } from 'react';
import {
  Avatar,
  Button,
  Flex,
  Loader,
  Menu,
  Modal,
  ScrollArea,
  Text,
} from '@mantine/core';
import {
  IconCheck,
  IconCrown,
  IconDotsVertical,
  IconShieldCheck,
} from '@tabler/icons-react';
import { useMutation } from '@apollo/client';
import { useModal, useServer } from '../../hooks';
import {
  ChangeMemberRoleMutation,
  ChangeMemberRoleMutationVariables,
  DeleteMemberFromServerMutation,
  DeleteMemberFromServerMutationVariables,
  MemberRole,
} from '../../gql/graphql';
import {
  DELETE_MEMBER_FROM_SERVER,
  CHANGE_MEMBER_ROLE,
} from '../../graphql/mutations';

const roleIconMap = {
  [MemberRole.Moderator]: <IconShieldCheck color="blue" size={20} />,
  [MemberRole.Admin]: <IconCrown color="green" size={20} />,
  [MemberRole.Guest]: <IconShieldCheck color="gray" size={20} />,
};

export function ManageMemberModal() {
  const { isOpen, closeModal } = useModal('ManageMembers');
  const { server } = useServer();

  const [loadingId, setLoadingId] = useState<number | null>(null);

  const [changeMemberRole] = useMutation<
    ChangeMemberRoleMutation,
    ChangeMemberRoleMutationVariables
  >(CHANGE_MEMBER_ROLE, {
    onCompleted: () => {
      setLoadingId(null);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const [deleteMemberFromServer] = useMutation<
    DeleteMemberFromServerMutation,
    DeleteMemberFromServerMutationVariables
  >(DELETE_MEMBER_FROM_SERVER, {
    onCompleted: () => {
      setLoadingId(null);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const handleRoleChange = (memberId: number, role: MemberRole) => {
    setLoadingId(memberId);
    changeMemberRole({
      variables: {
        input: {
          memberId,
          role,
        },
      },
    });
  };

  const handleDeleteMemberFromServer = (memberId: number) => {
    setLoadingId(memberId);
    deleteMemberFromServer({
      variables: {
        input: {
          memberId,
        },
      },
    });
  };

  return (
    <Modal opened={isOpen} onClose={closeModal} title="Manage members">
      <Text size="sm" c="dimmed" mb="md">
        {server?.members?.length} Members
      </Text>
      <ScrollArea style={{ height: 200 }} pt={'md'}>
        {server?.members?.map((member) => {
          return (
            <Flex my="md" key={member?.id}>
              <Avatar
                src={member?.profile?.imageUrl}
                size="md"
                radius={100}
                mr="md"
              />
              <Flex direction={'column'} justify={'space-between'} w={'70%'}>
                <Flex align={'center'}>
                  <Text fw={700}>{member?.profile?.name}</Text>
                  <Flex ml="xs"> {roleIconMap[member.role!]}</Flex>
                </Flex>
                <Text size="xs" c={'dimmed'}>
                  {' '}
                  {member?.profile?.email}
                </Text>
              </Flex>
              {member?.profileId !== server?.profileId &&
                loadingId !== member?.id && (
                  <Menu shadow="md">
                    <Menu.Target>
                      <Button variant="transparent">
                        {' '}
                        <IconDotsVertical />
                      </Button>
                    </Menu.Target>
                    <Menu.Dropdown>
                      <Menu.Item>
                        <Menu.Item>
                          <Menu shadow="md" trigger="hover" position="left">
                            <Menu.Target>
                              <Flex>Change Role</Flex>
                            </Menu.Target>
                            <Menu.Dropdown>
                              <Menu.Item
                                onClick={() =>
                                  handleRoleChange(
                                    Number(member?.id),
                                    MemberRole.Admin
                                  )
                                }
                              >
                                <Flex
                                  justify={'space-between'}
                                  align={'center'}
                                >
                                  Admin
                                  {member?.role === MemberRole.Admin ? (
                                    <IconCheck />
                                  ) : null}
                                </Flex>
                              </Menu.Item>
                              <Menu.Item
                                onClick={() =>
                                  handleRoleChange(
                                    Number(member?.id),
                                    MemberRole.Moderator
                                  )
                                }
                              >
                                <Flex
                                  justify={'space-between'}
                                  align={'center'}
                                >
                                  Moderator
                                  {member?.role === MemberRole.Moderator ? (
                                    <IconCheck />
                                  ) : null}{' '}
                                </Flex>
                              </Menu.Item>
                              <Menu.Item
                                onClick={() =>
                                  handleRoleChange(
                                    Number(member?.id),
                                    MemberRole.Guest
                                  )
                                }
                              >
                                <Flex
                                  justify={'space-between'}
                                  align={'center'}
                                >
                                  {' '}
                                  Guest
                                  {member?.role === MemberRole.Guest ? (
                                    <IconCheck />
                                  ) : null}
                                </Flex>
                              </Menu.Item>
                            </Menu.Dropdown>
                          </Menu>
                        </Menu.Item>
                        <Menu.Item
                          onClick={() =>
                            handleDeleteMemberFromServer(Number(member?.id))
                          }
                        >
                          Kick
                        </Menu.Item>
                      </Menu.Item>
                    </Menu.Dropdown>
                  </Menu>
                )}
              {loadingId === member?.id && (
                <Flex align={'center'} justify={'center'}>
                  <Loader size={'xs'} />
                </Flex>
              )}
            </Flex>
          );
        })}
      </ScrollArea>
    </Modal>
  );
}
