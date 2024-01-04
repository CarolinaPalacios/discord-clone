import { Outlet } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { Flex } from '@mantine/core';

import { useProfileStore } from '../stores';

import { GetProfileByIdQuery } from '../gql/graphql';
import { GET_PROFILE_BY_ID } from '../graphql/queries';

import { Sidebar } from '../components/navigation';
import {
  CreateServerModal,
  ServerJoinModal,
  UpdateServerModal,
  DeleteServerModal,
  LeaveServerModal,
  CreateChannelModal,
  DeleteChannelModal,
  UpdateChannelModal,
  ManageMemberModal,
} from '../components/modals';

import './home-layout.module.css';

if (!import.meta.env.VITE_CLERK_PUBLISHABLE_KEY) {
  throw new Error('Missing Publishable Key');
}

export function HomeLayout() {
  const profile = useProfileStore((state) => state.profile);
  console.log('profile', profile);
  const setProfile = useProfileStore((state) => state.setProfile);

  const profileData = useQuery<GetProfileByIdQuery>(GET_PROFILE_BY_ID, {
    variables: {
      profileId: profile?.id,
    },
    skip: !profile?.id,
    onCompleted: (data) => {
      console.log(data);
      setProfile(data.getProfileById);
    },
    onError: (error) => {
      console.log(error);
    },
  });
  console.log(profileData);

  return (
    <Flex w="100vw" justify={'center'} h={'100vh'} align={'center'}>
      <Sidebar />
      <UpdateChannelModal />
      <DeleteChannelModal />
      <LeaveServerModal />
      <DeleteServerModal />
      <CreateChannelModal />
      <ManageMemberModal />
      <UpdateServerModal />
      <CreateServerModal />
      <ServerJoinModal />

      <Outlet />
    </Flex>
  );
}
