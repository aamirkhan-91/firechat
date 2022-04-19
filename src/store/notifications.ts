import { StoreSlice } from 'store';
import { NotificationsSlice } from 'types/notifications';

const createNotificationsSlice: StoreSlice<NotificationsSlice> = (set) => ({
  notifications: [],
  addNotification: (notification) =>
    set((state) => {
      const notifications = [...state.notifications];
      notifications.unshift(notification);

      return {
        notifications,
      };
    }),
  removeNotification: (id) =>
    set((state) => {
      const notifications = [...state.notifications];
      const index = notifications.findIndex(
        (notifaction) => notifaction.id === id
      );
      notifications.splice(index, 1);

      return {
        notifications,
      };
    }),
});

export default createNotificationsSlice;
