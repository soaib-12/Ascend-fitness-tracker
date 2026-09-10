// src/services/api.js
import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
withCredentials: true,
});

// Automatically send JWT token with protected requests

// Register a new user
export const registerUser = (userData) =>
  API.post("/auth/signup", userData);

// Login existing user
export const loginUser = (credentials) =>
  API.post("/auth/login", credentials);

// Get currently authenticated user
export const fetchCurrentUser = () =>
  API.get("/auth/me");

export default API;