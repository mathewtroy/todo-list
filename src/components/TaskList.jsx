import TaskItem from "./TaskItem";
import Loader from "./Loader";
import EmptyState from "./EmptyState";
import { useTasks } from "../hooks/useTasks";

export default function TaskList({ type = "active" }) {
  const { tasks, loading } = useTasks(type);

  if (loading) return <Loader />;
  if (!tasks.length) return <EmptyState message="No tasks found." />;

  return (
    <div className="task-list">
      {tasks.map((t) => (
        <TaskItem key={t.id} task={t} />
      ))}
    </div>
  );
}
