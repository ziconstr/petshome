import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { getPet, deletePet, Pet } from "../api/pets";
import { useAuth } from "../context/AuthContext";

const FALLBACK = "https://images.unsplash.com/photo-1561037404-61cd46aa615b?w=800&q=80";

export default function PetPage() {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [pet, setPet] = useState<Pet | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (!id) return;
    getPet(id)
      .then(setPet)
      .catch((err: Error) => setError(err.message))
      .finally(() => setLoading(false));
  }, [id]);

  function handleShare() {
    navigator.clipboard.writeText(window.location.href).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  async function handleDelete() {
    if (!pet || !confirm(`Delete ${pet.name}? This cannot be undone.`)) return;
    setDeleting(true);
    try {
      await deletePet(pet.id);
      navigate("/");
    } catch (err) {
      alert((err as Error).message);
      setDeleting(false);
    }
  }

  if (loading) return <div className="text-center py-20 text-slate-400 text-lg">Loading...</div>;
  if (error) return <div className="text-center py-20 text-red-500">{error}</div>;
  if (!pet) return null;

  const isOwner = user && pet.owner?.email === user.email;

  return (
    <main className="max-w-4xl mx-auto px-4 py-10">
      <Link to="/" className="text-sky-600 font-semibold hover:underline mb-6 inline-block">
        ← Back to all pets
      </Link>
      <div className="bg-white rounded-3xl overflow-hidden shadow-sm border border-sky-100">
        <div className="h-72 sm:h-96 overflow-hidden bg-sky-50">
          <img
            src={pet.image?.url || FALLBACK}
            alt={pet.image?.alt || pet.name}
            className="w-full h-full object-cover"
            onError={(e) => { (e.target as HTMLImageElement).src = FALLBACK; }}
          />
        </div>
        <div className="p-6 sm:p-8">
          <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
            <div>
              <h1 style={{ fontFamily: "var(--font-display)" }} className="text-3xl font-bold text-slate-800">
                {pet.name}
              </h1>
              <p className="text-slate-500 mt-1">{pet.species} · {pet.breed}</p>
            </div>
            <div className="flex items-center gap-3">
              <span className={`px-3 py-1.5 rounded-full text-sm font-semibold ${
                pet.adoptionStatus === "Available"
                  ? "bg-sky-100 text-sky-700"
                  : "bg-amber-100 text-amber-700"
              }`}>
                {pet.adoptionStatus}
              </span>
              <button
                onClick={handleShare}
                className="bg-sky-50 hover:bg-sky-100 text-sky-700 px-3 py-1.5 rounded-full text-sm font-semibold transition-colors border border-sky-100"
              >
                {copied ? "✅ Copied!" : "🔗 Share"}
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6">
            {[
              { label: "Age", value: `${pet.age} ${pet.age === 1 ? "year" : "years"}` },
              { label: "Gender", value: pet.gender },
              { label: "Size", value: pet.size },
              { label: "Colour", value: pet.color },
              { label: "Location", value: pet.location },
            ].filter(({ value }) => value).map(({ label, value }) => (
              <div key={label} className="bg-sky-50 rounded-xl px-4 py-3 border border-sky-100">
                <p className="text-xs text-sky-500 font-semibold uppercase tracking-wide">{label}</p>
                <p className="text-slate-700 font-semibold mt-0.5">{value}</p>
              </div>
            ))}
          </div>

          <div className="mb-6">
            <h2 className="font-bold text-slate-700 mb-2">About {pet.name}</h2>
            <p className="text-slate-600 leading-relaxed">{pet.description}</p>
          </div>

          {isOwner && (
            <div className="flex gap-3 border-t border-sky-100 pt-6">
              <Link
                to={`/pet/edit/${pet.id}`}
                className="bg-sky-600 text-white font-semibold px-5 py-2.5 rounded-xl hover:bg-sky-700 transition-colors"
              >
                Edit
              </Link>
              <button
                onClick={handleDelete}
                disabled={deleting}
                className="bg-red-50 text-red-600 font-semibold px-5 py-2.5 rounded-xl hover:bg-red-100 transition-colors disabled:opacity-50"
              >
                {deleting ? "Deleting..." : "Delete"}
              </button>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
