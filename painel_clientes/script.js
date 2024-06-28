

// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.3/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.1.3/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.1.3/firebase-firestore.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/9.1.3/firebase-storage.js";


const firebaseConfig = {
  apiKey: "AIzaSyDBejs9asi8LpeZ6vrRIJs2g5PsBtQiGHM",
  authDomain: "portal-cliente-9c54d.firebaseapp.com",
  projectId: "portal-cliente-9c54d",
  storageBucket: "portal-cliente-9c54d.appspot.com",
  messagingSenderId: "222267716659",
  appId: "1:222267716659:web:7d7133b3bc983fbf1a1f46"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const db = getFirestore(app)
const storage = getStorage(app);
console.log(db)
console.log(app)

export { db, auth, storage }
