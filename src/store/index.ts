import { ChatSlice } from 'types/chat';
import { NotificationsSlice } from 'types/notifications';
import { UserSlice } from 'types/user';
import create, { SetState } from 'zustand';

import createChatSlice from './chat';
import createNotificationsSlice from './notifications';
import createUserSlice from './user';

type StoreState = NotificationsSlice & UserSlice & ChatSlice;

export type StoreSlice<T> = (set: SetState<StoreState>) => T;

export const useStore = create<StoreState>((set) => ({
  ...createNotificationsSlice(set),
  ...createUserSlice(set),
  ...createChatSlice(set),
}));
