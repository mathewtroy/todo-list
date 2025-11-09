import { collection, query, where, orderBy } from "firebase/firestore";

/**
 * Builds a Firestore query based on task type
 */
export function build_task_query(db, user_id, type = "active") {
  if (!db || !user_id) return null;

  const ref = collection(db, "tasks");

  switch (type) {
    case "active":
      return query(
        ref,
        where("userId", "==", user_id),
        where("completed", "==", false),
        where("deletedAt", "==", null),
        orderBy("createdAt", "desc")
      );

    case "completed":
      return query(
        ref,
        where("userId", "==", user_id),
        where("completed", "==", true),
        where("deletedAt", "==", null),
        orderBy("updatedAt", "desc")
      );

    case "deleted":
    case "trash":
      return query(
        ref,
        where("userId", "==", user_id),
        where("deletedAt", ">", 0),
        orderBy("deletedAt", "desc")
      );

    default:
      console.warn("⚠️ Unknown task type:", type);
      return null;
  }
}
