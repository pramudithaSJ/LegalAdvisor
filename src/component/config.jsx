// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDzD5MuM7Ozvmuu9I5oA8Ph0jCZQ-l7CX8",
  authDomain: "legal-12686.firebaseapp.com",
  projectId: "legal-12686",
  storageBucket: "legal-12686.appspot.com",
  messagingSenderId: "555365699930",
  appId: "1:555365699930:web:7931103fa08813c66ee363"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig); 
export const db = getDatabase(app);