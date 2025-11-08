import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <section className="flex flex-col items-center justify-center text-center py-20">
      <h1 className="text-6xl font-bold text-[var(--red)] mb-4">404</h1>
      <p className="text-gray-600 mb-6">The page you’re looking for doesn’t exist.</p>
      <Link to="/" className="btn">Back to Home</Link>
    </section>
  );
}
