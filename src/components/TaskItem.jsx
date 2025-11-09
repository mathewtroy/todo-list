import {
  completeTask,
  moveToTrash,
  restoreTask,
  deleteTask,
  updateTask,
} from "../services/taskService";
import { useState } from "react";

function formatDate(ts) {
  if (!ts) return "";
  try {
    const date =
      typeof ts.toDate === "function" ? ts.toDate() : new Date(ts);
    return date.toLocaleString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return "";
  }
}

export default function TaskItem({ task, onChanged }) {
  const [editing, setEditing] = useState(false);
  const [titleEdit, setTitleEdit] = useState(task.title);
  const [notesEdit, setNotesEdit] = useState(task.notes || "");
  const [saving, setSaving] = useState(false);

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

  const saveEdit = async () => {
    if (!titleEdit.trim()) return;
    setSaving(true);
    await updateTask(task.id, {
      title: titleEdit.trim(),
      notes: notesEdit.trim(),
    });
    setSaving(false);
    setEditing(false);
    onChanged?.();
  };

  return (
    <div className="task-item">
      <div style={{ flex: 1 }}>
        {!editing ? (
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
        ) : (
          <>
            <input
              className="input"
              value={titleEdit}
              onChange={(e) => setTitleEdit(e.target.value)}
              placeholder="Edit title..."
            />
            <textarea
              className="input"
              rows="2"
              value={notesEdit}
              onChange={(e) => setNotesEdit(e.target.value)}
              placeholder="Edit notes..."
            ></textarea>
            <div className="profile__actions">
              <button
                className="btn"
                onClick={saveEdit}
                disabled={saving}
              >
                {saving ? "Saving..." : "Save"}
              </button>
              <button
                className="btn btn--purple"
                onClick={() => setEditing(false)}
              >
                Cancel
              </button>
            </div>
          </>
        )}
      </div>

      <div className="task-item__actions">
        {!task.deletedAt && (
          <>
            {!task.completed && !editing && (
              <button
                className="btn"
                onClick={() => setEditing(true)}
              >
                Edit
              </button>
            )}
            {!editing && (
              <>
                <button className="btn" onClick={toggleComplete}>
                  {task.completed ? "Undo" : "Complete"}
                </button>
                <button className="btn btn--purple" onClick={softDelete}>
                  Delete
                </button>
              </>
            )}
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
