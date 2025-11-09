import { Link } from "react-router-dom";
import TaskForm from "../components/tasks/TaskForm";

export default function Tasks() {
  return (
    <section className="section tasks-page text-center">
      {/* Look Tasks Section */}
      <h2 className="section-title">Look Tasks</h2>
      <div className="card">
        <Link to="/tasks/active" className="btn">
          Go to Active Tasks
        </Link>
      </div>

      {/* Create Task Section */}
      <h2 className="section-title">Create Task</h2>
      <div className="form-wrapper flex justify-center">
        <TaskForm /> { }
      </div>
    </section>
  );
}
