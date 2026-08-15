import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import Stats from "./Stats";










import Activity from "./Activity";
import {
  initialUser,
  initialStats,
  weeklyActivity as initialWeeklyActivity,
  currentDay,
  initialActivities,
  initialGoals,
  navLinks,
} from "./data/mockData";
import "./App.css";
import { Modal, AddWorkoutForm, AddGoalForm } from "./Forms";

// ==============================================================
// App Component (the ROOT of the whole application)
// --------------------------------------------------------------
// This is a "Software Development lab" style demo: there is NO
// backend server. Every piece of data lives in React state and,
// where useful, is mirrored into the browser's localStorage so it
// survives a page refresh.
//
// STATE OWNED HERE:
//   - user            : profile shown in the header
//   - stats           : the 5 top summary cards (workouts, calories...)
//   - activities      : today's checklist (Morning Run, Stretching...)
//   - goals           : active goal progress bars
//   - activeModal     : which popup (if any) is currently open
//   - activePage      : which sidebar link is selected
//
// All child components are "presentational" - they receive data
// and callback functions as props, and call those callbacks when
// the user interacts with them. This pattern is called
// "lifting state up": the single source of truth lives in App.jsx.
// ==============================================================
function App() {
  // ---- Try to load previously saved data from localStorage,
  // otherwise fall back to the mock data defined in mockData.js ----
  const loadState = (key, fallback) => {
    try {
      const saved = localStorage.getItem(key);
      return saved ? JSON.parse(saved) : fallback;
    } catch {
      return fallback;
    }
  };

  const [user] = useState(initialUser);
  const [stats, setStats] = useState(() => loadState("ascend-stats", initialStats));
  const [activities, setActivities] = useState(() =>
    loadState("ascend-activities", initialActivities)
  );
  const [goals, setGoals] = useState(() => loadState("ascend-goals", initialGoals));
  const [activePage, setActivePage] = useState("dashboard");
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [activeModal, setActiveModal] = useState(null); // null | "workout" | "water" | "weight" | "bmi" | "goal"

  // ---- Persist state to localStorage any time it changes ----
  // This is what lets the dashboard "remember" your data after a refresh.
  useEffect(() => {
    localStorage.setItem("ascend-stats", JSON.stringify(stats));
  }, [stats]);

  useEffect(() => {
    localStorage.setItem("ascend-activities", JSON.stringify(activities));
  }, [activities]);

  useEffect(() => {
    localStorage.setItem("ascend-goals", JSON.stringify(goals));
  }, [goals]);

  // ---- Helper: update a single stat card's value by its id ----
  function updateStat(id, newValue) {
    setStats((prevStats) =>
      prevStats.map((stat) => (stat.id === id ? { ...stat, value: newValue } : stat))
    );
  }

  // ---- Handlers passed down to children ----

  // Toggle an activity's "done" state when clicked in TodaysActivity
  function handleToggleActivity(id) {
    setActivities((prev) =>
      prev.map((activity) =>
        activity.id === id ? { ...activity, done: !activity.done } : activity
      )
    );
  }

  // Add a brand-new workout: adds to the checklist, bumps the
  // "Workouts" stat count by 1, and closes the modal.
  function handleAddWorkout(workoutName) {
    setActivities((prev) => [
      ...prev,
      { id: Date.now(), name: workoutName, icon: "💪", done: false },
    ]);
    const workoutsStat = stats.find((s) => s.id === "workouts");
    updateStat("workouts", workoutsStat.value + 1);
    setActiveModal(null);
  }
  // Add a new goal card, calculating its initial progress %
  function handleAddGoal(goalData) {
    const { title, current, target, unit } = goalData;
    // Simple progress formula: how far current is from a "start" point
    // toward the target (clamped between 0 and 100).
    const progress =
      target === current
        ? 100
        : Math.min(100, Math.max(0, Math.round((current / target) * 100)));

    setGoals((prev) => [
      ...prev,
      { id: Date.now(), title, current, target, unit, progress },
    ]);
    setActiveModal(null);
  }

  

  return (
    <div className="app-layout">
      {/* --- Left navigation --- */}
      <Sidebar
        navLinks={navLinks.map((link) => ({ ...link, active: link.id === activePage }))}
        activePage={activePage}
        onNavClick={setActivePage}
        onAddWorkoutClick={() => setActiveModal("workout")}
        mobileOpen={mobileNavOpen}
        onClose={() => setMobileNavOpen(false)}
      />

      {/* --- Main dashboard content --- */}
      <main className="main-content">
        <Header userName={user.name} date={user.date} avatarUrl={user.avatarUrl} onMenuClick={() => setMobileNavOpen(true)} />

        <Stats stats={stats} />

        {/* Chart + right-hand column sit side by side */}
        <Activity
          weeklyData={initialWeeklyActivity}
          currentDay={currentDay}
          activities={activities}
          onToggleActivity={handleToggleActivity}
          goals={goals}
          onAddGoalClick={() => setActiveModal("goal")}
        />

        
      </main>

      {/* --- Modals: only one can be open at a time, controlled by activeModal --- */}
      {activeModal === "workout" && (
        <Modal title="Add Workout" onClose={() => setActiveModal(null)}>
          <AddWorkoutForm onAddWorkout={handleAddWorkout} />
        </Modal>
      )}

      
      {activeModal === "goal" && (
        <Modal title="Add Goal" onClose={() => setActiveModal(null)}>
          <AddGoalForm onAddGoal={handleAddGoal} />
        </Modal>
      )}
    </div>
  );
}

export default App;
