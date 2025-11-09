export default function TaskActions({
  isDeleted,
  isCompleted,
  isEditing,
  onEdit,
  onToggleComplete,
  onSoftDelete,
  onRestore,
  onHardDelete,
}) {
  return (
    <div className="task-item__actions">
      {!isDeleted ? (
        <>
          {!isCompleted && !isEditing && (
            <button className="btn" onClick={onEdit}>
              Edit
            </button>
          )}
          {!isEditing && (
            <>
              <button className="btn" onClick={onToggleComplete}>
                {isCompleted ? "Undo" : "Complete"}
              </button>
              <button className="btn btn--purple" onClick={onSoftDelete}>
                Delete
              </button>
            </>
          )}
        </>
      ) : (
        <>
          <button className="btn" onClick={onRestore}>
            Restore
          </button>
          <button className="btn btn--purple" onClick={onHardDelete}>
            Delete Permanently
          </button>
        </>
      )}
    </div>
  );
}
