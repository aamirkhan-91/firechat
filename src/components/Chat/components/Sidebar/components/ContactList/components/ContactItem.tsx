import pp from 'images/pp.png';
import { ContactWithChat } from 'types/chat';
import { FC } from 'react';
import { motion } from 'framer-motion';
import * as dayjs from 'dayjs';

type Props = ContactWithChat & {
  onClick: () => void;
};

export const relativeDate = (_date: string) => {
  const date = dayjs.default(_date);
  const today = dayjs.default(new Date()).startOf('day');
  const yesterday = today.subtract(1, 'day');
  const oneWeekAgo = today.subtract(1, 'week');

  if (date.isAfter(today)) {
    return date.format('hh:mm a');
  }

  if (date.isAfter(yesterday)) {
    return 'Yesterday';
  }

  if (date.isAfter(oneWeekAgo)) {
    return date.format('dddd');
  }

  return date.format('DD-MM-YYYY');
};

const ContactItem: FC<Props> = ({ displayName, photoURL, chat, onClick }) => {
  return (
    <motion.button
      layout
      initial={{
        opacity: 0,
        scale: 0,
      }}
      animate={{
        opacity: 1,
        scale: 1,
      }}
      exit={{
        opacity: 0,
        scale: 0,
      }}
      className='relative flex w-full cursor-pointer select-none items-center border-b border-solid border-border bg-white p-4 transition-colors duration-150 hover:bg-white-hover'
      onClick={onClick}
    >
      <img
        src={photoURL ? photoURL : pp}
        className='h-[50px] w-[50px] rounded-full'
        alt={displayName}
      />
      <div className='ml-4'>
        <h3 className='inline-block text-left text-base font-bold text-primary'>
          {displayName}
        </h3>
        <p className='mt-1 text-left text-[14px] text-secondary'>
          {chat?.lastMessage?.text}
        </p>
      </div>
      {chat?.lastMessage?.createdAt && (
        <span className='absolute top-[16px] right-[8px] text-[14px] text-secondary'>
          {relativeDate(chat?.lastMessage?.createdAt)}
        </span>
      )}
    </motion.button>
  );
};

export default ContactItem;
