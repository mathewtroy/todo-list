import TaskTabs from "../components/tasks/TaskTabs";
import TaskList from "../components/tasks/TaskList";

export default function Deleted() {
  return (
    <section className="section">
      <h1 className="page-title">Deleted Tasks</h1>
      <p className="page-subtitle">
        These are tasks in your trash. You can restore or delete them permanently.
      </p>

      <div className="section card">
        <TaskTabs />
        <TaskList type="trash" />
      </div>
    </section>
  );
}
