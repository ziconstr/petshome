import { Link } from "react-router-dom";

const FALLBACK = "https://images.unsplash.com/photo-1561037404-61cd46aa615b?w=400&q=80";

export default function PetCard({ pet }) {
  return (
    <Link
      to={`/pet/${pet.id}`}
      className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all hover:-translate-y-1 border border-stone-100 flex flex-col"
    >
      <div className="h-48 overflow-hidden bg-stone-100">
        <img
          src={pet.image?.url || FALLBACK}
          alt={pet.image?.alt || pet.name}
          className="w-full h-full object-cover"
          onError={(e) => { e.target.src = FALLBACK; }}
        />
      </div>
      <div className="p-4 flex flex-col gap-1 flex-1">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-lg text-stone-800">{pet.name}</h3>
          <span
            className={`text-xs px-2 py-1 rounded-full font-semibold ${
              pet.adoptionStatus === "Available"
                ? "bg-emerald-100 text-emerald-700"
                : "bg-amber-100 text-amber-700"
            }`}
          >
            {pet.adoptionStatus}
          </span>
        </div>
        <p className="text-stone-500 text-sm">{pet.species} · {pet.breed}</p>
        <p className="text-stone-400 text-sm">{pet.age} {pet.age === 1 ? "year" : "years"} old · {pet.size}</p>
      </div>
    </Link>
  );
}
