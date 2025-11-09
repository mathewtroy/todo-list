import {
  addDoc,
  collection,
  doc,
  updateDoc,
  deleteDoc,
  serverTimestamp,
} from "firebase/firestore";

/**
 * Creates a new task document
 */
export async function create_task(db, user_id, { title, notes }) {
  if (!user_id) throw new Error("Missing user ID");
  const ref = collection(db, "tasks");
  await addDoc(ref, {
    userId: user_id,
    title: title.trim(),
    notes: (notes || "").trim(),
    completed: false,
    deletedAt: null,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
}

/**
 * Marks task as complete or incomplete
 */
export async function complete_task(db, task_id, value) {
  if (!task_id) return;
  await updateDoc(doc(db, "tasks", task_id), {
    completed: value,
    updatedAt: serverTimestamp(),
  });
}

/**
 * Moves task to trash (soft delete)
 */
export async function move_to_trash(db, task_id) {
  if (!task_id) return;
  await updateDoc(doc(db, "tasks", task_id), {
    deletedAt: Date.now(),
  });
}

/**
 * Restores a task from trash
 */
export async function restore_task(db, task_id) {
  if (!task_id) return;
  await updateDoc(doc(db, "tasks", task_id), {
    deletedAt: null,
    updatedAt: serverTimestamp(),
  });
}

/**
 * Updates title/notes of a task
 */
export async function update_task(db, task_id, updates) {
  if (!task_id || !updates) return;
  await updateDoc(doc(db, "tasks", task_id), {
    ...updates,
    updatedAt: serverTimestamp(),
  });
}

/**
 * Permanently deletes task
 */
export async function delete_task(db, task_id) {
  if (!task_id) return;
  await deleteDoc(doc(db, "tasks", task_id));
}
