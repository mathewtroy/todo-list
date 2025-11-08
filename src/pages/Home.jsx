import { Link } from "react-router-dom";

export default function Home() {
  return (
    <section className="home">
      <h1 className="home__title">Welcome to Todo List</h1>
      <p className="home__text">Plan, organize, and complete your daily goals.</p>

      <div className="home__cta">
        <Link to="/login" className="btn">Already have an account</Link>
        <Link to="/register" className="btn btn--purple">Create a new account</Link>
      </div>
    </section>
  );
}
