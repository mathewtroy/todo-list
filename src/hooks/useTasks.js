import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../lib/firebase";
import { listenTasks } from "../services/taskService";

export function useTasks(type = "active") {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState(null);

  // Listen to auth state (safe way)
  useEffect(() => {
    const unsubAuth = onAuthStateChanged(auth, (user) => {
      setUserId(user ? user.uid : null);
    });
    return unsubAuth;
  }, []);

  // Listen to Firestore tasks
  useEffect(() => {
    if (!userId) return;

    setLoading(true);
    const unsubTasks = listenTasks(userId, type, (data) => {
      setTasks(data);
      setLoading(false);
    });

    return () => unsubTasks();
  }, [userId, type]);

  return { tasks, loading };
}
