import TaskTabs from "../components/tasks/TaskTabs";
import TaskList from "../components/tasks/TaskList";

export default function Active() {
  return (
    <section className="section">
      <h1 className="page-title">Active Tasks</h1>
      <p className="page-subtitle">Manage your current tasks.</p>

      <div className="section card">
        <TaskTabs />
        <TaskList type="active" />
      </div>
    </section>
  );
}
