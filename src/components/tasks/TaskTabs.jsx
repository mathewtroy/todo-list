import { NavLink } from "react-router-dom";

export default function TaskTabs() {
  return (
    <div className="tabs tabs--mb">
      <NavLink
        to="/tasks/active"
        className={({ isActive }) => `tab ${isActive ? "tab--active" : ""}`}
      >
        Active
      </NavLink>
      <NavLink
        to="/tasks/completed"
        className={({ isActive }) => `tab ${isActive ? "tab--active" : ""}`}
      >
        Completed
      </NavLink>
      <NavLink
        to="/tasks/deleted"
        className={({ isActive }) => `tab ${isActive ? "tab--active" : ""}`}
      >
        Deleted
      </NavLink>
    </div>
  );
}
