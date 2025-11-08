import { useEffect, useState } from "react";
import { getActiveTasks, getCompletedTasks, getTrashedTasks } from "../services/taskService";
import { auth } from "../lib/firebase";
import TaskItem from "./TaskItem";
import Loader from "./Loader";
import EmptyState from "./EmptyState";

export default function TaskList({ type = "active" }) {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    const user = auth.currentUser;
    if (!user) return;

    setLoading(true);
    try {
      let data = [];
      if (type === "active") data = await getActiveTasks(user.uid);
      if (type === "completed") data = await getCompletedTasks(user.uid);
      if (type === "trash") data = await getTrashedTasks(user.uid);
      setTasks(data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, [type]);

  if (loading) return <Loader />;
  if (tasks.length === 0)
    return <EmptyState message="No tasks found for this section." />;

  return (
    <div className="task-list">
      {tasks.map((t) => (
        <TaskItem key={t.id} task={t} onChanged={load} />
      ))}
    </div>
  );
}
