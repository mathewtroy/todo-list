import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { db } from "../lib/firebase";
import { listen_tasks } from "../services/taskService";

/**
 * Hook for real-time task subscription
 */
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
      unsubscribe = listen_tasks(
        db,
        user.uid,
        type,
        (data) => {
          setTasks(data);
          setLoading(false);
        },
        (err) => {
          console.error("🔥 listen_tasks error:", err);
          setError("Failed to load tasks");
          setLoading(false);
        }
      );
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
