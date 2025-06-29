import React, { useState } from "react";
import { db, auth } from "../firebase";
import { collection, addDoc, Timestamp } from "firebase/firestore";

function AddTask() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("medium");
  const [dueDate, setDueDate] = useState("");

  const handleAdd = async () => {
    const user = auth.currentUser;

    if (!user) {
      alert("Please login first");
      return;
    }

    if (!title) {
      alert("Title is required");
      return;
    }

    try {
      await addDoc(collection(db, "tasks"), {
        title,
        description,
        priority,
        status: "pending",
        dueDate: Timestamp.fromDate(new Date(dueDate)),
        ownerId: user.uid,
        sharedWith: [],
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now(),
      });

      alert("Task added!");
      setTitle("");
      setDescription("");
      setDueDate("");
      setPriority("medium");
    } catch (err) {
      console.error("Error adding task:", err);
      alert("Failed to add task.");
    }
  };

  return (
    <div style={{ padding: "1rem", borderTop: "1px solid #ccc" }}>
      <h3>Add New Task</h3>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      /><br /><br />
      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      /><br /><br />
      <input
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
      /><br /><br />
      <select value={priority} onChange={(e) => setPriority(e.target.value)}>
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select><br /><br />
      <button onClick={handleAdd}>Add Task</button>
    </div>
  );
}

export default AddTask;
