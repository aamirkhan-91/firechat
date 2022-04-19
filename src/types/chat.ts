export type Contact = {
  displayName: string;
  uid: string;
  email: string;
  photoURL?: string;
  status?: 'ADDED' | 'REQUESTED' | 'PENDING';
};

export type ContactWithChat = Contact & {
  chat: Chat | null;
};

export type Message = {
  text: string;
  id?: string;
  sender: string;
  createdAt: string; // ToDo: Change to date
};

export type Chat = {
  id: string;
  members: string[];
  messages: Message[];
  lastMessage: Message;
};

export type ContactListResponse = {
  list: Contact[];
};

export type ContactResponse = {
  displayName: string;
  uid: string;
  email: string;
  contacts: Contact[];
};

export type ChatSlice = {
  activeContact: ContactWithChat | null;
  setActiveContact: (activeContact: ContactWithChat) => void;
};
