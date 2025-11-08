import { Link } from "react-router-dom";

export default function Home() {
  return (
    <section className="text-center py-20">
      <h1 className="text-4xl font-bold mb-4">Welcome to Todo List</h1>
      <p className="text-gray-600 mb-8">Plan, organize, and complete your daily goals.</p>

      <div className="flex justify-center gap-4">
        <Link to="/login" className="btn">Login</Link>
        <Link to="/register" className="btn" style={{ background: "var(--purple)" }}>
          Register
        </Link>
      </div>
    </section>
  );
}
