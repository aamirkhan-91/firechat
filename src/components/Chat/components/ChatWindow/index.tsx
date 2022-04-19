import { FC } from 'react';
import { useStore } from 'store';

import Header from './components/Header';
import Messages from './components/Messages';
import ChatInput from './components/ChatInput';
import { createChat, sendMessage } from 'services/chat';

type Props = {};

const ChatWindow: FC<Props> = () => {
  const activeContact = useStore((state) => state.activeContact);
  const user = useStore((state) => state.user);

  const onSendMessage = (message: string) => {
    if (activeContact?.chat === null) {
      createChat(user?.uid as string, activeContact.uid, message);
    } else {
      sendMessage(
        activeContact?.chat?.id as string,
        user?.uid as string,
        message
      );
    }
  };

  if (activeContact !== null && user !== null) {
    const { displayName, email, photoURL, uid, chat } = activeContact;

    return (
      <div className='flex h-full flex-1 flex-col'>
        <Header
          contact={{
            displayName,
            email,
            photoURL,
            uid,
          }}
        />
        <Messages userUid={user?.uid} messages={chat?.messages || []} />
        <ChatInput onSendMessage={onSendMessage} />
      </div>
    );
  } else {
    return (
      <div className='flex flex-1 items-center justify-center bg-[#e5ddd5] p-2 px-6'>
        <p className='text-xl text-secondary'>
          Select a contact to get started
        </p>
      </div>
    );
  }
};

export default ChatWindow;
