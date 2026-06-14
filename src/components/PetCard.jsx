import { Link } from "react-router-dom";

const FALLBACK = "https://images.unsplash.com/photo-1561037404-61cd46aa615b?w=400&q=80";

export default function PetCard({ pet }) {
  return (
    <Link
      to={`/pet/${pet.id}`}
      className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1.5 border border-stone-100 flex flex-col"
    >
      <div className="h-52 overflow-hidden bg-stone-100 relative">
        <img
          src={pet.image?.url || FALLBACK}
          alt={pet.image?.alt || pet.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          onError={(e) => { e.target.src = FALLBACK; }}
        />
        <span
          className={`absolute top-3 right-3 text-xs px-2.5 py-1 rounded-full font-bold shadow ${
            pet.adoptionStatus === "Available"
              ? "bg-emerald-500 text-white"
              : "bg-amber-400 text-white"
          }`}
        >
          {pet.adoptionStatus}
        </span>
      </div>
      <div className="p-4 flex flex-col gap-1 flex-1">
        <h3 className="font-bold text-lg text-stone-800 group-hover:text-emerald-700 transition-colors">
          {pet.name}
        </h3>
        <p className="text-stone-500 text-sm">{pet.species} · {pet.breed}</p>
        <div className="flex items-center gap-2 mt-2 flex-wrap">
          <span className="bg-stone-100 text-stone-600 text-xs px-2 py-1 rounded-full font-semibold">
            {pet.age} {pet.age === 1 ? "yr" : "yrs"}
          </span>
          <span className="bg-stone-100 text-stone-600 text-xs px-2 py-1 rounded-full font-semibold">
            {pet.size}
          </span>
          {pet.color && (
            <span className="bg-stone-100 text-stone-600 text-xs px-2 py-1 rounded-full font-semibold">
              {pet.color}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}