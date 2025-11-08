import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../services/authService";
import PasswordField from "../components/PasswordField";

export default function Login() {
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await loginUser(email, pw);
      navigate("/tasks");
    } catch (err) {
      setError(err.message || "Login failed");
    }
  };

  return (
    <section className="auth">
      <h1 className="auth__title">Login</h1>

      <form className="form" onSubmit={onSubmit}>
        <div className="form__group">
          <label htmlFor="email" className="form__label">Email</label>
          <input
            id="email"
            type="email"
            className="input"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <PasswordField
          id="password"
          label="Password"
          value={pw}
          onChange={(e) => setPw(e.target.value)}
        />

        {error && <div style={{ color: "var(--red)", fontSize: ".9rem" }}>{error}</div>}

        <button type="submit" className="btn btn--block">Login</button>
      </form>

      <p className="auth__hint">
        Don’t have an account?{" "}
        <Link to="/register" className="link link--accent">Register</Link>
      </p>
    </section>
  );
}
