export default function TaskEditor({
  title,
  notes,
  onTitle,
  onNotes,
  onSave,
  onCancel,
  saving,
}) {
  return (
    <>
      <input
        className="input"
        value={title}
        onChange={(e) => onTitle(e.target.value)}
        placeholder="Edit title..."
      />
      <textarea
        className="input"
        rows="2"
        value={notes}
        onChange={(e) => onNotes(e.target.value)}
        placeholder="Edit notes..."
      />
      <div className="profile__actions">
        <button className="btn" onClick={onSave} disabled={saving}>
          {saving ? "Saving..." : "Save"}
        </button>
        <button className="btn btn--purple" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </>
  );
}
