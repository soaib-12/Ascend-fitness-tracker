export const initialUser = {
  name: "Alex",
  date: "Thursday, Oct 26",
  avatarUrl: "https://i.pravatar.cc/100?img=47",
};

export const initialStats = [
  { id: "workouts", label: "Workouts", value: 4, unit: "This week" },
  { id: "calories", label: "Calories", value: 1850, unit: "kcal burned" },
  { id: "weight", label: "Weight", value: 68.5, unit: "kg" },
  { id: "water", label: "Water", value: 1.75, unit: "L today" },
  { id: "bmi", label: "BMI", value: 22.4, unit: "Normal" },
];

export const weeklyActivity = [
  { day: "Mon", minutes: 30 },
  { day: "Tue", minutes: 45 },
  { day: "Wed", minutes: 20 },
  { day: "Thu", minutes: 50 },
  { day: "Fri", minutes: 0 },
  { day: "Sat", minutes: 0 },
  { day: "Sun", minutes: 0 },
];

export const currentDay = "Thu";

export const initialActivities = [
  { id: 1, name: "Morning Run", icon: "run", done: true },
  { id: 2, name: "Stretching", icon: "stretch", done: false },
];

export const initialGoals = [
  { id: 1, title: "Reach 65 kg", current: 68.5, target: 65, unit: "kg", progress: 58 },
];

export const navLinks = [
  { id: "dashboard", label: "Dashboard" },
  { id: "workouts", label: "Workouts" },
  { id: "health", label: "Health" },
  { id: "goals", label: "Goals" },
  { id: "progress", label: "Progress" },
];
