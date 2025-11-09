import TaskTabs from "../components/TaskTabs";
import TaskList from "../components/TaskList";

export default function Completed() {
  return (
    <section className="section">
      <h1 className="page-title">Completed Tasks</h1>
      <p className="page-subtitle">Here are your finished tasks.</p>

      <div className="section card">
        <TaskTabs />
        <TaskList type="completed" />
      </div>
    </section>
  );
}
