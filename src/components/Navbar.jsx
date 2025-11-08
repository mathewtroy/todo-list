import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../lib/firebase";

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
    <nav className="flex items-center justify-between px-6 py-3 bg-white shadow-sm sticky top-0 z-10">
      <Link to="/" className="text-lg font-semibold">📝 Todo</Link>

      <div className="flex gap-4">
        {!user ? (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        ) : (
          <>
            <Link to="/tasks">Tasks</Link>
            <button onClick={logout} className="text-[var(--red)]">Logout</button>
          </>
        )}
      </div>
    </nav>
  );
}
