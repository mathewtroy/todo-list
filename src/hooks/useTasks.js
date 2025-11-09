import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { listenTasks } from "../services/taskService";
import { db } from "../lib/firebase";

export function useTasks(type = "active") {
  const { user } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!user) return;

    setLoading(true);
    setError(null);

    let unsubscribe;

    try {
      unsubscribe = listenTasks(db, user.uid, type, (data) => {
        setTasks(data);
        setLoading(false);
      });
    } catch (err) {
      console.error("🔥 Error in useTasks:", err);
      setError("Failed to load tasks");
      setLoading(false);
    }

    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, [user, type]);

  return { tasks, loading, error };
}
