import PlayIcon from 'icons/PlayIcon';
import React, { FC, useState } from 'react';

type Props = {
  onSendMessage: (message: string) => void;
};

const ChatInput: FC<Props> = ({ onSendMessage }) => {
  const [value, setValue] = useState('');

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value },
    } = e;

    setValue(value);
  };

  const keyDownHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const { key } = e;

    if (value && key === 'Enter') {
      onSendMessage(value.trim());
      setValue('');
    }
  };

  return (
    <div className='mt-auto flex w-full items-center justify-between border-t border-solid border-border bg-[#eee] p-3'>
      <input
        value={value}
        className='mx-3 w-full rounded-lg border border-solid border-[#eee] p-3 text-base outline-none'
        placeholder='Type a message...'
        onChange={changeHandler}
        onKeyDown={keyDownHandler}
      />
      <button
        className='rounded-full p-1 text-secondary transition-colors duration-200 hover:bg-[#00000010]'
        onClick={() => onSendMessage(value)}
      >
        <PlayIcon size='lg' className='text-secondary' />
      </button>
    </div>
  );
};

export default ChatInput;
