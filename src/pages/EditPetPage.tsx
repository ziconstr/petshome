import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { getPet, updatePet, deletePet, Pet, PetFormData } from "../api/pets";
import { useAuth } from "../context/AuthContext";
import PetForm from "../components/PetForm";

export default function EditPetPage() {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [pet, setPet] = useState<Pet | null>(null);
  const [fetchLoading, setFetchLoading] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (!id) return;
    getPet(id)
      .then(setPet)
      .catch((err: Error) => setError(err.message))
      .finally(() => setFetchLoading(false));
  }, [id]);

  if (!user) {
    return (
      <div className="max-w-md mx-auto px-4 py-20 text-center">
        <p className="text-slate-500 text-lg mb-4">You must be logged in to edit a pet.</p>
        <Link to="/account/login" className="text-sky-600 font-semibold hover:underline">Go to Login</Link>
      </div>
    );
  }

  if (fetchLoading) return <div className="text-center py-20 text-slate-400">Loading...</div>;
  if (error) return <div className="text-center py-20 text-red-500">{error}</div>;

  async function handleSubmit(data: PetFormData) {
    if (!id) return;
    setLoading(true);
    setError("");
    try {
      await updatePet(id, data);
      navigate(`/pet/${id}`);
    } catch (err) {
      setError((err as Error).message);
      setLoading(false);
    }
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

  return (
    <main className="max-w-2xl mx-auto px-4 py-10">
      <Link to={`/pet/${id}`} className="text-sky-600 font-semibold hover:underline mb-6 inline-block">
        ← Back to pet
      </Link>
      <div className="flex items-center justify-between mb-6">
        <h1 style={{ fontFamily: "var(--font-display)" }} className="text-3xl font-bold text-slate-800">
          Edit {pet?.name}
        </h1>
        <button
          onClick={handleDelete}
          disabled={deleting}
          className="text-red-500 font-semibold hover:underline text-sm disabled:opacity-50"
        >
          {deleting ? "Deleting..." : "Delete pet"}
        </button>
      </div>
      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-sky-100">
        <PetForm initialData={pet ?? undefined} onSubmit={handleSubmit} loading={loading} error={error} submitLabel="Save Changes" />
      </div>
    </main>
  );
}
