import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
const config = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: "think-piece-2ba00.firebaseapp.com",
  databaseURL: "https://think-piece-2ba00.firebaseio.com",
  projectId: "think-piece-2ba00",
  storageBucket: "think-piece-2ba00.appspot.com",
  messagingSenderId: "170960379787",
  appId: "1:170960379787:web:712a1a66aad5c517cd198e",
  measurementId: "G-N3Q9WDSTH0",
};
// Initialize Firebase
firebase.initializeApp(config);

export const firestore = firebase.firestore();
export const auth = firebase.auth();
export const provider = new firebase.auth.GoogleAuthProvider();

export const signInWithGoogle = () => auth.signInWithPopup(provider);

window.firebase = firebase;

export default firebase;
