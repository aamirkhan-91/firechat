import { nanoid } from 'nanoid';
import { useStore } from 'store';
import { Notification } from 'types/notifications';

const useNotificaiton = (): {
  createNotification: (notification: Omit<Notification, 'id'>) => void;
} => {
  const addNotification = useStore((state) => state.addNotification);

  const createNotification = (notification: Omit<Notification, 'id'>) => {
    addNotification({
      id: nanoid(6),
      ...notification,
    });
  };

  return {
    createNotification,
  };
};

export default useNotificaiton;
