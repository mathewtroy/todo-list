import { db } from "../lib/firebase";
import {
  addDoc,
  collection,
  doc,
  updateDoc,
  deleteDoc,
  onSnapshot,
  query,
  where,
  orderBy,
  serverTimestamp,
} from "firebase/firestore";

// --- Create Task ---
export async function createTask(userId, { title, notes }) {
  if (!userId) throw new Error("Missing user ID");

  const ref = collection(db, "tasks");
  await addDoc(ref, {
    userId,
    title: title.trim(),
    notes: notes.trim() || "",
    completed: false,
    deletedAt: null,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
}

// --- Real-time listener ---
export function listenTasks(userId, type = "active", callback) {
  if (!userId) {
    console.warn("⚠️ listenTasks called before userId was set");
    return () => {}; // return dummy unsubscribe
  }

  const ref = collection(db, "tasks");
  let q = null;

  switch (type) {
    case "active":
      q = query(
        ref,
        where("userId", "==", userId),
        where("completed", "==", false),
        where("deletedAt", "==", null),
        orderBy("createdAt", "desc")
      );
      break;

    case "completed":
      q = query(
        ref,
        where("userId", "==", userId),
        where("completed", "==", true),
        where("deletedAt", "==", null),
        orderBy("updatedAt", "desc")
      );
      break;

    case "deleted":
    case "trash":
      q = query(
        ref,
        where("userId", "==", userId),
        where("deletedAt", ">", 0),
        orderBy("deletedAt", "desc")
      );
      break;

    default:
      console.warn("⚠️ Unknown task type:", type);
      return () => {};
  }

  try {
    const unsubscribe = onSnapshot(q, (snap) => {
      const tasks = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
      callback(tasks);
    });
    return unsubscribe;
  } catch (err) {
    console.error("❌ listenTasks error:", err);
    return () => {};
  }
}

// --- Update & Delete ---
export async function completeTask(taskId, value) {
  if (!taskId) return;
  const ref = doc(db, "tasks", taskId);
  await updateDoc(ref, {
    completed: value,
    updatedAt: serverTimestamp(),
  });
}

export async function moveToTrash(taskId) {
  if (!taskId) return;
  const ref = doc(db, "tasks", taskId);
  await updateDoc(ref, {
    deletedAt: Date.now(),
  });
}

export async function restoreTask(taskId) {
  if (!taskId) return;
  const ref = doc(db, "tasks", taskId);
  await updateDoc(ref, {
    deletedAt: null,
    updatedAt: serverTimestamp(),
  });
}

export async function updateTask(taskId, updates) {
  if (!taskId || !updates) return;
  const ref = doc(db, "tasks", taskId);
  await updateDoc(ref, {
    ...updates,
    updatedAt: serverTimestamp(),
  });
}


export async function deleteTask(taskId) {
  if (!taskId) return;
  await deleteDoc(doc(db, "tasks", taskId));
}
