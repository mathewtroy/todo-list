import TaskItem from "./TaskItem";
import Loader from "./Loader";
import EmptyState from "./EmptyState";
import { useTasks } from "../../hooks/useTasks";

export default function TaskList({ type = "active" }) {
  const { tasks, loading, error } = useTasks(type);

  if (loading) return <Loader text="Loading tasks..." />;

  if (error) return <EmptyState message="Failed to load tasks. Please try again." />;

  if (!tasks.length)
    return <EmptyState message="No tasks found." />;

  return (
    <div className="task-list">
      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} />
      ))}
    </div>
  );
}
