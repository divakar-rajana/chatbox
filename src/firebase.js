// Import the functions you need from the SDKs you need
import firebase from "firebase/app"

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAGprziUHIOmkEqkE8kBuhbMWpH_Ecd5Uk",
  authDomain: "chatting-27023.firebaseapp.com",
  projectId: "chatting-27023",
  storageBucket: "chatting-27023.appspot.com",
  messagingSenderId: "649663797742",
  appId: "1:649663797742:web:f1f6720a6673437e4a96ff"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();