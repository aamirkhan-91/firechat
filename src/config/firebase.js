import firebase from "firebase";

var config = {
  apiKey: "AIzaSyDBlBqNxlUM7UzgqctMt8Y1P8UnKlNQeYo",
  authDomain: "chat-app-af727.firebaseapp.com",
  databaseURL: "https://chat-app-af727.firebaseio.com",
  projectId: "chat-app-af727",
  storageBucket: "chat-app-af727.appspot.com",
  messagingSenderId: "974255361575"
};

const firebaseApp = firebase.initializeApp(config);

export default firebaseApp;
