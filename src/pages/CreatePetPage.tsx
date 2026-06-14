import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createPet, PetFormData } from "../api/pets";
import { useAuth } from "../context/AuthContext";
import PetForm from "../components/PetForm";

export default function CreatePetPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  if (!user) {
    return (
      <div className="max-w-md mx-auto px-4 py-20 text-center">
        <p className="text-slate-500 text-lg mb-4">You must be logged in to add a pet.</p>
        <a href="/account/login" className="text-sky-600 font-semibold hover:underline">Go to Login</a>
      </div>
    );
  }

  async function handleSubmit(data: PetFormData) {
    setLoading(true);
    setError("");
    try {
      const pet = await createPet(data);
      navigate(`/pet/${pet.id}`);
    } catch (err) {
      setError((err as Error).message);
      setLoading(false);
    }
  }

  return (
    <main className="max-w-2xl mx-auto px-4 py-10">
      <h1 style={{ fontFamily: "var(--font-display)" }} className="text-3xl font-bold text-slate-800 mb-6">
        Add a New Pet
      </h1>
      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-sky-100">
        <PetForm onSubmit={handleSubmit} loading={loading} error={error} submitLabel="Add Pet" />
      </div>
    </main>
  );
}
