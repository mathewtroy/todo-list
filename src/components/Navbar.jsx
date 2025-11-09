import { Link } from "react-router-dom";
import { auth } from "../lib/firebase";
import { useEffect, useState } from "react";
import { logoutUser } from "../services/authService"; 
import logo from "../assets/todo-list-ico.svg";


export default function Navbar() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((u) => setUser(u));
    return () => unsubscribe();
  }, []);

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
        {user ? (
          <>
            <Link to="/profile" className="nav-link">
              Profile
            </Link>
            <Link to="/tasks" className="nav-link">
              Tasks
            </Link>
            <button onClick={handleLogout} className="nav-link nav-link--danger">
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
