// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyChrVS_AJfErLOBbVhAd7tRUEpVqPZuftI",
  authDomain: "findme-36f0d.firebaseapp.com",
  projectId: "findme-36f0d",
  storageBucket: "findme-36f0d.firebasestorage.app",
  messagingSenderId: "478217530806",
  appId: "1:478217530806:web:67c827a2799dd91abca517",
  measurementId: "G-QSJGFCQCZK",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };
