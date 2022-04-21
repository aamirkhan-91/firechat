// eslint-disable-next-line import/named
import { Unsubscribe } from 'firebase/firestore';
import { motion, Variants } from 'framer-motion';
import { FC, useEffect, useRef, useState } from 'react';
import { subscribeToChats, subscribeToUsers } from 'services/chat';
import { useStore } from 'store';
import { Chat, Contact, ContactWithChat } from 'types/chat';

import ContactList from './components/ContactList';
import Header from './components/Header';
import Search from './components/Search';

type Props = {
  visible: boolean;
  onClickSidebarTrigger: () => void;
  onClickContact: () => void;
};

const States: Variants = {
  closed: {
    x: '-300px',
    transition: {
      type: 'tween',
    },
  },
  open: {
    x: 0,
    transition: {
      type: 'tween',
    },
  },
};

const Sidebar: FC<Props> = ({ onClickSidebarTrigger, onClickContact }) => {
  const activeContact = useStore((state) => state.activeContact);
  const setActiveContact = useStore((state) => state.setActiveContact);
  const [searchQuery, setSearchQuery] = useState('');

  const unsubscribeContacts = useRef<Unsubscribe | null>(null);
  const unsubscribeChats = useRef<Unsubscribe | null>(null);

  const user = useStore((state) => state.user);

  const [contacts, setContacts] = useState<Contact[] | null>(null);
  const [chats, setChats] = useState<Chat[] | null>(null);

  const [contactsWithChat, setContactsWithChat] = useState<ContactWithChat[]>(
    []
  );

  useEffect(() => {
    if (user) {
      unsubscribeChats.current = subscribeToChats(user.uid, (chats) => {
        setChats(chats);
      });

      unsubscribeContacts.current = subscribeToUsers(
        user.uid,
        (addedContacts) => {
          setContacts(addedContacts);
        }
      );
    }

    return () => {
      if (unsubscribeChats.current) {
        unsubscribeChats.current();
      }

      if (unsubscribeContacts.current) {
        unsubscribeContacts.current();
      }
    };
  }, [user?.uid]);

  useEffect(() => {
    const _contactsWithChat: ContactWithChat[] = [];

    if (contacts !== null && chats !== null) {
      const chatMap: Map<string, Chat> = new Map();

      chats.forEach((chat) => {
        const otherMember = chat.members.find(
          (member) => member !== user?.uid
        ) as string;

        chatMap.set(otherMember, chat);
      });

      contacts.forEach((contact) => {
        const _contact = { ...contact };

        const chatForContact = chatMap.get(_contact.uid);

        _contactsWithChat.push({
          ...contact,
          chat: chatForContact || null,
        });
      });

      if (activeContact) {
        const chat = chatMap.get(activeContact.uid);

        setActiveContact({
          ...activeContact,
          chat: chat || null,
        });
      }

      // Todo: sorting
      // _contactsWithChat.sort()

      setContactsWithChat(_contactsWithChat);
    }
  }, [chats, contacts]);

  return (
    <motion.div
      variants={States}
      className='absolute z-[5] flex h-full w-[300px] flex-col border-r border-solid border-border bg-[#fff]'
    >
      <Header onClickSidebarTrigger={onClickSidebarTrigger} />
      <div className='flex items-center border-b border-solid border-border py-2 pl-2 pr-2'>
        <Search query={searchQuery} onQueryChanged={setSearchQuery} />
      </div>
      <ContactList
        loading={false}
        contacts={contactsWithChat !== null ? contactsWithChat : []}
        searchQuery={searchQuery}
        onClickContact={onClickContact}
      />
    </motion.div>
  );
};

export default Sidebar;
