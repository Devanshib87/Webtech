// src/firebase.js
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth"; // Import getAuth
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCySfVEAktQaOqGw3w9Z-WWMfIud9el8Ug",
  authDomain: "sponsored-app-db1ea.firebaseapp.com",
  projectId: "sponsored-app-db1ea",
  storageBucket: "sponsored-app-db1ea.firebasestorage.app",
  messagingSenderId: "751683358950",
  appId: "1:751683358950:web:872ab3b76a58fc5b326b27",
  measurementId: "G-7J87PV577K"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app); // Initialize Firestore
const auth = getAuth(app); // Initialize Auth


export { db, auth, app }; // Export auth and app too