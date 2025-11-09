import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { logoutUser } from "../services/authService";
import logo from "../assets/todo-list-ico.svg";

export default function Navbar() {
  const { user, loading } = useAuth();

  const handleLogout = async () => {
    await logoutUser();
  };

  return (
    <nav className="navbar">
      <Link to="/" className="navbar__logo">
        <img src={logo} alt="TodoList logo" className="logo-img" />
        <span>TodoList</span>
      </Link>

      <div className="navbar__links">
        {loading ? (
          // Показываем "скелет" при загрузке
          <span className="nav-link muted">Loading...</span>
        ) : user ? (
          <>
            <Link to="/profile" className="nav-link">
              Profile
            </Link>
            <Link to="/tasks" className="nav-link">
              Tasks
            </Link>
            <button
              onClick={handleLogout}
              className="nav-link nav-link--danger"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="nav-link">
              Login
            </Link>
            <Link to="/register" className="nav-link">
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
