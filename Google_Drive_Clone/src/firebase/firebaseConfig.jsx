import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
  apiKey: "AIzaSyBbsLAYOHMN_MeHPTRctZMPO7Fa81RKrII",
  authDomain: "clone-drive-8dc2d.firebaseapp.com",
  projectId: "clone-drive-8dc2d",
  storageBucket: "clone-drive-8dc2d.appspot.com",
  messagingSenderId: "191740780409",
  appId: "1:191740780409:web:6d3fe8577afc22f87699a8"
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { db, auth, provider };