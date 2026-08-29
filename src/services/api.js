// src/services/api.js
import axios from "axios";

const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "http://localhost:5000/api",
});

// Automatically send JWT token with protected requests
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Post signup data
export const registerUser = (userData) => API.post("/auth/signup", userData);

// Fetch current user profile details for profile page
export const fetchUserProfile = () => API.get("/user/profile");

export default API;