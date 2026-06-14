import { useEffect, useState } from 'react';
import { getPets, Pet } from '../api/pets';
import PetCard from '../components/PetCard';

const SPECIES_FILTERS = ['All', 'Dog', 'Cat', 'Other'];

export default function HomePage() {
  const [pets, setPets] = useState<Pet[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [species, setSpecies] = useState('All');
  const [filtered, setFiltered] = useState<Pet[]>([]);

  useEffect(() => {
    getPets()
      .then((data) => {
        setPets(data);
        setFiltered(data);
      })
      .catch((err: Error) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    let result = pets;
    if (species !== 'All') {
      if (species === 'Other') {
        result = result.filter(
          (p) => !['dog', 'cat'].includes(p.species?.toLowerCase()),
        );
      } else {
        result = result.filter(
          (p) => p.species?.toLowerCase() === species.toLowerCase(),
        );
      }
    }
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (p) =>
          p.name?.toLowerCase().includes(q) ||
          p.species?.toLowerCase().includes(q) ||
          p.breed?.toLowerCase().includes(q) ||
          p.color?.toLowerCase().includes(q),
      );
    }
    setFiltered(result);
  }, [search, species, pets]);

  const newPets = pets.slice(0, 8);

  return (
    <main>
      {/* Hero */}
      <div className="relative h-[420px] sm:h-[520px] overflow-hidden">
        <img
          src="/src/assets/bg_header.jpg"
          alt="Happy dog together"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-sky-900/60 via-sky-800/40 to-sky-900/70" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          <h1
            style={{ fontFamily: 'var(--font-display)' }}
            className="text-5xl sm:text-7xl font-bold text-white mb-4 drop-shadow-lg"
          >
            Find Your Perfect Companion
          </h1>
          <p className="text-sky-100 text-lg sm:text-xl max-w-xl mb-8 font-semibold">
            Every pet here is waiting for a loving home
          </p>
          <a
            href="#new-pets"
            className="bg-sky-500 hover:bg-sky-400 text-white font-bold px-8 py-3 rounded-full text-lg transition-colors shadow-lg"
          >
            Meet the pets
          </a>
        </div>
      </div>

      {/* New Arrivals Section */}
      <section id="new-pets" className="max-w-6xl mx-auto px-4 py-14">
        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="text-sky-500 font-bold text-sm uppercase tracking-widest mb-1">
              Just arrived
            </p>
            <h2
              style={{ fontFamily: 'var(--font-display)' }}
              className="text-3xl sm:text-4xl font-bold text-slate-800"
            >
              🐣 New Pets
            </h2>
          </div>
          <a
            href="#all-pets"
            className="text-sky-600 font-bold hover:underline text-sm"
          >
            See all →
          </a>
        </div>

        {loading && (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl overflow-hidden border border-sky-100 animate-pulse"
              >
                <div className="h-44 bg-sky-50" />
                <div className="p-3 flex flex-col gap-2">
                  <div className="h-4 bg-sky-50 rounded w-2/3" />
                  <div className="h-3 bg-sky-50 rounded w-1/2" />
                </div>
              </div>
            ))}
          </div>
        )}

        {!loading && !error && (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {newPets.map((pet) => (
              <PetCard key={pet.id} pet={pet} />
            ))}
          </div>
        )}
      </section>

      {/* Divider */}
      <div className="max-w-6xl mx-auto px-4">
        <div className="border-t border-sky-100" />
      </div>

      {/* All Pets Section */}
      <section id="all-pets" className="max-w-6xl mx-auto px-4 py-14">
        <div className="mb-6">
          <p className="text-sky-500 font-bold text-sm uppercase tracking-widest mb-1">
            Ready for adoption
          </p>
          <h2
            style={{ fontFamily: 'var(--font-display)' }}
            className="text-3xl sm:text-4xl font-bold text-slate-800"
          >
            🐾 All Pets
          </h2>
        </div>

        {/* Search + Filter */}
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between mb-8">
          <div className="relative w-full sm:max-w-sm">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
              🔍
            </span>
            <input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name, breed..."
              className="w-full pl-11 pr-4 py-3 rounded-full border border-sky-100 focus:outline-none focus:ring-2 focus:ring-sky-400 bg-white shadow-sm font-semibold"
            />
          </div>
          <div className="flex gap-2 flex-wrap justify-center">
            {SPECIES_FILTERS.map((f) => (
              <button
                key={f}
                onClick={() => setSpecies(f)}
                className={`px-4 py-2 rounded-full text-sm font-bold transition-colors border ${
                  species === f
                    ? 'bg-sky-600 text-white border-sky-600'
                    : 'bg-white text-slate-600 border-sky-100 hover:border-sky-400'
                }`}
              >
                {f === 'All'
                  ? '🐾 All'
                  : f === 'Dog'
                    ? '🐶 Dogs'
                    : f === 'Cat'
                      ? '🐱 Cats'
                      : '🐰 Other'}
              </button>
            ))}
          </div>
        </div>

        {error && <div className="text-center py-20 text-red-500">{error}</div>}

        {!loading && !error && filtered.length === 0 && (
          <div className="text-center py-20">
            <p className="text-5xl mb-4">🔍</p>
            <p className="text-slate-500 text-lg font-semibold">
              No pets match your search.
            </p>
            <button
              onClick={() => {
                setSearch('');
                setSpecies('All');
              }}
              className="mt-4 text-sky-600 font-bold hover:underline"
            >
              Clear filters
            </button>
          </div>
        )}

        {!loading && !error && filtered.length > 0 && (
          <>
            <p className="text-slate-400 text-sm mb-4 font-semibold">
              {filtered.length} pets available
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {filtered.map((pet) => (
                <PetCard key={pet.id} pet={pet} />
              ))}
            </div>
          </>
        )}
      </section>

      {/* Footer */}
      <footer className="bg-sky-900 text-white mt-8 py-10 px-4">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <img
            src="/logo.png"
            alt="PetsHome"
            className="h-12 w-auto brightness-0 invert"
          />
          <p className="text-sky-200 text-sm text-center font-semibold">
            Every pet deserves a loving home 🏡 Helping animals find families
            since 2026.
          </p>
          <p className="text-sky-400 text-xs font-bold">© 2026 PetsHome</p>
        </div>
      </footer>
    </main>
  );
}
