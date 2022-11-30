import firebase from 'firebase/compat/app';
import { getAuth, RecaptchaVerifier  } from "firebase/auth";



const firebaseConfig = {
  apiKey: "AIzaSyDlX9Scz0vB9ssvIggd6sdI4nDwKg4w_UM",
  authDomain: "mn-gems-web.firebaseapp.com",
  projectId: "mn-gems-web",
  storageBucket: "mn-gems-web.appspot.com",
  messagingSenderId: "723852394728",
  appId: "1:723852394728:web:be7d3db46b34d80727c95d"
};

firebase.initializeApp(firebaseConfig);
const auth = getAuth();
export {auth , firebase, RecaptchaVerifier };