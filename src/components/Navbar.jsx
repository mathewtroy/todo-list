import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../lib/firebase";
import logo from "../assets/todo-list-ico.svg";

export default function Navbar() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, setUser);
    return () => unsub();
  }, []);

  const logout = async () => {
    await signOut(auth);
  };

  return (
    <nav className="navbar">
      <Link to="/" className="navbar__logo">
        <img src={logo} alt="Todo" className="logo-img" />
        <span>Todo</span>
      </Link>

      <div className="navbar__links">
        {!user ? (
          <>
            <Link to="/login" className="nav-link">Login</Link>
            <Link to="/register" className="nav-link">Register</Link>
          </>
        ) : (
          <>
            <Link to="/tasks" className="nav-link">Tasks</Link>
            <button onClick={logout} className="nav-link nav-link--danger">Logout</button>
          </>
        )}
      </div>
    </nav>
  );
}
