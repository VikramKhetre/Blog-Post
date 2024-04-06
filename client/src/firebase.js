// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
//apiKey: process.env.VITE_FIREBASE_API_KEY, will not work as we are using vite
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY, 
  authDomain: "mern-blog-9ddd7.firebaseapp.com",
  projectId: "mern-blog-9ddd7",
  storageBucket: "mern-blog-9ddd7.appspot.com",
  messagingSenderId: "1011160073918",
  appId: "1:1011160073918:web:e864be70845328a72ac0ef"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);