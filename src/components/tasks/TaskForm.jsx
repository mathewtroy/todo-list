import { useState } from "react";
import { createTask } from "../../services/taskService";
import { auth, db } from "../../lib/firebase";

export default function TaskForm({ onCreated }) {
  const [title, setTitle] = useState("");
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    const user = auth.currentUser;
    if (!user) return;

    setLoading(true);
    try {
      await createTask(db, user.uid, { title, notes });
      setTitle("");
      setNotes("");
      onCreated?.();
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={submit} className="form card section">
      <div className="form__group">
        <label className="form__label">Task title</label>
        <input
          className="input"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter your task..."
          required
        />
      </div>
      <div className="form__group">
        <label className="form__label">Notes (optional)</label>
        <textarea
          className="input"
          rows="3"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Add description..."
        ></textarea>
      </div>
      <button type="submit" className="btn btn--block" disabled={loading}>
        {loading ? "Adding..." : "Add Task"}
      </button>
    </form>
  );
}
