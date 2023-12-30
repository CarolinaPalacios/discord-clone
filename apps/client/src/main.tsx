import React, { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom';
import { ApolloProvider } from '@apollo/client';
import { MantineProvider } from '@mantine/core';
import {
  ClerkProvider,
  RedirectToSignIn,
  SignIn,
  SignUp,
  SignedIn,
  SignedOut,
} from '@clerk/clerk-react';

import {
  ChannelPage,
  HomePage,
  MemberPage,
  NotFoundPage,
  ServerPage,
} from './pages';

import {
  ChannelLayout,
  ConversationLayout,
  HomeLayout,
  RootLayout,
  ServerLayout,
} from './layouts';

import { useGeneralStore } from './stores';
import { useModal } from './hooks';
import client from './apollo/apollo-client';

import {
  CreateServerModal,
  DeleteServerModal,
  DeleteChannelModal,
  InviteModal,
  LeaveServerModal,
  ServerJoinModal,
  UpdateServerModal,
  CreateChannelModal,
  UpdateChannelModal,
  UpdateMessageModal,
  ManageMemberModal,
} from './components/modals';

import './index.css';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <SignedIn>{children}</SignedIn>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    </>
  );
};

export function ClerkProviderWithRoutes() {
  const isCreateServerModalOpen = useModal('CreateServer');
  const isJoinServerModalOpen = useModal('JoinServer');
  const isInviteModalOpen = useModal('InviteFriends');
  const isManageMembersModalOpen = useModal('ManageMembers');
  const isUpdateServerModalOpen = useModal('UpdateServer');
  const isDeleteServerModalOpen = useModal('DeleteServer');
  const isCreateChannelModalOpen = useModal('CreateChannel');
  const isUpdateChannelModalOpen = useModal('UpdateChannel');
  const isDeleteChannelModalOpen = useModal('DeleteChannel');
  const isLeaveServerModalOpen = useModal('LeaveServer');
  const isUpdateMessageModalOpen = useModal('UpdateMessage');

  const navigate = useNavigate();

  const colorScheme = useGeneralStore((state) =>
    state.isDarkMode ? 'dark' : 'light'
  );

  return (
    <ClerkProvider
      publishableKey={import.meta.env.VITE_CLERK_PUBLISHABLE_KEY}
      navigate={(to) => navigate(to)}
    >
      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{ colorScheme }}
      >
        <ApolloProvider client={client}>
          <Routes>
            <Route path="" element={<RootLayout />}>
              <Route path="/" element={<HomeLayout />}>
                <Route
                  index
                  element={
                    <ProtectedRoute>
                      <HomePage />
                    </ProtectedRoute>
                  }
                />
              </Route>
              <Route
                path="sign-in/*"
                element={<SignIn routing="path" path="/sign-in" />}
              />
              <Route
                path="sign-up/*"
                element={<SignUp routing="path" path="/sign-up" />}
              />
              <Route path="server/:serverId" element={<ServerLayout />}>
                <Route
                  index
                  element={
                    <ProtectedRoute>
                      {isCreateServerModalOpen && <CreateServerModal />}
                      {isJoinServerModalOpen && <ServerJoinModal />}
                      {isInviteModalOpen && <InviteModal />}

                      {isUpdateServerModalOpen && <UpdateServerModal />}
                      {isDeleteServerModalOpen && <DeleteServerModal />}
                      {isManageMembersModalOpen && <ManageMemberModal />}
                      {isCreateChannelModalOpen && <CreateChannelModal />}
                      {isUpdateChannelModalOpen && <UpdateChannelModal />}
                      {isDeleteChannelModalOpen && <DeleteChannelModal />}
                      {isLeaveServerModalOpen && <LeaveServerModal />}

                      <ServerPage />
                    </ProtectedRoute>
                  }
                />
              </Route>
              <Route
                path="server/:serverId/channels/:channelType/:channelId"
                element={<ChannelLayout />}
              >
                <Route
                  index
                  element={
                    <ProtectedRoute>
                      {isCreateServerModalOpen && <CreateServerModal />}
                      {isJoinServerModalOpen && <ServerJoinModal />}
                      {isInviteModalOpen && <InviteModal />}

                      {isUpdateServerModalOpen && <UpdateServerModal />}
                      {isDeleteServerModalOpen && <DeleteServerModal />}
                      {isManageMembersModalOpen && <ManageMemberModal />}
                      {isCreateChannelModalOpen && <CreateChannelModal />}
                      {isUpdateChannelModalOpen && <UpdateChannelModal />}
                      {isDeleteChannelModalOpen && <DeleteChannelModal />}
                      {isLeaveServerModalOpen && <LeaveServerModal />}
                      {isUpdateMessageModalOpen && <UpdateMessageModal />}

                      <ChannelPage />
                    </ProtectedRoute>
                  }
                />
              </Route>
              <Route
                path="server/:serverId/conversations/:conversationId/members/:channelType/:memberId"
                element={<ConversationLayout />}
              >
                <Route
                  index
                  element={
                    <ProtectedRoute>
                      {isCreateServerModalOpen && <CreateServerModal />}
                      {isJoinServerModalOpen && <ServerJoinModal />}
                      {isInviteModalOpen && <InviteModal />}

                      {isUpdateServerModalOpen && <UpdateServerModal />}
                      {isDeleteServerModalOpen && <DeleteServerModal />}
                      {isManageMembersModalOpen && <ManageMemberModal />}
                      {isCreateChannelModalOpen && <CreateChannelModal />}
                      {isUpdateChannelModalOpen && <UpdateChannelModal />}
                      {isDeleteChannelModalOpen && <DeleteChannelModal />}
                      {isLeaveServerModalOpen && <DeleteServerModal />}
                      {isUpdateMessageModalOpen && <UpdateMessageModal />}

                      <MemberPage />
                    </ProtectedRoute>
                  }
                />
              </Route>
            </Route>
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </ApolloProvider>
      </MantineProvider>
    </ClerkProvider>
  );
}

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <StrictMode>
    <BrowserRouter>
      <ClerkProviderWithRoutes />
    </BrowserRouter>
  </StrictMode>
);
