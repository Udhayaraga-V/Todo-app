import React, { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import Login from "./components/Login";
import AddTask from "./components/AddTask";
import TaskList from "./components/TaskList";

function App() {
  const [user, setUser] = useState(null);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setChecking(false);
    });
    return () => unsubscribe();
  }, []);

  if (checking) return <p>🔄 Checking login status...</p>;

  return (
    <div style={{ padding: "1rem" }}>
      <h1>Todo Task Manager</h1>
      <Login />
      {user && (
        <>
          <AddTask />
          <TaskList />
        </>
      )}
    </div>
  );
}

export default App;
