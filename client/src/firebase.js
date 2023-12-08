// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-auth-b8f51.firebaseapp.com",
  projectId: "mern-auth-b8f51",
  storageBucket: "mern-auth-b8f51.appspot.com",
  messagingSenderId: "89952531071",
  appId: "1:89952531071:web:610ecf208f8f517a1d054a"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);