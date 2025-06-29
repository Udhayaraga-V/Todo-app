import React from "react";
import { signInWithPopup } from "firebase/auth";
import { auth, provider, db } from "../firebase";
import { doc, setDoc } from "firebase/firestore";

function Login() {
  const loginWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // Save user to Firestore
      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        name: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
      });

      alert(`Welcome, ${user.displayName}`);
    } catch (error) {
      console.error("Login Error:", error.message);
      alert("Login failed!");
    }
  };

  return (
    <div style={{ padding: "2rem" }}>
      <button onClick={loginWithGoogle}>
        Login with Google
      </button>
    </div>
  );
}

export default Login;
