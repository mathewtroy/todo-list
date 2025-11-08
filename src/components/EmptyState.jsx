export default function EmptyState({ message = "No tasks yet." }) {
  return <div className="empty">{message}</div>;
}
