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

export const signOut = () => auth.signOut();

window.firebase = firebase;

export const createUserDocument = async (user, additionalData) => {
  if (!user) return;

  // Get a reference to a place in the database that might contain the user profile.
  const userRef = firestore.doc(`users/${user.uid}`);

  // Go and fetch the document from that location

  const snapshot = await userRef.get();

  // check if the snapshot doesn't exist, that is, if we don't have a user document. If that is the case, create a new user document
  if (!snapshot.exists) {
    const { displayName, email, photoURL } = user;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        photoURL,
        createdAt,
        ...additionalData,
      });
    } catch (error) {
      console.error("Error creating user", error.message);
    }
  }

  return getUserDocument(user.uid);
};

export const getUserDocument = async (uid) => {
  if (!uid) return null;

  try {
    return firestore.collection("users").doc(uid);
  } catch (error) {
    console.log("error fetching user");
  }
};

export default firebase;
