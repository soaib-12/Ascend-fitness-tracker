// ==============================================================
// mockData.js
// --------------------------------------------------------------
// This file simulates a backend database using plain JavaScript
// objects and arrays. In a real app, this data would come from
// an API call (fetch/axios). Since this lab project has NO
// backend, we just import these constants directly into our
// components and manage changes to them using React state.
// ==============================================================

// The logged-in user's profile info (shown in the top-right corner)
export const initialUser = {
  name: "Alex",
  date: "Thursday, Oct 26",
  avatarUrl: "https://i.pravatar.cc/100?img=47",
};

// The 5 summary stat cards shown under the header
export const initialStats = [
  { id: "workouts", label: "Workouts", value: 4, unit: "This week", icon: "🏋️" },
  { id: "calories", label: "Calories", value: 1850, unit: "kcal burned", icon: "🔥" },
  { id: "weight", label: "Weight", value: 68.5, unit: "kg", icon: "⚖️" },
  { id: "water", label: "Water", value: 1.75, unit: "L today", icon: "💧" },
  { id: "bmi", label: "BMI", value: 22.4, unit: "Normal", icon: "📈" },
];

// Data for the "Weekly Workout Activity" bar chart.
// `minutes` drives the height of each bar.
export const weeklyActivity = [
  { day: "Mon", minutes: 30 },
  { day: "Tue", minutes: 45 },
  { day: "Wed", minutes: 20 },
  { day: "Thu", minutes: 50 }, // Today - highlighted in the UI
  { day: "Fri", minutes: 0 },
  { day: "Sat", minutes: 0 },
  { day: "Sun", minutes: 0 },
];

// The current day, used to highlight the correct column in the chart
export const currentDay = "Thu";

// Today's checklist of activities, with a "done" boolean that the
// user can toggle by clicking on the item.
export const initialActivities = [
  { id: 1, name: "Morning Run", icon: "🏃", done: true },
  { id: 2, name: "Stretching", icon: "🧘", done: false },
];

// The list of active fitness goals with a progress percentage
export const initialGoals = [
  { id: 1, title: "Reach 65 kg", current: 68.5, target: 65, unit: "kg", progress: 58 },
];

// Sidebar navigation links. `active` marks which page is selected.
export const navLinks = [
  { id: "dashboard", label: "Dashboard", icon: "🏠", active: true },
  { id: "workouts", label: "Workouts", icon: "🏋️", active: false },
  { id: "health", label: "Health", icon: "❤️", active: false },
  { id: "goals", label: "Goals", icon: "🏆", active: false },
  { id: "progress", label: "Progress", icon: "📈", active: false },
];
