import { useState } from "react";
import {
  completeTask,
  moveToTrash,
  restoreTask,
  deleteTask,
  updateTask,
} from "../../services/taskService";
import { db } from "../../lib/firebase";
import TaskView from "./TaskView";
import TaskEditor from "./TaskEditor";
import TaskActions from "./TaskActions";

export default function TaskItem({ task }) {
  const [editing, setEditing] = useState(false);
  const [titleEdit, setTitleEdit] = useState(task.title);
  const [notesEdit, setNotesEdit] = useState(task.notes || "");
  const [saving, setSaving] = useState(false);

  const handleToggleComplete = async () =>
    await completeTask(db, task.id, !task.completed);

  const handleSoftDelete = async () =>
    await moveToTrash(db, task.id);

  const handleRestore = async () =>
    await restoreTask(db, task.id);

  const handleHardDelete = async () =>
    await deleteTask(db, task.id);

  const handleSave = async () => {
    if (!titleEdit.trim()) return;
    setSaving(true);

    await updateTask(db, task.id, {
      title: titleEdit.trim(),
      notes: notesEdit.trim(),
    });

    setSaving(false);
    setEditing(false);
  };

  return (
    <div className="task-item">
      <div style={{ flex: 1 }}>
        {!editing ? (
          <TaskView task={task} />
        ) : (
          <TaskEditor
            title={titleEdit}
            notes={notesEdit}
            onTitle={setTitleEdit}
            onNotes={setNotesEdit}
            onSave={handleSave}
            onCancel={() => setEditing(false)}
            saving={saving}
          />
        )}
      </div>

      <TaskActions
        isDeleted={!!task.deletedAt}
        isCompleted={!!task.completed}
        isEditing={editing}
        onEdit={() => setEditing(true)}
        onToggleComplete={handleToggleComplete}
        onSoftDelete={handleSoftDelete}
        onRestore={handleRestore}
        onHardDelete={handleHardDelete}
      />
    </div>
  );
}
