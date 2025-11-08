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
      <div className="navbar__logo">
        <img src={logo} alt="logo" className="logo-img" />
          <Link to="/" className="navbar__logo">
      </Link>


        <Link to="/">TodoList</Link>
      </div>

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
