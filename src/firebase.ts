import { initializeApp, FirebaseOptions } from 'firebase/app';

const firebaseConfig: FirebaseOptions = {
  apiKey: 'AIzaSyDcuOAjUrO2IaAinrT_EMt6R_UjRhAOZSE',
  authDomain: 'chat-66005.firebaseapp.com',
  projectId: 'chat-66005',
  storageBucket: 'chat-66005.appspot.com',
  messagingSenderId: '197536990971',
  appId: '1:197536990971:web:00e355dced64b36d71925e',
};

const firebaseApp = initializeApp(firebaseConfig);

export default firebaseApp;
