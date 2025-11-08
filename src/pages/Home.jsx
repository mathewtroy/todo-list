import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../lib/firebase";

export default function Home() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, setUser);
    return () => unsub();
  }, []);

  return (
    <section className="home">
      <h1 className="home__title">Welcome to Todo List</h1>
      <p className="home__text">Plan, organize, and complete your daily goals.</p>

      {!user && (
        <div className="home__cta">
          <Link to="/login" className="btn">Already have an account</Link>
          <Link to="/register" className="btn btn--purple">Create a new account</Link>
        </div>
      )}
    </section>
  );
}
