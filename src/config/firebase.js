import firebase from "firebase";

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

export { firestore, firebaseStorage };

export default firebaseApp;
