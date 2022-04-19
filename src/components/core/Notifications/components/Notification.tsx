import clsx from 'clsx';
import { motion } from 'framer-motion';
import AlertIcon from 'icons/AlertIcon';
import CheckIcon from 'icons/CheckIcon';
import CloseIcon from 'icons/CloseIcon';
import InfoIcon from 'icons/InfoIcon';
import { FC, useEffect, useRef } from 'react';
import { useStore } from 'store';
import { Notification } from 'types/notifications';

type Props = Notification;

const NotificationItem: FC<Props> = ({
  id,
  title,
  message,
  type = 'info',
  persistent = false,
  canDismiss = true,
  action,
  duration = 4000,
}) => {
  const removeNotification = useStore((state) => state.removeNotification);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const dismiss = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    removeNotification(id);
  };

  useEffect(() => {
    if (!persistent) {
      timeoutRef.current = setTimeout(dismiss, duration);
    }
  }, []);

  let icon: null | JSX.Element = null;

  if (type === 'success') {
    icon = <CheckIcon size='lg' className='text-blue' />;
  } else if (type === 'info') {
    icon = <InfoIcon size='lg' className='text-secondary' />;
  } else if (type === 'error') {
    icon = <AlertIcon size='lg' className='text-error' />;
  }

  return (
    <motion.div
      layout
      initial={{
        x: '50%',
        opacity: 0,
        scale: 0,
      }}
      animate={{
        x: '0%',
        opacity: 1,
        scale: 1,
      }}
      exit={{ opacity: 0, x: 300 }}
      transition={{
        type: 'spring',
        stiffness: 500,
        damping: 40,
      }}
      className='w-[300px] rounded-lg bg-white shadow-md'
    >
      <div className='relative flex'>
        <div className='flex items-center justify-center p-2'>{icon}</div>
        <div className='flex flex-col items-start pt-2 pb-3 pl-1 pr-5'>
          <p
            className={clsx(
              {
                'text-error': type === 'error',
                'text-primary': type !== 'error',
              },
              'text-lg font-bold'
            )}
          >
            {title}
          </p>
          <p className='mt-1 leading-5 text-secondary'>{message}</p>
          {action && (
            <button
              className='mt-3 cursor-pointer font-bold text-blue'
              onClick={() => {
                action.onClick();
                dismiss();
              }}
            >
              {action.text}
            </button>
          )}
        </div>
        {canDismiss && (
          <button
            className='absolute top-3 right-3 text-secondary'
            onClick={dismiss}
          >
            <CloseIcon />
          </button>
        )}
      </div>
    </motion.div>
  );
};

export default NotificationItem;
