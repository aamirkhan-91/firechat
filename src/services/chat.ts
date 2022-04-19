import firebaseApp from '../firebase';
import {
  getFirestore,
  collection,
  query,
  onSnapshot,
  doc,
  setDoc,
  where,
  arrayUnion,
  addDoc,
} from 'firebase/firestore';
import { Chat, Contact, ContactListResponse, Message } from 'types/chat';

const firestore = getFirestore(firebaseApp);

export const subscribeToChats = (
  userUid: string,
  callback: (chats: Chat[]) => void
) => {
  const collectionRef = collection(firestore, 'chats');

  const q = query(collectionRef, where('members', 'array-contains', userUid));

  const unsubscribe = onSnapshot(q, (snapshot) => {
    const chats: Chat[] = [];

    snapshot.forEach((doc) => {
      chats.push({
        id: doc.id,
        ...(doc.data() as Omit<Chat, 'id'>),
      });
    });

    callback(chats);
  });

  return unsubscribe;
};

export const subscribeToUsers = (
  userUid: string,
  callback: (contacts: Contact[]) => void
) => {
  const collectionRef = collection(firestore, 'users');

  const unsubscribe = onSnapshot(collectionRef, (snapshot) => {
    const contacts: Contact[] = [];

    snapshot.forEach((item) => {
      const contact: Contact = item.data() as Contact;
      if (contact.uid !== userUid) {
        contacts.push(contact);
      }
    });

    callback(contacts || []);
  });

  return unsubscribe;
};

// export const subscribeToContacts = (
//   userUid: string,
//   callback: (contacts: Contact[]) => void
// ) => {
//   const docReference = doc(firestore, 'contacts', userUid);

//   const unsubscribe = onSnapshot(docReference, (snapshot) => {
//     const { list } = snapshot.data() as ContactListResponse;
//     const contacts: Contact[] = [];

//     if (list) {
//       list.forEach((contact) => contacts.push(contact));
//     }

//     callback(contacts || []);
//   });

//   return unsubscribe;
// };

// export const getAvailableUsers = async (userUid: string) => {
//   const userCollectionRef = collection(firestore, 'users');
//   const userDocRef = doc(firestore, 'contacts', userUid);

//   const [allUsers, userContacts] = await Promise.all([
//     getDocs(userCollectionRef),
//     getDoc(userDocRef),
//   ]);

//   const unAddedUsers: Contact[] = [];

//   const contactSet: Set<string> = new Set();
//   (userContacts.data() as { list: Contact[] }).list.forEach((item) =>
//     contactSet.add(item.uid)
//   );
//   contactSet.add(userUid);

//   allUsers.forEach((item) => {
//     const user = item.data() as Contact;

//     if (!contactSet.has(user.uid)) {
//       unAddedUsers.push(user);
//     }
//   });

//   return unAddedUsers;
// };

export const sendMessage = (id: string, sender: string, text: string) => {
  const documentRef = doc(firestore, 'chats', id);

  const message: Message = {
    createdAt: new Date().toString(),
    sender,
    text,
  };

  setDoc(
    documentRef,
    {
      lastMessage: message,
      messages: arrayUnion(message),
    },
    { merge: true }
  );
};

export const createChat = (sender: string, recipient: string, text: string) => {
  const collectionRef = collection(firestore, 'chats');

  const message: Message = {
    createdAt: new Date().toString(),
    sender,
    text,
  };

  addDoc(collectionRef, {
    members: [sender, recipient],
    messages: [message],
    lastMessage: message,
  });
};
