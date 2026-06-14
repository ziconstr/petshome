import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, logoutUser } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  function handleLogout() {
    logoutUser();
    navigate("/");
    setMenuOpen(false);
  }

  return (
    <nav className="bg-white border-b border-stone-200 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2" onClick={() => setMenuOpen(false)}>
          <span className="text-2xl">🐾</span>
          <span style={{ fontFamily: "var(--font-display)" }} className="text-xl font-bold text-emerald-700">
            PetsHome
          </span>
        </Link>

        {/* Desktop menu */}
        <div className="hidden sm:flex items-center gap-4">
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

        {/* Hamburger button */}
        <button
          className="sm:hidden flex flex-col gap-1.5 p-2 rounded-lg hover:bg-stone-100 transition-colors"
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label="Toggle menu"
        >
          <span className={`block w-6 h-0.5 bg-stone-700 transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
          <span className={`block w-6 h-0.5 bg-stone-700 transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`} />
          <span className={`block w-6 h-0.5 bg-stone-700 transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="sm:hidden bg-white border-t border-stone-100 px-4 py-4 flex flex-col gap-3">
          <Link
            to="/"
            onClick={() => setMenuOpen(false)}
            className="text-stone-600 hover:text-emerald-700 font-semibold py-2 transition-colors"
          >
            Browse
          </Link>
          {user ? (
            <>
              <Link
                to="/pet/create"
                onClick={() => setMenuOpen(false)}
                className="bg-emerald-600 text-white px-4 py-2.5 rounded-xl text-sm font-bold hover:bg-emerald-700 transition-colors text-center"
              >
                + Add Pet
              </Link>
              <button
                onClick={handleLogout}
                className="text-red-500 hover:text-red-700 text-sm font-semibold py-2 text-left transition-colors"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/account/login"
                onClick={() => setMenuOpen(false)}
                className="text-stone-600 hover:text-emerald-700 font-semibold py-2 transition-colors"
              >
                Login
              </Link>
              <Link
                to="/account/register"
                onClick={() => setMenuOpen(false)}
                className="bg-emerald-600 text-white px-4 py-2.5 rounded-xl text-sm font-bold hover:bg-emerald-700 transition-colors text-center"
              >
                Register
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
}