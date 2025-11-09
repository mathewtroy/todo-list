# ✅ ToDo List App | React + Firebase  

**Author:** Aleksandr Kross <br>
**GitHub:** [https://github.com/mathewtroy/todo-list](https://github.com/mathewtroy/todo-list) <br>
**Website:** [https://todo-krossi.web.app](https://todo-krossi.web.app) <br>
:email: **[For questions, reach out here](mailto:krossale@fel.czut.cz)** 

## 📖 Project Description  
**ToDo List App** is a modern web application built with **React** and **Firebase**.  
It allows users to register, create tasks, edit them, mark them as completed, or move them to trash — all updated in real-time using Firestore listeners.  

## 🎯 Core Features  
- 🔐 Register and login with **Firebase Authentication**  
- 🧠 Unique email validation during registration  
- 🗂️ Create, edit, complete, and delete tasks  
- ♻️ Soft delete (trash) and restore tasks  
- ☁️ Real-time sync via **Firestore onSnapshot()**  
- 👤 User profile  
- 🌐 Hosted on **Firebase Hosting**

## ⚙️ Technologies

| **Category** | **Technologies** |
|---------------|------------------|
| **Frontend** | React 19, React Router DOM v7, Vite |
| **Backend / Database** | Firebase Authentication, Cloud Firestore |
| **Hosting** | Firebase Hosting |
| **Styling** | Tailwind CSS + custom CSS |
| **Linting / Tools** | ESLint, npm |
| **Version Control** | Git, GitHub |

## 🧩 Project Structure of CANDLY

**.env**  Environment variables (Firebase config) <br>
**.gitignore**  Ignored files and folders for Git <br>
**eslint.config.js**  Project linting rules <br>
**index.html**  Main HTML entry file for Vite <br>
**package.json**  Project dependencies and scripts <br>
**package-lock.json**  Dependency lock file <br>
**postcss.config.js**  TailwindCSS post-processing setup <br>
**tailwind.config.js**  TailwindCSS configuration <br>
**vite.config.js**  Vite build and dev server configuration <br>
**README.md**  Project documentation <br>
**public/**  Public assets (favicon, manifest, static files) <br>
**node_modules/**  Installed npm dependencies <br>
**src/**  Main application source code <br>
**src/assets/**  Icons, images, and logos <br>
**src/components/**  Reusable React components <br>
**src/components/tasks/**  Task-related UI components (TaskForm, TaskList, etc.) <br>
**src/context/**  React Context for global state (Auth) <br>
**src/hooks/**  Custom React hooks (e.g. useTasks) <br>
**src/lib/**  Firebase initialization and configs <br>
**src/pages/**  App pages (Home, Login, Register, Tasks, Profile, etc.) <br>
**src/routes/**  Protected route handling for auth users <br>
**src/services/**  App logic and Firebase services <br>
**src/services/tasks_api/**  Task CRUD API layer (queries, mutations, listeners) <br>
**src/styles/**  CSS files (base, forms, navbar, tasks, variables) <br>
**src/utils/**  Utility functions (date formatting, validation) <br>
**src/App.jsx**  Main React component with router <br>
**src/main.jsx**  App entry point (ReactDOM render) <br>
**src/index.css**  Global stylesheet <br>

## 🚀 How to Run the Project
1️⃣ **Clone the repository:** <br>
`git clone https://github.com/mathewtroy/todo-list.git` <br>
`cd todo-list`

2️⃣ **Install dependencies:** <br>
`npm install`

3️⃣ **Create a** `.env` **file and add Firebase + Cloudinary keys:** <br>
```bash
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=todo-krossi
VITE_FIREBASE_STORAGE_BUCKET=todo-krossi.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

4️⃣ **Run the app locally:**
`npm run dev` <br>
**Visit** http://localhost:5173

## ☁️ Firebase Hosting Deployment
1️⃣  **Install Firebase CLI:** <br>
`npm install -g firebase-tools`

2️⃣  **Log in to Firebase:** <br>
`firebase login`
`firebase init hosting`

3️⃣  **Build the project:** <br>
`npm run build`

4️⃣  **Deploy:** <br>
`firebase deploy --only hosting`

**App will be available at** https://todo-krossi.web.app

## 🔐 Firestore Rules
```bash
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    function signedIn() { return request.auth != null; }
    function isOwner(uid) { return signedIn() && request.auth.uid == uid; }

    match /tasks/{taskId} {
      allow create: if signedIn() && request.resource.data.userId == request.auth.uid;
      allow read, update, delete: if isOwner(resource.data.userId);
    }

    match /users/{uid} {
      allow read, write: if isOwner(uid);
    }
  }
}
```

## 💡 Future Features
- Pagination and search for tasks
- Dark mode theme
- Task deadline notifications
- Better mobile responsiveness
- Admin dashboard
  
## 🧠 Project Purpose
The ToDo List App demonstrates how to build a structured, modular, and secure full-stack web app using React + Firebase.
It highlights clean architecture, reusable hooks, separation of logic into services, and modern deployment on Firebase Hosting.

© 2025 Aleksandr Kross
