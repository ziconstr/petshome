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
    <nav className="bg-white border-b border-sky-100 sticky top-0 z-50 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" onClick={() => setMenuOpen(false)}>
          <img src="/logo.png" alt="PetsHome" className="h-16 w-auto" />
        </Link>

        {/* Desktop */}
        <div className="hidden sm:flex items-center gap-6">
          <Link to="/" className="text-slate-600 hover:text-sky-600 font-medium transition-colors">
            Browse Pets
          </Link>
          {user ? (
            <>
              <Link
                to="/pet/create"
                className="bg-sky-600 text-white px-5 py-2 rounded-full text-sm font-semibold hover:bg-sky-700 transition-colors"
              >
                + Add Pet
              </Link>
              <button
                onClick={handleLogout}
                className="text-slate-500 hover:text-red-500 text-sm font-medium transition-colors"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/account/login" className="text-slate-600 hover:text-sky-600 font-medium transition-colors">
                Login
              </Link>
              <Link
                to="/account/register"
                className="bg-sky-600 text-white px-5 py-2 rounded-full text-sm font-semibold hover:bg-sky-700 transition-colors"
              >
                Register
              </Link>
            </>
          )}
        </div>

        {/* Hamburger */}
        <button
          className="sm:hidden flex flex-col gap-1.5 p-2 rounded-lg hover:bg-sky-50 transition-colors"
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label="Toggle menu"
        >
          <span className={`block w-6 h-0.5 bg-slate-700 transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
          <span className={`block w-6 h-0.5 bg-slate-700 transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`} />
          <span className={`block w-6 h-0.5 bg-slate-700 transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="sm:hidden bg-white border-t border-sky-100 px-4 py-4 flex flex-col gap-3">
          <Link to="/" onClick={() => setMenuOpen(false)} className="text-slate-600 hover:text-sky-600 font-medium py-2">
            Browse Pets
          </Link>
          {user ? (
            <>
              <Link
                to="/pet/create"
                onClick={() => setMenuOpen(false)}
                className="bg-sky-600 text-white px-4 py-2.5 rounded-xl text-sm font-semibold hover:bg-sky-700 text-center"
              >
                + Add Pet
              </Link>
              <button onClick={handleLogout} className="text-red-500 text-sm font-medium py-2 text-left">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/account/login" onClick={() => setMenuOpen(false)} className="text-slate-600 hover:text-sky-600 font-medium py-2">
                Login
              </Link>
              <Link
                to="/account/register"
                onClick={() => setMenuOpen(false)}
                className="bg-sky-600 text-white px-4 py-2.5 rounded-xl text-sm font-semibold hover:bg-sky-700 text-center"
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
