import { useState } from "react";

const SIZES = ["Small", "Medium", "Large", "Extra Large"];
const STATUSES = ["Available", "Pending", "Adopted"];
const GENDERS = ["Male", "Female", "Unknown"];

export default function PetForm({ initialData = {}, onSubmit, loading, error, submitLabel = "Save" }) {
  const [form, setForm] = useState({
    name: initialData.name || "",
    species: initialData.species || "",
    breed: initialData.breed || "",
    age: initialData.age || "",
    gender: initialData.gender || "Unknown",
    size: initialData.size || "Medium",
    color: initialData.color || "",
    description: initialData.description || "",
    adoptionStatus: initialData.adoptionStatus || "Available",
    location: initialData.location || "",
    imageUrl: initialData.image?.url || "",
    imageAlt: initialData.image?.alt || "",
  });

  function handleChange(e) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    const data = {
      name: form.name,
      species: form.species,
      breed: form.breed,
      age: Number(form.age),
      gender: form.gender,
      size: form.size,
      color: form.color,
      description: form.description,
      adoptionStatus: form.adoptionStatus,
      location: form.location,
    };
    if (form.imageUrl) {
      data.image = { url: form.imageUrl, alt: form.imageAlt || form.name };
    }
    onSubmit(data);
  }

  const inputClass =
    "w-full border border-stone-200 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-emerald-400 text-stone-800 bg-white";
  const labelClass = "block text-sm font-semibold text-stone-600 mb-1";

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl px-4 py-3 text-sm">{error}</div>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className={labelClass}>Name *</label>
          <input required name="name" value={form.name} onChange={handleChange} className={inputClass} placeholder="Buddy" />
        </div>
        <div>
          <label className={labelClass}>Species *</label>
          <input required name="species" value={form.species} onChange={handleChange} className={inputClass} placeholder="Dog" />
        </div>
        <div>
          <label className={labelClass}>Breed *</label>
          <input required name="breed" value={form.breed} onChange={handleChange} className={inputClass} placeholder="Labrador" />
        </div>
        <div>
          <label className={labelClass}>Age (years) *</label>
          <input required type="number" min="0" name="age" value={form.age} onChange={handleChange} className={inputClass} placeholder="3" />
        </div>
        <div>
          <label className={labelClass}>Gender</label>
          <select name="gender" value={form.gender} onChange={handleChange} className={inputClass}>
            {GENDERS.map((g) => <option key={g}>{g}</option>)}
          </select>
        </div>
        <div>
          <label className={labelClass}>Size</label>
          <select name="size" value={form.size} onChange={handleChange} className={inputClass}>
            {SIZES.map((s) => <option key={s}>{s}</option>)}
          </select>
        </div>
        <div>
          <label className={labelClass}>Colour</label>
          <input name="color" value={form.color} onChange={handleChange} className={inputClass} placeholder="Golden" />
        </div>
        <div>
          <label className={labelClass}>Location</label>
          <input name="location" value={form.location} onChange={handleChange} className={inputClass} placeholder="Oslo" />
        </div>
        <div>
          <label className={labelClass}>Adoption Status</label>
          <select name="adoptionStatus" value={form.adoptionStatus} onChange={handleChange} className={inputClass}>
            {STATUSES.map((s) => <option key={s}>{s}</option>)}
          </select>
        </div>
        <div>
          <label className={labelClass}>Image URL</label>
          <input name="imageUrl" value={form.imageUrl} onChange={handleChange} className={inputClass} placeholder="https://..." />
        </div>
        <div className="sm:col-span-2">
          <label className={labelClass}>Image Alt Text</label>
          <input name="imageAlt" value={form.imageAlt} onChange={handleChange} className={inputClass} placeholder="Photo of Buddy" />
        </div>
      </div>
      <div>
        <label className={labelClass}>Description *</label>
        <textarea
          required
          name="description"
          value={form.description}
          onChange={handleChange}
          rows={4}
          className={inputClass}
          placeholder="Tell us about this pet..."
        />
      </div>
      <button
        type="submit"
        disabled={loading}
        className="bg-emerald-600 text-white font-bold py-3 rounded-xl hover:bg-emerald-700 transition-colors disabled:opacity-50"
      >
        {loading ? "Saving..." : submitLabel}
      </button>
    </form>
  );
}
