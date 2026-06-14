import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, logoutUser } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logoutUser();
    navigate("/");
  }

  return (
    <nav className="bg-white border-b border-stone-200 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <span className="text-2xl">🐾</span>
          <span style={{ fontFamily: "var(--font-display)" }} className="text-xl font-bold text-emerald-700">
            PetsHome
          </span>
        </Link>
        <div className="flex items-center gap-4">
          <Link to="/" className="text-stone-600 hover:text-emerald-700 font-semibold transition-colors">
            Browse
          </Link>
          {user ? (
            <>
              <Link
                to="/pet/create"
                className="bg-emerald-600 text-white px-4 py-2 rounded-full text-sm font-bold hover:bg-emerald-700 transition-colors"
              >
                + Add Pet
              </Link>
              <button
                onClick={handleLogout}
                className="text-stone-500 hover:text-red-600 text-sm font-semibold transition-colors"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/account/login" className="text-stone-600 hover:text-emerald-700 font-semibold transition-colors">
                Login
              </Link>
              <Link
                to="/account/register"
                className="bg-emerald-600 text-white px-4 py-2 rounded-full text-sm font-bold hover:bg-emerald-700 transition-colors"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
