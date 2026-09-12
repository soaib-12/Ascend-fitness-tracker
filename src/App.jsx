
import { useState, useEffect } from "react";
import LandingPage from "./components/LandingPage";
import Auth from "./components/Auth";
import Sidebar from "./Sidebar";
import Header from "./Header";
import Stats from "./Stats";
import QuickActions from "./QuickActions";
import Activity from "./Activity";
import Profile from "./components/Profile";
import Settings from "./components/Settings";


import {
  initialStats,
  weeklyActivity as initialWeeklyActivity,
  currentDay,
  initialActivities,
  initialGoals,
  navLinks,
} from "./data/mockData";
import "./App.css";
import {
  Modal,
  AddWorkoutForm,
  LogWaterForm,
  UpdateWeightForm,
  BMICalculatorForm,
  AddGoalForm,
} from "./Forms";

import { fetchCurrentUser, logoutUser } from "./services/api";
function App() {
  const [currentView, setCurrentView] = useState("landing");
  const [authMode, setAuthMode] = useState("login");
  const [user, setUser] = useState(null);

  const [stats, setStats] = useState(() => {
    try {
      const saved = localStorage.getItem("ascend-stats");
      return saved ? JSON.parse(saved) : initialStats;
    } catch {
      return initialStats;
    }
  });

  const [activities, setActivities] = useState(() => {
    try {
      const saved = localStorage.getItem("ascend-activities");
      return saved ? JSON.parse(saved) : initialActivities;
    } catch {
      return initialActivities;
    }
  });

  const [goals, setGoals] = useState(() => {
    try {
      const saved = localStorage.getItem("ascend-goals");
      return saved ? JSON.parse(saved) : initialGoals;
    } catch {
      return initialGoals;
    }
  });

  const [activePage, setActivePage] = useState("dashboard");
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [activeModal, setActiveModal] = useState(null);

  // Check if the user is already logged in when the page is refreshed
  useEffect(() => {
    fetchCurrentUser()
      .then((response) => {
        setUser(response.data.user);
        setCurrentView("dashboard");
      })
      .catch(() => {
        setUser(null);
        setCurrentView("landing");
      });
  }, []);

  // Save dashboard data locally
  useEffect(() => {
    if (stats) {
      localStorage.setItem("ascend-stats", JSON.stringify(stats));
    }
  }, [stats]);

  useEffect(() => {
    if (activities) {
      localStorage.setItem(
        "ascend-activities",
        JSON.stringify(activities)
      );
    }
  }, [activities]);

  useEffect(() => {
    if (goals) {
      localStorage.setItem("ascend-goals", JSON.stringify(goals));
    }
  }, [goals]);

  function handleNavigate(targetView, mode = "login") {
    setAuthMode(mode);
    setCurrentView(targetView);
  }

  function handleAuthenticated(userData) {
    if (userData) {
      setUser(userData);
    }

    setCurrentView("dashboard");
  }

  async function handleLogout() {
  try {
    await logoutUser();
  } catch (error) {
    console.error("Logout failed:", error);
  } finally {
    setUser(null);
    setCurrentView("landing");
  }
}

  function handleUpdateUser(updatedFields) {
    setUser((prev) => ({ ...prev, ...updatedFields }));
    if (updatedFields.weight) {
      updateStat("weight", Number(updatedFields.weight));
    }
  }

  function updateStat(id, newValue) {
    setStats((prevStats) =>
      prevStats.map((stat) =>
        stat.id === id ? { ...stat, value: newValue } : stat
      )
    );
  }

  function handleToggleActivity(id) {
    setActivities((prev) =>
      prev.map((activity) =>
        activity.id === id
          ? { ...activity, done: !activity.done }
          : activity
      )
    );
  }

  function handleAddWorkout(workoutName) {
    setActivities((prev) => [
      ...prev,
      {
        id: Date.now(),
        name: workoutName,
        icon: "💪",
        done: false,
      },
    ]);

    const workoutsStat = stats?.find((s) => s.id === "workouts");

    if (workoutsStat) {
      updateStat("workouts", workoutsStat.value + 1);
    }

    setActiveModal(null);
  }

  function handleLogWater(amountLiters) {
    const waterStat = stats?.find((s) => s.id === "water");

    if (waterStat) {
      const newTotal =
        Math.round((waterStat.value + amountLiters) * 100) / 100;

      updateStat("water", newTotal);
    }

    setActiveModal(null);
  }

  function handleUpdateWeight(newWeight) {
    updateStat("weight", newWeight);

    setGoals((prev) =>
      prev.map((g) =>
        g.unit === "kg"
          ? { ...g, current: newWeight }
          : g
      )
    );

    setActiveModal(null);
  }

  function handleBMICalculated(bmiValue) {
    updateStat("bmi", bmiValue);
  }

  function handleAddGoal(goalData) {
    const { title, current, target, unit } = goalData;

    const progress =
      target === current
        ? 100
        : Math.min(
            100,
            Math.max(
              0,
              Math.round((current / target) * 100)
            )
          );

    setGoals((prev) => [
      ...prev,
      {
        id: Date.now(),
        title,
        current,
        target,
        unit,
        progress,
      },
    ]);

    setActiveModal(null);
  }

  const weightStat = stats?.find(
    (stat) => stat.id === "weight"
  );

  if (currentView === "landing") {
    return (
      <LandingPage
        onNavigate={(mode) =>
          handleNavigate("auth", mode)
        }
      />
    );
  }

  if (currentView === "auth") {
    return (
      <Auth
        initialMode={authMode}
        onBack={() => setCurrentView("landing")}
        onAuthenticated={handleAuthenticated}
      />
    );
  }

  return (
    <div className="app-layout">
      <Sidebar
        navLinks={navLinks.map((link) => ({
          ...link,
          active: link.id === activePage,
        }))}
        activePage={activePage}
        onNavClick={setActivePage}
        onAddWorkoutClick={() =>
          setActiveModal("workout")
        }
        mobileOpen={mobileNavOpen}
        onClose={() => setMobileNavOpen(false)}
        onLogout={handleLogout}
      />

      <main className="main-content">
        <Header
          userName={user?.name || "User"}
          date={
            user?.date ||
            new Date().toLocaleDateString()
          }
          avatarUrl={user?.avatarUrl || ""}
          onMenuClick={() =>
            setMobileNavOpen(true)
          }
        />

        {activePage === "profile" ? (
          <Profile user={user} />
        ) : activePage === "settings" ? (
          <Settings user={user} onUpdateUser={handleUpdateUser} />
        ) : (
          <>
            <Stats stats={stats || []} />

            <Activity
              weeklyData={initialWeeklyActivity}
              currentDay={currentDay}
              activities={activities || []}
              onToggleActivity={handleToggleActivity}
              goals={goals || []}
              onAddGoalClick={() =>
                setActiveModal("goal")
              }
            />

            <QuickActions
              onLogWater={() =>
                setActiveModal("water")
              }
              onUpdateWeight={() =>
                setActiveModal("weight")
              }
              onCalculateBMI={() =>
                setActiveModal("bmi")
              }
              onAddGoal={() =>
                setActiveModal("goal")
              }
            />
          </>
        )}
      </main>

      {activeModal === "workout" && (
        <Modal
          title="Add Workout"
          onClose={() => setActiveModal(null)}
        >
          <AddWorkoutForm
            onAddWorkout={handleAddWorkout}
          />
        </Modal>
      )}

      {activeModal === "water" && (
        <Modal
          title="Log Water"
          onClose={() => setActiveModal(null)}
        >
          <LogWaterForm
            onLogWater={handleLogWater}
          />
        </Modal>
      )}

      {activeModal === "weight" && (
        <Modal
          title="Update Weight"
          onClose={() => setActiveModal(null)}
        >
          <UpdateWeightForm
            currentWeight={
              weightStat?.value || 70
            }
            onUpdateWeight={handleUpdateWeight}
          />
        </Modal>
      )}

      {activeModal === "bmi" && (
        <Modal
          title="Calculate BMI"
          onClose={() => setActiveModal(null)}
        >
          <BMICalculatorForm
            defaultWeight={
              weightStat?.value || 70
            }
            onCalculated={handleBMICalculated}
          />
        </Modal>
      )}

      {activeModal === "goal" && (
        <Modal
          title="Add Goal"
          onClose={() => setActiveModal(null)}
        >
          <AddGoalForm
            onAddGoal={handleAddGoal}
          />
        </Modal>
      )}
    </div>
  );
}

export default App;

