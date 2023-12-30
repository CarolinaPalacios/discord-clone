import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { DirectMessage, Message } from '../gql/graphql';

interface MessageStore {
  message: DirectMessage | Message | null;
  setMessage: (message: DirectMessage | Message) => void;
}

export const useMessageStore = create<MessageStore>()(
  persist(
    (set) => ({
      message: null,
      setMessage: (message) => set(() => ({ message })),
    }),
    {
      name: 'message-store',
    }
  )
);
