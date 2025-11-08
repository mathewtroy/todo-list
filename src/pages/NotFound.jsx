import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <section className="notfound">
      <h1 className="notfound__code">404</h1>
      <p className="notfound__text">The page you’re looking for doesn’t exist.</p>
      <Link to="/" className="btn">Back to Home</Link>
    </section>
  );
}
