import { useEffect, useState } from "react";
import { getPets } from "../api/pets";
import PetCard from "../components/PetCard";

export default function HomePage() {
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [filtered, setFiltered] = useState([]);

  useEffect(() => {
    getPets()
      .then((data) => {
        setPets(data);
        setFiltered(data);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (!search.trim()) {
      setFiltered(pets);
    } else {
      const q = search.toLowerCase();
      setFiltered(
        pets.filter(
          (p) =>
            p.name?.toLowerCase().includes(q) ||
            p.species?.toLowerCase().includes(q) ||
            p.breed?.toLowerCase().includes(q) ||
            p.color?.toLowerCase().includes(q)
        )
      );
    }
  }, [search, pets]);

  return (
    <main className="max-w-6xl mx-auto px-4 py-10">
      {/* Hero */}
      <div className="text-center mb-10">
        <h1
          style={{ fontFamily: "var(--font-display)" }}
          className="text-4xl sm:text-5xl font-bold text-stone-800 mb-3"
        >
          Find Your Perfect Companion
        </h1>
        <p className="text-stone-500 text-lg max-w-xl mx-auto">
          Every pet here is waiting for a loving home. Browse, fall in love, and start a new chapter together.
        </p>
      </div>

      {/* Search */}
      <div className="flex justify-center mb-8">
        <div className="relative w-full max-w-md">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400 text-lg">🔍</span>
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name, breed, species..."
            className="w-full pl-11 pr-4 py-3 rounded-full border border-stone-200 focus:outline-none focus:ring-2 focus:ring-emerald-400 bg-white shadow-sm"
          />
        </div>
      </div>

      {/* States */}
      {loading && (
        <div className="text-center py-20 text-stone-400 text-lg">Loading pets...</div>
      )}
      {error && (
        <div className="text-center py-20 text-red-500">{error}</div>
      )}
      {!loading && !error && filtered.length === 0 && (
        <div className="text-center py-20 text-stone-400">
          {search ? "No pets match your search." : "No pets listed yet."}
        </div>
      )}

      {/* Grid */}
      {!loading && !error && filtered.length > 0 && (
        <>
          <p className="text-stone-400 text-sm mb-4">{filtered.length} pets available</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {filtered.map((pet) => (
              <PetCard key={pet.id} pet={pet} />
            ))}
          </div>
        </>
      )}
    </main>
  );
}
