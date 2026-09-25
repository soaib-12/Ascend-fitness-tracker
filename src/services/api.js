// src/services/api.js
import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
  withCredentials: true,
});

// Register a new user
export const registerUser = (userData) =>
  API.post("/auth/signup", userData);

// Login existing user
export const loginUser = (credentials) =>
  API.post("/auth/login", credentials);

// Get currently authenticated user
export const fetchCurrentUser = () =>
  API.get("/auth/me");

export const updateProfileWeight = (weight) =>
  API.patch("/auth/me/weight", { weight });

export const logWaterIntake = (amount, date) =>
  API.patch("/auth/me/water", { amount, date });

export const updateUserBmi = (bmi) =>
  API.patch("/auth/me/bmi", { bmi });

export const logoutUser = () =>
  API.post("/auth/logout");

// Goal requests use the login cookie for authentication.
export const fetchGoals = () => API.get("/goals");
export const createGoal = (goal) => API.post("/goals", goal);
export const updateGoal = (id, goal) => API.put(`/goals/${id}`, goal);
export const deleteGoal = (id) => API.delete(`/goals/${id}`);

export const fetchWorkouts = (date) => API.get("/workouts", { params: { date } });
export const createWorkout = (workout) => API.post("/workouts", workout);
export const toggleWorkout = (id, date) => API.patch(`/workouts/${id}/toggle`, { date });

export default API;
