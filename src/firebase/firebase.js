// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDRouLF-oa6XP_g0WkObmhMFqT5v6LGOCM",
  authDomain: "howdy-2c724.firebaseapp.com",
  projectId: "howdy-2c724",
  storageBucket: "howdy-2c724.appspot.com",
  messagingSenderId: "937007811989",
  appId: "1:937007811989:web:15cfe1045ad4112c067a9c",
  measurementId: "G-VJF5JH3K0T",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);
const storage = getStorage(app);

export { auth, firestore, storage };
