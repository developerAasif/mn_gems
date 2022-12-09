import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDlX9Scz0vB9ssvIggd6sdI4nDwKg4w_UM",
  authDomain: "mn-gems-web.firebaseapp.com",
  projectId: "mn-gems-web",
  storageBucket: "mn-gems-web.appspot.com",
  messagingSenderId: "723852394728",
  appId: "1:723852394728:web:be7d3db46b34d80727c95d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;
