import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { ChannelType } from '../gql/graphql';

export type Modal =
  | 'CreateChannel'
  | 'CreateServer'
  | 'DeleteChannel'
  | 'DeleteServer'
  | 'InviteFriends'
  | 'JoinServer'
  | 'LeaveChannel'
  | 'LeaveServer'
  | 'ManageMembers'
  | 'UpdateChannel'
  | 'UpdateMessage'
  | 'UpdateServer';

interface GeneralStore {
  activeModal: Modal | null;
  drawerOpen: boolean;
  channelTypeForCreateChannelModal: ChannelType;
  channelToBeDeletedOrUpdatedId: number | null;
  isDarkMode: boolean;

  setActiveModal: (modal: Modal | null) => void;
  setChannelTypeForCreateChannelModal: (channelType: ChannelType) => void;
  setChannelToBeDeletedOrUpdatedId: (channelId: number | null) => void;
  toggleDrawer: () => void;
  toggleDarkMode: () => void;
}

export const useGeneralStore = create<GeneralStore>()(
  persist(
    (set) => ({
      activeModal: null,
      drawerOpen: false,
      channelTypeForCreateChannelModal: ChannelType.Text,
      channelToBeDeletedOrUpdatedId: null,
      isDarkMode: false,

      setActiveModal: (modal: Modal | null) => set({ activeModal: modal }),
      setChannelTypeForCreateChannelModal: (channelType) =>
        set(() => ({ channelTypeForCreateChannelModal: channelType })),
      setChannelToBeDeletedOrUpdatedId: (id) =>
        set(() => ({ channelToBeDeletedOrUpdatedId: id })),
      toggleDrawer: () => set((state) => ({ drawerOpen: !state.drawerOpen })),
      toggleDarkMode: () => set((state) => ({ isDarkMode: !state.isDarkMode })),
    }),
    { name: 'general-store' }
  )
);
