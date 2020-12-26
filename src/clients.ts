import { v4 as uuidv4 } from 'uuid';
import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

export const newUuid = () => {
  return uuidv4();
};

const firebaseConfig = {
  apiKey: 'AIzaSyALh1wboBP5ycMtrCu3J30tv9Pu2e1HLSg',
  authDomain: 'satellite-38f3c.firebaseapp.com',
  databaseURL: 'https://satellite-38f3c-default-rtdb.firebaseio.com',
  projectId: 'satellite-38f3c',
  storageBucket: 'satellite-38f3c.appspot.com',
  messagingSenderId: '565696570913',
  appId: '1:565696570913:web:3b38d604fc5f3edcbc6560',
  measurementId: 'G-BN5TG08DLN'
};

const firebase = app.initializeApp(firebaseConfig);
export const auth = firebase.auth();
export const db = firebase.firestore();
