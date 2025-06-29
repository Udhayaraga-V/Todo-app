# ✅ Full Stack Task Manager Web App (Firebase + React)

This is a real-time, full-stack task management web application built as part of the **Katomaran Full Stack Hackathon**. It supports user authentication, task creation, management, and real-time updates using a modern, scalable cloud-native stack.

---

## 🚀 Live Demo

🌐 [Open Live App](https://your-project-id.web.app)  
📁 [View Source Code](https://github.com/your-username/todo-hackathon)

---

## 🧩 Project Objectives

- Build a full-featured task management tool with Google login
- Implement real-time updates and user-specific task scoping
- Support complete CRUD operations with pagination
- Deploy to the cloud with production-ready tools

---

## ✨ Features

| Category        | Feature Description                                      |
|-----------------|----------------------------------------------------------|
| 🔐 Authentication | Google OAuth 2.0 using Firebase Auth                   |
| 📝 Tasks          | Create, Read, Update, Delete (CRUD)                    |
| 👤 Per User       | Tasks are scoped to logged-in users                    |
| 🔁 Real-time      | Tasks update in real-time using Firestore onSnapshot   |
| 🧮 Pagination     | Load tasks page-by-page (5 per page)                   |
| 🧾 Sorting        | Tasks sorted by creation date                          |
| ✅ Status Update  | Mark tasks as complete                                 |
| 🗑️ Delete         | Delete tasks with confirmation                        |
| 🌍 Hosting        | Deployed with Firebase Hosting                         |
| 🌐 REST API       | Exposed RESTful endpoint via Firebase Cloud Functions |

---

## 🧠 Why This Tech Stack?

| Layer         | Tech Used       | Why? |
|---------------|------------------|------|
| Frontend      | React + Vite     | Fast development, modern JSX support, blazing-fast build |
| Backend       | Firebase Firestore | Real-time DB, scalable, managed NoSQL |
| Authentication| Firebase Auth (OAuth 2.0) | Secure Google Sign-In, JWT-based sessions |
| Hosting       | Firebase Hosting | Free, fast, HTTPS-enabled by default |
| API           | Firebase Cloud Functions | Serverless REST API support |

---

## 🔌 Backend Capabilities

| Capability                            | Implementation                         |
|---------------------------------------|-----------------------------------------|
| OAuth 2.0 & JWT Auth                  | Firebase Authentication (Google Sign-In) |
| RESTful API (GET /tasks)             | Firebase Functions (HTTPS callable)     |
| CRUD with user scoping               | Firestore with `ownerId` field          |
| Real-time updates                    | Firestore `onSnapshot()`                |
| Pagination                           | `limit()` + `startAfter()` in Firestore |
| Sorting                              | `orderBy(createdAt)`                    |
| Input Validation                     | Client-side validation in React         |
| Rate Limiting (Optional)             | Firebase Rules or quota limits          |

---

## 📂 Folder Structure
todo-frontend/
├── src/
│ ├── components/
│ │ ├── Login.jsx
│ │ ├── AddTask.jsx
│ │ └── TaskList.jsx
│ ├── firebase.js
│ └── App.jsx
├── public/
├── dist/ # built files for hosting
├── functions/ # Firebase backend functions
│ └── index.js # REST API (getUserTasks)
├── firebase.json
└── README.md

🧪 How to Use
Login with Google

Add new tasks with title, priority, due date

See your tasks instantly appear in real-time

Mark tasks as complete or delete them

Click “Load More” to view paginated results


“This project is a part of a hackathon run by 
https://www.katomaran.com
