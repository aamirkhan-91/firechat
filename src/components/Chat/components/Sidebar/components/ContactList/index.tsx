import { ContactWithChat } from 'types/chat';
import { FC } from 'react';

import Contact from './components/ContactItem';
import { useStore } from 'store';
import { AnimatePresence } from 'framer-motion';

type Props = {
  contacts: ContactWithChat[];
  loading: boolean;
  searchQuery: string;
  onClickContact: () => void;
};

const ContactList: FC<Props> = ({ contacts, searchQuery, onClickContact }) => {
  const setActiveContact = useStore((state) => state.setActiveContact);

  const filteredContacts = contacts.filter((contact) =>
    contact.displayName.toUpperCase().includes(searchQuery.toUpperCase())
  );

  return (
    <div className='contact-list h-full overflow-y-auto'>
      <AnimatePresence presenceAffectsLayout>
        {filteredContacts.map((contact) => (
          <Contact
            key={contact.uid}
            {...contact}
            onClick={() => {
              setActiveContact(contact);
              onClickContact();
            }}
          />
        ))}
      </AnimatePresence>
    </div>
  );
};

export default ContactList;
