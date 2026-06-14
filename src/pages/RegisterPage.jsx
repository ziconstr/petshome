import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { register, login, createApiKey } from "../api/pets";
import { useAuth } from "../context/AuthContext";

export default function RegisterPage() {
  const { loginUser } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await register(name, email, password);
      // Auto-login after register
      const data = await login(email, password);
      const token = data.accessToken;
      const keyData = await createApiKey(token);
      loginUser(data, token, keyData.key);
      navigate("/");
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  }

  const inputClass =
    "w-full border border-stone-200 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-emerald-400 text-stone-800 bg-white";

  return (
    <main className="min-h-screen flex items-center justify-center px-4 py-10 bg-stone-50">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <span className="text-4xl">🐾</span>
          <h1 style={{ fontFamily: "var(--font-display)" }} className="text-3xl font-bold text-stone-800 mt-2">
            Create Account
          </h1>
          <p className="text-stone-500 mt-1">Register to manage pet listings</p>
        </div>
        <div className="bg-white rounded-3xl p-8 shadow-sm border border-stone-100">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl px-4 py-3 text-sm mb-4">{error}</div>
          )}
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <label className="block text-sm font-semibold text-stone-600 mb-1">Username</label>
              <input
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={inputClass}
                placeholder="my_username"
              />
              <p className="text-xs text-stone-400 mt-1">Only letters, numbers, and underscores</p>
            </div>
            <div>
              <label className="block text-sm font-semibold text-stone-600 mb-1">Email</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={inputClass}
                placeholder="you@stud.noroff.no"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-stone-600 mb-1">Password</label>
              <input
                type="password"
                required
                minLength={8}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={inputClass}
                placeholder="Min 8 characters"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="bg-emerald-600 text-white font-bold py-3 rounded-xl hover:bg-emerald-700 transition-colors disabled:opacity-50 mt-2"
            >
              {loading ? "Creating account..." : "Register"}
            </button>
          </form>
          <p className="text-center text-stone-500 text-sm mt-4">
            Already have an account?{" "}
            <Link to="/account/login" className="text-emerald-600 font-bold hover:underline">
              Login
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
