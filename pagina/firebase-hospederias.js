// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBEt2q1uUTDqoRU9SrmghEoQ263hp3x-SA",
  authDomain: "hospederias-policia.firebaseapp.com",
  databaseURL: "https://hospederias-policia-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "hospederias-policia",
  storageBucket: "hospederias-policia.appspot.com",
  messagingSenderId: "497107244569",
  appId: "1:497107244569:web:8312f08e712b90815b7c88"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);