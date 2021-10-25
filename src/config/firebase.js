// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB8oX4npiuyzl2s9I7VHzNfXqnxaTp9Q-E",
  authDomain: "signal-clone-c7498.firebaseapp.com",
  projectId: "signal-clone-c7498",
  storageBucket: "signal-clone-c7498.appspot.com",
  messagingSenderId: "418875139608",
  appId: "1:418875139608:web:a5332c7eea08246ec4c56d"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app)
// const auth = getAuth(app)


export { app, firebaseConfig, firestore }
