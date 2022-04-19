export type Notification = {
  id: string;
  persistent?: boolean;
  canDismiss?: boolean;
  title: string;
  message: string;
  type: 'success' | 'error' | 'info' | 'warning';
  action?: NotificationAction;
  duration?: number;
};

export type NotificationAction = {
  text: string;
  onClick: () => void;
} | null;

export type NotificationsSlice = {
  notifications: Notification[];
  addNotification: (notification: Notification) => void;
  removeNotification: (id: string) => void;
};
