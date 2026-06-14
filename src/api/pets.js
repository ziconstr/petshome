const BASE_URL = "https://v2.api.noroff.dev";

function getHeaders() {
  const token = localStorage.getItem("token");
  const apiKey = localStorage.getItem("apiKey");
  const headers = { "Content-Type": "application/json" };
  if (token) headers["Authorization"] = `Bearer ${token}`;
  if (apiKey) headers["X-Noroff-API-Key"] = apiKey;
  return headers;
}

export async function getPets(search = "") {
  const url = search
    ? `${BASE_URL}/pets?_tag=${encodeURIComponent(search)}&limit=100`
    : `${BASE_URL}/pets?limit=100`;
  const res = await fetch(url, { headers: getHeaders() });
  const json = await res.json();
  if (!res.ok) throw new Error(json.errors?.[0]?.message || "Failed to fetch pets");
  return json.data;
}

export async function getPet(id) {
  const res = await fetch(`${BASE_URL}/pets/${id}`, { headers: getHeaders() });
  const json = await res.json();
  if (!res.ok) throw new Error(json.errors?.[0]?.message || "Failed to fetch pet");
  return json.data;
}

export async function createPet(data) {
  const res = await fetch(`${BASE_URL}/pets`, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify(data),
  });
  const json = await res.json();
  if (!res.ok) throw new Error(json.errors?.[0]?.message || "Failed to create pet");
  return json.data;
}

export async function updatePet(id, data) {
  const res = await fetch(`${BASE_URL}/pets/${id}`, {
    method: "PUT",
    headers: getHeaders(),
    body: JSON.stringify(data),
  });
  const json = await res.json();
  if (!res.ok) throw new Error(json.errors?.[0]?.message || "Failed to update pet");
  return json.data;
}

export async function deletePet(id) {
  const res = await fetch(`${BASE_URL}/pets/${id}`, {
    method: "DELETE",
    headers: getHeaders(),
  });
  if (res.status === 204) return true;
  const json = await res.json();
  throw new Error(json.errors?.[0]?.message || "Failed to delete pet");
}

export async function register(name, email, password) {
  const res = await fetch(`${BASE_URL}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, password }),
  });
  const json = await res.json();
  if (!res.ok) throw new Error(json.errors?.[0]?.message || "Registration failed");
  return json.data;
}

export async function login(email, password) {
  const res = await fetch(`${BASE_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  const json = await res.json();
  if (!res.ok) throw new Error(json.errors?.[0]?.message || "Login failed");
  return json.data;
}

export async function createApiKey(token) {
  const res = await fetch(`${BASE_URL}/auth/create-api-key`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ name: "PetsHome Key" }),
  });
  const json = await res.json();
  if (!res.ok) throw new Error(json.errors?.[0]?.message || "Failed to create API key");
  return json.data;
}
