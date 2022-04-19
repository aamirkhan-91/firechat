import { StoreSlice } from 'store';
import { ChatSlice, ContactWithChat } from 'types/chat';

const createChatSlice: StoreSlice<ChatSlice> = (set) => ({
  activeContact: null,
  setActiveContact: (activeContact: ContactWithChat) =>
    set(() => ({
      activeContact,
    })),
});

export default createChatSlice;
