import TaskList from "../components/TaskList";
import { Link } from "react-router-dom";

export default function Deleted() {
  return (
    <section className="section">
      <h1 className="page-title">Deleted Tasks</h1>
      <p className="page-subtitle">
        These are tasks in your trash. You can restore or delete them permanently.
      </p>

      <div className="card">
        <div className="tabs" style={{ marginBottom: ".5rem" }}>
          <Link to="/tasks/active" className="tab">
            Active
          </Link>
          <Link to="/tasks/completed" className="tab">
            Completed
          </Link>
          <Link to="/tasks/deleted" className="tab tab--active">
            Deleted
          </Link>
        </div>
        <TaskList type="trash" />
      </div>
    </section>
  );
}
