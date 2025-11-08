import { Link } from "react-router-dom";

export default function Login() {
  return (
    <section className="flex flex-col items-center justify-center py-20">
      <h1 className="text-3xl font-bold mb-6">Login</h1>
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
        <button type="submit" className="btn w-full">Login</button>
      </form>

      <p className="mt-4 text-sm text-gray-600">
        Don’t have an account?{" "}
        <Link to="/register" className="text-[var(--green)] hover:underline">
          Register
        </Link>
      </p>
    </section>
  );
}
