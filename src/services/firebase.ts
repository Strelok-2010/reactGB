import { initializeApp } from 'firebase/app';
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import { getDatabase, ref } from 'firebase/database';

const firebaseConfig = {
  apiKey: 'AIzaSyBtPl7TIze9bzd63mp7XnHsp7T5QalmwGk',
  authDomain: 'react-gb-56c6f.firebaseapp.com',
  databaseURL:
    'https://react-gb-56c6f-default-rtdb.europe-west1.firebasedatabase.app',
  projectId: 'react-gb-56c6f',
  storageBucket: 'react-gb-56c6f.appspot.com',
  messagingSenderId: '944336091416',
  appId: '1:944336091416:web:febe60199ee7faf513066d',
};

const app = initializeApp(firebaseConfig);
export const firebaseAuth = getAuth(app);

export const signUp = async (email: string, password: string) =>
  await createUserWithEmailAndPassword(firebaseAuth, email, password);

export const logIn = async (email: string, password: string) =>
  await signInWithEmailAndPassword(firebaseAuth, email, password);

export const logOut = async () => await signOut(firebaseAuth);

export const db = getDatabase(app);

export const getChats = () => ref(db, 'chats');
