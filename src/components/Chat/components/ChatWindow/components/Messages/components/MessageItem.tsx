import { Message } from 'types/chat';
import clsx from 'clsx';
import { FC } from 'react';
import { motion } from 'framer-motion';
import * as dayjs from 'dayjs';

type Props = Message & {
  out?: boolean;
};

// const date = moment(message.timestamp);

// if (!date.isSame(currentDate, 'day')) {
//   currentDate = date;
//   return (
//     <>
//       <div className='chat__messages__date'>{relativeDate(currentDate)}</div>
//       <Item currentUser={currentUser} message={message} />
//     </>
//   );
// }

const MessageItem: FC<Props> = ({ text, createdAt, out = false }) => {
  return (
    <div
      // initial={{
      //   opacity: 0,
      //   x: '100%',
      // }}
      // animate={{
      //   opacity: 1,
      //   x: 0,
      // }}
      className={clsx('flex w-full', {
        'justify-start': !out,
        'justify-end': out,
      })}
    >
      <div
        className={clsx(
          'relative mb-2 inline-block min-w-[100px] rounded-md p-2 pb-5 text-primary shadow-md',
          {
            'bg-white': !out,
            'bg-green': out,
          }
        )}
      >
        {text}
        <span className='absolute bottom-[2px] right-[5px] text-[12px] font-bold italic text-secondary'>
          {dayjs.default(createdAt).format('h:mm a')}
        </span>
      </div>
    </div>
  );
};

export default MessageItem;
