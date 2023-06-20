import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth, GoogleAuthProvider, sendPasswordResetEmail } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyDSR6QLKH4YvbSCb-9qpciBYV21DKaevj8",
  authDomain: "fitquest-5d76b.firebaseapp.com",
  projectId: "fitquest-5d76b",
  storageBucket: "fitquest-5d76b.appspot.com",
  messagingSenderId: "363219579635",
  appId: "1:363219579635:web:d0316928abca2b6d737d86",
  measurementId: "G-0K4R8WSQ08"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const resetPassword = sendPasswordResetEmail;

//const provider = new GoogleAuthProvider();
export {auth, db, resetPassword};