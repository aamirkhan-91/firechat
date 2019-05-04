import firebase from 'firebase';

import { store } from '../index';
import * as actions from '../store/actions';

const config = {
  apiKey: 'AIzaSyAZZhdF7JHELiKeMwa7ooklHdLkUxL8aO0',
  authDomain: 'chat-app-3131f.firebaseapp.com',
  databaseURL: 'https://chat-app-3131f.firebaseio.com',
  projectId: 'chat-app-3131f',
  storageBucket: 'chat-app-3131f.appspot.com',
  messagingSenderId: '692381719600',
};

const firebaseApp = firebase.initializeApp(config);

const firestore = firebaseApp.firestore();
const firebaseStorage = firebaseApp.storage();
const firebaseAuth = firebaseApp.auth();

const uploadPhoto = (path, blob) => new Promise((resolve) => {
  const rootRef = firebaseStorage.ref();
  const ref = rootRef.child(path);

  ref.put(blob)
    .then(() => {
      ref.getDownloadURL()
        .then((downloadUrl) => {
          resolve(downloadUrl);
        });
    });
});

const createContact = (user, fullName, downloadUrl) => {
  const contactDoc = firestore.collection('users').doc(user.uid);

  contactDoc.set({
    uid: user.uid,
    fullName,
    email: user.email,
    photoURL: downloadUrl,
  });
};

const mapChatToContacts = () => {
  const chats = store.getState().chats.map(chat => ({ ...chat }));
  const contacts = store.getState().contacts.list.map(contact => ({ ...contact }));
  const { selectedContact } = store.getState().contacts;

  const contactsWithChat = contacts.map(contact => ({ ...contact, chat: chats.find(chat => chat.members.includes(contact.uid)) }));

  store.dispatch({ type: actions.SET_CONTACTS, contacts: contactsWithChat });

  if (selectedContact) {
    const selectedContactWithChat = contactsWithChat.find(contact => contact.uid === selectedContact.uid);
    store.dispatch({ type: actions.SET_SELECTED_CONTACT, contact: selectedContactWithChat });
  }
};

export const registerContactsListener = (userUid) => {
  firestore.collection('users').onSnapshot((snapshot) => {
    const contacts = [];
    snapshot.forEach((doc) => {
      const contact = doc.data();

      if (contact.uid !== userUid) {
        contacts.push(doc.data());
      }
    });

    store.dispatch({ type: actions.SET_CONTACTS, contacts });
    mapChatToContacts();
  });
};

export const registerChatListener = (userUid) => {
  firestore.collection('chats')
    .where('members', 'array-contains', userUid)
    .onSnapshot((chats) => {
      const parsedChats = [];

      chats.forEach((chat) => {
        parsedChats.push({ id: chat.ref.id, ...chat.data() });
      });

      store.dispatch({ type: actions.SET_CHATS, chats: parsedChats });
      mapChatToContacts();
    });
};

const createUser = (credentials, imageBlob) => new Promise((resolve, reject) => {
  firebaseAuth
    .createUserWithEmailAndPassword(credentials.email, credentials.password)
    .then(({ user }) => {
      uploadPhoto(`profile-pictures/${user.uid}`, imageBlob)
        .then((downloadUrl) => {
          user.updateProfile({
            displayName: credentials.fullName,
            photoURL: downloadUrl,
          })
            .then(() => {
              const user = firebase.auth().currentUser;
              store.dispatch({
                type: actions.SET_USER,
                user: {
                  displayName: user.displayName, photoURL: user.photoURL, uid: user.uid, email: user.email,
                },
              });

              registerChatListener(user.uid);
              resolve();
            });

          createContact(user, credentials.fullName, downloadUrl);
        });
    })
    .catch((authError) => {
      reject(authError);
    });
});

export {
  firestore, firebaseStorage, uploadPhoto, firebaseAuth, createUser, firebase as _firebase,
};

export default firebaseApp;
