import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";
import { Link } from "react-router-dom";

export default function Active() {
  return (
    <section className="section">
      <h1 className="page-title">Active Tasks</h1>
      <p className="page-subtitle">Manage your current tasks.</p>

      <div className="section card">
        <div className="tabs" style={{ marginBottom: ".5rem" }}>
          <Link to="/tasks/active" className="tab tab--active">
            Active
          </Link>
          <Link to="/tasks/completed" className="tab">
            Completed
          </Link>
          <Link to="/tasks/deleted" className="tab">
            Deleted
          </Link>
        </div>
        <TaskList type="active" />
      </div>
    </section>
  );
}
