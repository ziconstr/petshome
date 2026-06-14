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

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await register(name, email, password);
      const data = await login(email, password);
      const token = data.accessToken;
      const keyData = await createApiKey(token);
      loginUser(data, token, keyData.key);
      navigate("/");
    } catch (err) {
      setError((err as Error).message);
      setLoading(false);
    }
  }

  const inputClass = "w-full border border-sky-100 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-sky-400 text-slate-800 bg-white";

  return (
    <main className="min-h-screen flex items-center justify-center px-4 py-10 bg-gradient-to-br from-sky-50 to-white">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <img src="/logo.png" alt="PetsHome" className="h-20 w-auto mx-auto mb-4" />
          <h1 style={{ fontFamily: "var(--font-display)" }} className="text-3xl font-bold text-slate-800">
            Create Account
          </h1>
          <p className="text-slate-500 mt-1">Register to manage pet listings</p>
        </div>
        <div className="bg-white rounded-3xl p-8 shadow-sm border border-sky-100">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl px-4 py-3 text-sm mb-4">{error}</div>
          )}
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <label className="block text-sm font-semibold text-slate-600 mb-1">Username</label>
              <input required value={name} onChange={(e) => setName(e.target.value)} className={inputClass} placeholder="my_username" />
              <p className="text-xs text-slate-400 mt-1">Only letters, numbers, and underscores</p>
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-600 mb-1">Email</label>
              <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className={inputClass} placeholder="you@stud.noroff.no" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-600 mb-1">Password</label>
              <input type="password" required minLength={8} value={password} onChange={(e) => setPassword(e.target.value)} className={inputClass} placeholder="Min 8 characters" />
            </div>
            <button type="submit" disabled={loading} className="bg-sky-600 text-white font-semibold py-3 rounded-xl hover:bg-sky-700 transition-colors disabled:opacity-50 mt-2">
              {loading ? "Creating account..." : "Register"}
            </button>
          </form>
          <p className="text-center text-slate-500 text-sm mt-4">
            Already have an account?{" "}
            <Link to="/account/login" className="text-sky-600 font-semibold hover:underline">Login</Link>
          </p>
        </div>
      </div>
    </main>
  );
}
