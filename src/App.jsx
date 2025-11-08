export default function App() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600 text-white">
      <h1 className="text-4xl font-bold mb-4">✅ Tailwind v4 is Working!</h1>
      <p className="text-lg text-gray-100">
        If you see this colorful gradient, Tailwind is configured correctly 🎉
      </p>
      <button className="mt-6 px-6 py-2 bg-white text-blue-600 rounded-lg font-semibold hover:bg-gray-100 transition">
        Test Button
      </button>
    </div>
  );
}
