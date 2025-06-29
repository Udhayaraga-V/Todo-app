import React, { useEffect, useState } from "react";
import { db, auth } from "../firebase";
import {
  collection,
  query,
  where,
  orderBy,
  limit,
  startAfter,
  onSnapshot,
  updateDoc,
  deleteDoc,
  doc
} from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [lastVisible, setLastVisible] = useState(null);
  const [userId, setUserId] = useState(null);
  const [pageListeners, setPageListeners] = useState([]);
  const [hasMore, setHasMore] = useState(true);

  const pageSize = 5;

  // Load page with onSnapshot and real-time updates
  const loadPage = (uid, startAfterDoc) => {
    let q = query(
      collection(db, "tasks"),
      where("ownerId", "==", uid),
      orderBy("createdAt", "desc"),
      limit(pageSize)
    );

    if (startAfterDoc) {
      q = query(q, startAfter(startAfterDoc));
    }

    const unsub = onSnapshot(q, (snapshot) => {
      const newTasks = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setTasks((prev) => [...prev, ...newTasks]);

      if (snapshot.docs.length > 0) {
        setLastVisible(snapshot.docs[snapshot.docs.length - 1]);
        if (snapshot.docs.length < pageSize) {
          setHasMore(false);
        }
      } else {
        setHasMore(false);
      }

      setLoading(false);
    });

    setPageListeners((prev) => [...prev, unsub]);
  };

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      if (!user) return;
      setUserId(user.uid);
      loadPage(user.uid, null); // Load first page
    });

    return () => {
      // Clean up all listeners
      pageListeners.forEach((unsub) => unsub());
    };
  }, []);

  // ✅ Mark task as completed
  const markComplete = async (id) => {
    try {
      const taskRef = doc(db, "tasks", id);
      await updateDoc(taskRef, {
        status: "completed",
        updatedAt: new Date()
      });
      alert("Task marked as complete!");
    } catch (err) {
      console.error("Error updating task:", err);
    }
  };

  // 🗑 Delete a task
  const deleteTask = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this task?");
    if (!confirmDelete) return;

    try {
      await deleteDoc(doc(db, "tasks", id));
      alert("Task deleted.");
    } catch (err) {
      console.error("Error deleting task:", err);
    }
  };

  if (loading) return <p>Loading tasks...</p>;

  return (
    <div style={{ marginTop: "2rem" }}>
      <h2>Your Tasks</h2>
      {tasks.length === 0 && <p>No tasks found.</p>}
      {tasks.map((task) => (
        <div
          key={task.id}
          style={{
            border: "1px solid #ccc",
            padding: "1rem",
            marginBottom: "1rem",
            backgroundColor: task.status === "completed" ? "#e0ffe0" : "#fff"
          }}
        >
          <h4>{task.title}</h4>
          <p>{task.description}</p>
          <p><strong>Status:</strong> {task.status}</p>
          <p><strong>Priority:</strong> {task.priority}</p>
          <p><strong>Due:</strong> {task.dueDate?.toDate().toLocaleDateString()}</p>

          <button
            onClick={() => markComplete(task.id)}
            disabled={task.status === "completed"}
          >
            ✅ Mark as Complete
          </button>{" "}
          <button onClick={() => deleteTask(task.id)}>🗑️ Delete</button>
        </div>
      ))}

      {hasMore && (
        <button onClick={() => loadPage(userId, lastVisible)}>
          ➕ Load More
        </button>
      )}
    </div>
  );
}

export default TaskList;
