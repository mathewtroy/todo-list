import { collection, query, where, orderBy } from "firebase/firestore";

/** Build Firestore query for tasks */
export function buildTaskQuery(db, userId, type = "active") {
  if (!db || !userId) return null;

  const ref = collection(db, "tasks");

  switch (type) {
    case "active":
      return query(
        ref,
        where("userId", "==", userId),
        where("completed", "==", false),
        where("deletedAt", "==", null),
        orderBy("createdAt", "desc")
      );

    case "completed":
      return query(
        ref,
        where("userId", "==", userId),
        where("completed", "==", true),
        where("deletedAt", "==", null),
        orderBy("updatedAt", "desc")
      );

    case "deleted":
    case "trash":
      return query(
        ref,
        where("userId", "==", userId),
        where("deletedAt", ">", 0),
        orderBy("deletedAt", "desc")
      );

    default:
      console.warn("⚠️ Unknown task type:", type);
      return null;
  }
}
