import { db } from "../lib/firebase";
import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  serverTimestamp,
  query,
  where,
  orderBy,
  getDocs,
} from "firebase/firestore";

/* Create new task */
export async function createTask(userId, data) {
  return addDoc(collection(db, "tasks"), {
    userId,
    title: data.title,
    notes: data.notes || "",
    completed: false,
    deletedAt: null,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
}

/* Update or edit task */
export async function editTask(taskId, updates) {
  const ref = doc(db, "tasks", taskId);
  return updateDoc(ref, {
    ...updates,
    updatedAt: serverTimestamp(),
  });
}

/* Mark task as completed */
export async function completeTask(taskId, done = true) {
  const ref = doc(db, "tasks", taskId);
  return updateDoc(ref, {
    completed: done,
    updatedAt: serverTimestamp(),
  });
}

/* Move to trash (soft delete) */
export async function moveToTrash(taskId) {
  const ref = doc(db, "tasks", taskId);
  return updateDoc(ref, {
    deletedAt: Date.now(),
    updatedAt: serverTimestamp(),
  });
}

/* Restore from trash */
export async function restoreTask(taskId) {
  const ref = doc(db, "tasks", taskId);
  return updateDoc(ref, {
    deletedAt: null,
    updatedAt: serverTimestamp(),
  });
}

/* Permanently delete */
export async function deleteTask(taskId) {
  return deleteDoc(doc(db, "tasks", taskId));
}

/* Queries */
export async function getActiveTasks(userId) {
  const q = query(
    collection(db, "tasks"),
    where("userId", "==", userId),
    where("completed", "==", false),
    where("deletedAt", "==", null),
    orderBy("createdAt", "desc")
  );
  const snap = await getDocs(q);
  return snap.docs.map(d => ({ id: d.id, ...d.data() }));
}

export async function getCompletedTasks(userId) {
  const q = query(
    collection(db, "tasks"),
    where("userId", "==", userId),
    where("completed", "==", true),
    where("deletedAt", "==", null),
    orderBy("updatedAt", "desc")
  );
  const snap = await getDocs(q);
  return snap.docs.map(d => ({ id: d.id, ...d.data() }));
}

export async function getTrashedTasks(userId) {
  const q = query(
    collection(db, "tasks"),
    where("userId", "==", userId),
    where("deletedAt", ">", 0),
    orderBy("deletedAt", "desc")
  );
  const snap = await getDocs(q);
  return snap.docs.map(d => ({ id: d.id, ...d.data() }));
}
