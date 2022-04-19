import { AnimatePresence } from 'framer-motion';
import { FC } from 'react';
import { useStore } from 'store';

import Notification from './components/Notification';

const Notifications: FC = () => {
  const notifications = useStore((state) => state.notifications);

  return (
    <div className='fixed bottom-4 left-1/2 z-20 -translate-x-1/2 transform space-y-4 md:top-4 md:right-4 md:bottom-auto md:left-auto md:transform-none'>
      <AnimatePresence>
        {notifications.map((notification) => (
          <Notification key={notification.id} {...notification} />
        ))}
      </AnimatePresence>
    </div>
  );
};

export default Notifications;
