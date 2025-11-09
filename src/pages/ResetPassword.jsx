import { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { confirmPasswordReset, verifyPasswordResetCode } from "firebase/auth";
import { auth } from "../lib/firebase";
import { useNavigate } from "react-router-dom";

export default function ResetPassword() {
  const [searchParams] = useSearchParams();
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [verified, setVerified] = useState(false);
  const navigate = useNavigate();


  const oobCode = searchParams.get("oobCode");

  // Verify reset code when component loads
  useEffect(() => {
    if (!oobCode) {
      setError("Invalid or missing reset link.");
      return;
    }

    verifyPasswordResetCode(auth, oobCode)
      .then(() => setVerified(true))
      .catch(() => setError("This password reset link is invalid or expired."));
  }, [oobCode]);

  const handleReset = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    if (password !== confirm) {
      setError("Passwords do not match");
      return;
    }

    try {
      await confirmPasswordReset(auth, oobCode, password);
      setMessage("✅ Password has been reset successfully!");
      setVerified(false);
      setTimeout(() => navigate("/login"), 1500);
  } catch (err) {
    setError(err.message || "Failed to reset password. Try again.");
  }

  };

  return (
    <section className="auth">
      <h1 className="auth__title">Reset Password</h1>

      {!verified ? (
        error ? (
          <div style={{ color: "var(--red)" }}>{error}</div>
        ) : (
          <p>Verifying reset link...</p>
        )
      ) : (
        <form className="form" onSubmit={handleReset}>
          <div className="form__group">
            <label className="form__label">New Password</label>
            <input
              type="password"
              className="input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="form__group">
            <label className="form__label">Confirm Password</label>
            <input
              type="password"
              className="input"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              required
            />
          </div>

          {error && <div style={{ color: "var(--red)" }}>{error}</div>}
          {message && <div style={{ color: "var(--green)" }}>{message}</div>}

          <button type="submit" className="btn btn--block">
            Reset Password
          </button>
        </form>
      )}

      <p className="auth__hint">
        Back to <Link to="/login" className="link link--accent">Login</Link>
      </p>
    </section>
  );
}
