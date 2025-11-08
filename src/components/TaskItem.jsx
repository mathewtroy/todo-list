import { completeTask, moveToTrash, restoreTask, deleteTask } from "../services/taskService";

export default function TaskItem({ task, onChanged }) {
  const toggleComplete = async () => {
    await completeTask(task.id, !task.completed);
    onChanged?.();
  };

  const softDelete = async () => {
    await moveToTrash(task.id);
    onChanged?.();
  };

  const restore = async () => {
    await restoreTask(task.id);
    onChanged?.();
  };

  const hardDelete = async () => {
    await deleteTask(task.id);
    onChanged?.();
  };

  return (
    <div className="task-item">
      <div>
        <div className="task-item__title">
          {task.completed ? <s>{task.title}</s> : task.title}
        </div>
        <div className="task-item__meta">
          {task.deletedAt ? (
            <span className="badge badge--trash">trashed</span>
          ) : task.completed ? (
            <span className="badge badge--done">done</span>
          ) : (
            <span className="badge">active</span>
          )}
        </div>
      </div>

      <div className="task-item__actions">
        {!task.deletedAt && (
          <>
            <button className="btn" onClick={toggleComplete}>
              {task.completed ? "Undo" : "Complete"}
            </button>
            <button className="btn btn--purple" onClick={softDelete}>
              Delete
            </button>
          </>
        )}

        {task.deletedAt && (
          <>
            <button className="btn" onClick={restore}>
              Restore
            </button>
            <button className="btn btn--purple" onClick={hardDelete}>
              Delete Permanently
            </button>
          </>
        )}
      </div>
    </div>
  );
}
