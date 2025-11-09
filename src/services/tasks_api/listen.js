import { onSnapshot } from "firebase/firestore";
import { buildTaskQuery } from "./queries.js";

/** Listen to task changes */
export function listenTasks(db, userId, type = "active", onData, onError) {
  if (!userId) {
    console.warn("⚠️ listenTasks called before userId was set");
    return () => {};
  }

  const q = buildTaskQuery(db, userId, type);
  if (!q) return () => {};

  try {
    const unsubscribe = onSnapshot(
      q,
      (snap) => {
        const tasks = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
        onData?.(tasks);
      },
      (err) => {
        console.error("❌ onSnapshot error:", err);
        onError?.(err);
      }
    );
    return unsubscribe;
  } catch (err) {
    console.error("❌ listenTasks error:", err);
    onError?.(err);
    return () => {};
  }
}
