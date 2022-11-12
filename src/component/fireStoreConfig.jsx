// Import the functions you need from the SDKs you need
import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/firestore'
import 'firebase/compat/storage'
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
if(!firebase.apps.length){
    firebase.initializeApp(firebaseConfig); 
}
export { firebase };