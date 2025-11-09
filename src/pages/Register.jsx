import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../services/authService";
import PasswordField from "../components/PasswordField";

export default function Register() {
  const [name, setName] = useState("");
  const [dob, setDob] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [pw2, setPw2] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (pw !== pw2) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);
    try {
      await registerUser({ name, email, password: pw, dob, phone });
      navigate("/tasks");
    } catch (err) {
      if (err.message.includes("already registered")) {
        setError("This email is already in use.");
      } else {
        setError(err.message || "Registration failed");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="auth">
      <h1 className="auth__title">Register</h1>

      <form className="form" onSubmit={onSubmit}>
        <div className="form__group">
          <label htmlFor="name" className="form__label">Name</label>
          <input
            id="name"
            type="text"
            className="input"
            placeholder="Your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

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

        <div className="form__group">
          <label htmlFor="dob" className="form__label">Date of Birth</label>
          <input
            id="dob"
            type="date"
            className="input"
            value={dob}
            onChange={(e) => setDob(e.target.value)}
          />
        </div>

        <div className="form__group">
          <label htmlFor="phone" className="form__label">Phone</label>
          <input
            id="phone"
            type="tel"
            className="input"
            placeholder="+420 ..."
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>

        <PasswordField
          id="password"
          label="Password"
          value={pw}
          onChange={(e) => setPw(e.target.value)}
        />

        <PasswordField
          id="password2"
          label="Confirm Password"
          value={pw2}
          onChange={(e) => setPw2(e.target.value)}
        />

        {error && <div style={{ color: "var(--red)", fontSize: ".9rem" }}>{error}</div>}

        <button type="submit" className="btn btn--purple btn--block" disabled={loading}>
          {loading ? "Creating..." : "Create Account"}
        </button>
      </form>

      <p className="auth__hint">
        Already have an account?{" "}
        <Link to="/login" className="link link--accent">Login</Link>
      </p>
    </section>
  );
}
