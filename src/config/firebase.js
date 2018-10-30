import firebase from "firebase";

import { store } from '../index';
import * as actions from '../store/actions';

var config = {
  apiKey: "",
  authDomain: "",
  databaseURL: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: ""
};

const firebaseApp = firebase.initializeApp(config);

const firestore = firebaseApp.firestore();
const firebaseStorage = firebaseApp.storage();
const firebaseAuth = firebaseApp.auth();

const uploadPhoto = (path, blob) => {
  return new Promise((resolve) => {
    let rootRef = firebaseStorage.ref();
    let ref = rootRef.child(path);

    ref.put(blob)
    .then(() => {
      ref.getDownloadURL()
      .then(downloadUrl => {
        resolve(downloadUrl);
      });
    });
  });
}

const createContact = (user, fullName, downloadUrl) => {
  let contactDoc = firestore.collection('users').doc(user.uid);

  contactDoc.set({
    uid: user.uid,
    fullName: fullName,
    email: user.email,
    photoURL: downloadUrl
  });
}

const mapChatToContacts = () => {
  let chats = store.getState().chats.map(chat => {return {...chat}});
  let contacts = store.getState().contacts.list.map(contact => {return {...contact}});
  let selectedContact = store.getState().contacts.selectedContact;

  let contactsWithChat = contacts.map(contact => {
    return { ...contact, chat: chats.find(chat => chat.members.includes(contact.uid)) }
  });

  store.dispatch({ type: actions.SET_CONTACTS, contacts: contactsWithChat });

  if (selectedContact) {
    let selectedContactWithChat = contactsWithChat.find(contact => contact.uid === selectedContact.uid);
    store.dispatch({ type: actions.SET_SELECTED_CONTACT, contact: selectedContactWithChat });
  }
}

export const registerContactsListener = (userUid) => {
  firestore.collection('users').onSnapshot((snapshot) => {

    let contacts = [];
    snapshot.forEach(doc => {
      let contact = doc.data();

      if (contact.uid !== userUid) {
        contacts.push(doc.data());
      }
    });

    store.dispatch({ type: actions.SET_CONTACTS, contacts: contacts });
    mapChatToContacts();
  });
}

export const registerChatListener = userUid => {
  firestore.collection('chats')
    .where("members", "array-contains", userUid)
    .onSnapshot(chats => {
      let parsedChats = [];

      chats.forEach(chat => {
        parsedChats.push({ id: chat.ref.id, ...chat.data() });
      });

      store.dispatch({ type: actions.SET_CHATS, chats: parsedChats});
      mapChatToContacts();
    });
}

const createUser = (credentials, imageBlob) => {
  return new Promise((resolve, reject) => {
    firebaseAuth
    .createUserWithEmailAndPassword(credentials.email, credentials.password)
    .then(({user}) => {
      uploadPhoto('profile-pictures/' + user.uid, imageBlob)
      .then(downloadUrl => {
        user.updateProfile({
          displayName: credentials.fullName,
          photoURL: downloadUrl
        })
        .then(() => {
          let user = firebase.auth().currentUser;
          store.dispatch({ type: actions.SET_USER, user: { displayName: user.displayName, photoURL: user.photoURL, uid: user.uid, email: user.email } });

          registerChatListener(user.uid);
          resolve();
        });

        createContact(user, credentials.fullName, downloadUrl);
      });
    })
    .catch(authError => {
      reject(authError);
    });
  });
}

export { firestore, firebaseStorage , uploadPhoto, firebaseAuth, createUser, firebase as _firebase };

export default firebaseApp;
