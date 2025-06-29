import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// 👇 Paste your actual config below from Firebase Console
const firebaseConfig = {
  apiKey: "AIzaSyCyz2AZnFY3lQu1fzGnY9qrT11Ur9GkPlc",
  authDomain: "tidal-axis-464315-h9.firebaseapp.com",
  projectId: "tidal-axis-464315-h9",
  storageBucket: "tidal-axis-464315-h9.firebasestorage.app",
  messagingSenderId: "361157725991",
  appId: "1:361157725991:web:49009afc3f60cfead7e302"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export Firebase services
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);
window.firebase = {
  auth,
  db,
  provider
};