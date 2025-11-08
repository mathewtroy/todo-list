import { Link } from "react-router-dom";

export default function Register() {
  return (
    <section className="flex flex-col items-center justify-center py-20">
      <h1 className="text-3xl font-bold mb-6">Register</h1>
      <form className="w-full max-w-sm flex flex-col gap-4 bg-white p-6 rounded-md shadow-sm">
        <input
          type="email"
          placeholder="Email"
          className="border border-gray-300 rounded-md p-2"
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="border border-gray-300 rounded-md p-2"
          required
        />
        <button type="submit" className="btn w-full" style={{ background: "var(--purple)" }}>
          Create Account
        </button>
      </form>

      <p className="mt-4 text-sm text-gray-600">
        Already have an account?{" "}
        <Link to="/login" className="text-[var(--green)] hover:underline">
          Login
        </Link>
      </p>
    </section>
  );
}
