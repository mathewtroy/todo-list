import { onSnapshot } from "firebase/firestore";
import { build_task_query } from "./queries";

/**
 * Subscribes to real-time updates of tasks
 */
export function listen_tasks(db, user_id, type = "active", on_data, on_error) {
  if (!user_id) {
    console.warn("⚠️ listen_tasks called before user_id was set");
    return () => {};
  }

  const q = build_task_query(db, user_id, type);
  if (!q) return () => {};

  try {
    const unsubscribe = onSnapshot(
      q,
      (snap) => {
        const tasks = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
        on_data?.(tasks);
      },
      (err) => {
        console.error("❌ onSnapshot error:", err);
        on_error?.(err);
      }
    );
    return unsubscribe;
  } catch (err) {
    console.error("❌ listen_tasks error:", err);
    on_error?.(err);
    return () => {};
  }
}
