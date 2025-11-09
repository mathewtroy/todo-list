import { formatDate } from "../../utils/formatDate";

export default function TaskView({ task }) {
  return (
    <>
      <div className="task-item__title">
        {task.completed ? <s>{task.title}</s> : task.title}
      </div>

      {task.notes && (
        <div className="task-item__meta">
          <em>{task.notes}</em>
        </div>
      )}

      <div className="task-item__meta">
        {task.deletedAt ? (
          <span className="badge badge--trash">trashed</span>
        ) : task.completed ? (
          <span className="badge badge--done">done</span>
        ) : (
          <span className="badge">active</span>
        )}
        <span> • created {formatDate(task.createdAt)}</span>
      </div>
    </>
  );
}
