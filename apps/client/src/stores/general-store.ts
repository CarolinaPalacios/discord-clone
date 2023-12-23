import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { ChannelType } from '../gql/graphql';

export type Modal =
  | 'CreateServer'
  | 'InvitePeople'
  | 'UpdateServer'
  | 'CreateChannel'
  | 'ManageMembers'
  | 'DeleteChannel'
  | 'UpdateChannel'
  | 'DeleteServer';

interface GeneralStore {
  activeModal: Modal | null;
  drawerOpen: boolean;
  channelTypeForCreateChannelModal: ChannelType;
  channelToBeDeletedOrUpdatedId: number | null;

  setActiveModal: (modal: Modal | null) => void;
  toggleDrawer: () => void;
  setChannelTypeForCreateChannelModal: (channelType: ChannelType) => void;
  setChannelToBeDeletedOrUpdatedId: (channelId: number | null) => void;
}

export const useGeneralStore = create<GeneralStore>()(
  persist(
    (set) => ({
      activeModal: null,
      drawerOpen: true,
      channelTypeForCreateChannelModal: ChannelType.Text,
      channelToBeDeletedOrUpdatedId: null,

      setActiveModal: (modal: Modal | null) => set({ activeModal: modal }),
      toggleDrawer: () => set((state) => ({ drawerOpen: !state.drawerOpen })),
      setChannelTypeForCreateChannelModal: (channelType) =>
        set(() => ({ channelTypeForCreateChannelModal: channelType })),
      setChannelToBeDeletedOrUpdatedId: (id) =>
        set(() => ({ channelToBeDeletedOrUpdatedId: id })),
    }),
    { name: 'general-store' }
  )
);
