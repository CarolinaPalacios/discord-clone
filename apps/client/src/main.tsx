import React, { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom';
import { ApolloProvider } from '@apollo/client';
import client from './apollo/apollo-client';
import { MantineProvider } from '@mantine/core';
import {
  SignedOut,
  RedirectToSignIn,
  SignedIn,
  ClerkProvider,
} from '@clerk/clerk-react';
import '@mantine/core/styles.css';
import { RootLayout } from './layouts/root-layout';
import { HomePage } from './pages/home-page';

import { CreateServerModal } from './components/modals/create-server-modal';
import { ChannelLayout } from './layouts/channel-layout';
import { CreateChannelModal } from './components/modals/server/create-channel-modal';
import { ChannelPage } from './pages/channel-page';
import { ServerLayout } from './layouts/server-layout';
import './index.css';
import { InviteModal } from './components/modals/server/invite-modal';
import { UpdateServerModal } from './components/modals/server/update-server-modal';
import { DeleteChannelModal } from './components/modals/server/channel/delete-channel-modal';
import { DeleteServerModal } from './components/modals/server/delete-server-modal';

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

const RouterComponent = () => {
  const navigate = useNavigate();

  return (
    <ClerkProvider
      publishableKey={import.meta.env.VITE_CLERK_PUBLISHABLE_KEY}
      navigate={(to) => navigate(to)}
    >
      <Routes>
        <Route path="" element={<RootLayout />}>
          <Route
            index
            element={
              <ProtectedRoute>
                <CreateServerModal />
                <HomePage />
              </ProtectedRoute>
            }
          />
        </Route>
        <Route path="server/:serverId" element={<ServerLayout />}>
          <Route
            index
            element={
              <ProtectedRoute>
                <CreateChannelModal />
              </ProtectedRoute>
            }
          />
        </Route>

        <Route
          path="server/:serverId/channel/:channelType/:channelId"
          element={<ChannelLayout />}
        >
          <Route
            index
            element={
              <ProtectedRoute>
                <InviteModal />
                <UpdateServerModal />
                <CreateChannelModal />
                <DeleteChannelModal />
                <DeleteServerModal />
                <ChannelPage />
              </ProtectedRoute>
            }
          />
        </Route>
      </Routes>
    </ClerkProvider>
  );
};

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <StrictMode>
    <ApolloProvider client={client}>
      <MantineProvider>
        <BrowserRouter>
          <RouterComponent />
        </BrowserRouter>
      </MantineProvider>
    </ApolloProvider>
  </StrictMode>
);

export default RouterComponent;
