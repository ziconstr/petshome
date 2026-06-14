import { Link } from "react-router-dom";
import { Pet } from "../api/pets";

const FALLBACK = "https://images.unsplash.com/photo-1561037404-61cd46aa615b?w=400&q=80";

interface PetCardProps {
  pet: Pet;
}

export default function PetCard({ pet }: PetCardProps) {
  return (
    <Link
      to={`/pet/${pet.id}`}
      className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border border-sky-100 flex flex-col"
    >
      <div className="h-52 overflow-hidden bg-sky-50 relative">
        <img
          src={pet.image?.url || FALLBACK}
          alt={pet.image?.alt || pet.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          onError={(e) => { (e.target as HTMLImageElement).src = FALLBACK; }}
        />
        <span className={`absolute top-3 right-3 text-xs px-2.5 py-1 rounded-full font-semibold shadow-sm ${
          pet.adoptionStatus === "Available"
            ? "bg-sky-500 text-white"
            : "bg-amber-400 text-white"
        }`}>
          {pet.adoptionStatus}
        </span>
      </div>
      <div className="p-4 flex flex-col gap-1 flex-1">
        <h3 className="font-bold text-lg text-slate-800 group-hover:text-sky-600 transition-colors">
          {pet.name}
        </h3>
        <p className="text-slate-500 text-sm">{pet.species} · {pet.breed}</p>
        <div className="flex items-center gap-2 mt-2 flex-wrap">
          <span className="bg-sky-50 text-sky-700 text-xs px-2 py-1 rounded-full font-medium border border-sky-100">
            {pet.age} {pet.age === 1 ? "yr" : "yrs"}
          </span>
          <span className="bg-sky-50 text-sky-700 text-xs px-2 py-1 rounded-full font-medium border border-sky-100">
            {pet.size}
          </span>
          {pet.color && (
            <span className="bg-sky-50 text-sky-700 text-xs px-2 py-1 rounded-full font-medium border border-sky-100">
              {pet.color}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
