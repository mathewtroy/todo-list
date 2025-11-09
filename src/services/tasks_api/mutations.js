import {
  addDoc,
  collection,
  doc,
  updateDoc,
  deleteDoc,
  serverTimestamp,
} from "firebase/firestore";

/** Create a new task */
export async function createTask(db, userId, { title, notes }) {
  if (!userId) throw new Error("Missing user ID");
  const ref = collection(db, "tasks");
  await addDoc(ref, {
    userId,
    title: title.trim(),
    notes: (notes || "").trim(),
    completed: false,
    deletedAt: null,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
}

/** Mark complete/incomplete */
export async function completeTask(db, taskId, value) {
  if (!taskId) return;
  await updateDoc(doc(db, "tasks", taskId), {
    completed: value,
    updatedAt: serverTimestamp(),
  });
}

/** Soft delete */
export async function moveToTrash(db, taskId) {
  if (!taskId) return;
  await updateDoc(doc(db, "tasks", taskId), {
    deletedAt: Date.now(),
  });
}

/** Restore task */
export async function restoreTask(db, taskId) {
  if (!taskId) return;
  await updateDoc(doc(db, "tasks", taskId), {
    deletedAt: null,
    updatedAt: serverTimestamp(),
  });
}

/** Update task */
export async function updateTask(db, taskId, updates) {
  if (!taskId || !updates) return;
  await updateDoc(doc(db, "tasks", taskId), {
    ...updates,
    updatedAt: serverTimestamp(),
  });
}

/** Permanently delete */
export async function deleteTask(db, taskId) {
  if (!taskId) return;
  await deleteDoc(doc(db, "tasks", taskId));
}
