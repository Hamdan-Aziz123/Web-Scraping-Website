// Base URL for the backend API.
//
// Locally this falls back to the dev backend on port 4000, so nothing
// changes for local development. When deploying (e.g. to Vercel), set
// VITE_API_BASE_URL in the environment to your deployed backend's public
// URL (e.g. https://api.emanplasticrecycling.com) — no code changes needed.
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:4000";
