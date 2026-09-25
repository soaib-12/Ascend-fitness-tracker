import { useState, useEffect } from "react";
import LandingPage from "./components/LandingPage";
import Auth from "./components/Auth";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import Stats from "./components/Stats";
import QuickActions from "./components/QuickActions";
import Activity from "./components/Activity";
import Profile from "./components/Profile";
import Settings from "./components/Settings";
import Goals from "./components/Goals";

import {
  initialStats,
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
} from "./components/Forms";

import {
  fetchCurrentUser,
  logoutUser,
  fetchGoals,
  createGoal,
  updateGoal,
  deleteGoal,
  updateProfileWeight,
  logWaterIntake,
  updateUserBmi,
  fetchWorkouts,
  createWorkout,
  toggleWorkout,
} from "./services/api";

function getLocalDate(date = new Date()) {
  const today = date;
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  return `${today.getFullYear()}-${month}-${day}`;
}

function getWeeklyActivity(workouts) {
  const today = new Date();
  const monday = new Date(today);
  monday.setHours(0, 0, 0, 0);
  monday.setDate(monday.getDate() - ((monday.getDay() + 6) % 7));

  const week = [];

  for (let i = 0; i < 7; i += 1) {
    const date = new Date(monday);
    date.setDate(monday.getDate() + i);

    week.push({
      date: getLocalDate(date),
      day: date.toLocaleDateString("en-US", { weekday: "short" }),
      minutes: 0,
    });
  }

  workouts.forEach((workout) => {
    const completionDates = workout.completionHistory?.length
      ? workout.completionHistory
      : workout.done && workout.completedAt
        ? [getLocalDate(new Date(workout.completedAt))]
        : [];

    completionDates.forEach((completedDay) => {
      const dayInWeek = week.find((day) => day.date === completedDay);
      if (dayInWeek) dayInWeek.minutes += workout.durationMinutes || 0;
    });
  });

  return week;
}

function App() {
  const [currentView, setCurrentView] = useState("landing");
  const [authMode, setAuthMode] = useState("login");
  const [user, setUser] = useState(null);

  const [stats, setStats] = useState(initialStats);
  const [activities, setActivities] = useState([]);
  const [todayDate, setTodayDate] = useState(() => getLocalDate());

  const [goals, setGoals] = useState([]);

  const [activePage, setActivePage] = useState("dashboard");
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [activeModal, setActiveModal] = useState(null);
  const [editingGoal, setEditingGoal] = useState(null);

  // Valid pages inside the dashboard
  const DASHBOARD_PAGES = ["dashboard", "workouts", "health", "goals", "progress", "profile", "settings"];

  useEffect(() => {
    const timer = window.setInterval(() => {
      const date = getLocalDate();
      setTodayDate((current) => current === date ? current : date);
    }, 60_000);
    return () => window.clearInterval(timer);
  }, []);

  // --- Browser History Synchronization ---
  useEffect(() => {
    // Replace initial state on mount if missing
    if (!window.history.state) {
      window.history.replaceState({ view: currentView, page: activePage }, "");
    }

    const handlePopState = (event) => {
      if (event.type === "popstate" && event.state) {
        if (event.state.view) setCurrentView(event.state.view);
        if (event.state.page) setActivePage(event.state.page);
      } else {
        // Fallback for manual hash changes (typing URL and hitting enter)
        const hashPage = window.location.hash.replace("#", "").toLowerCase();
        const isValidDashboardPage = DASHBOARD_PAGES.includes(hashPage);
        
        if (isValidDashboardPage) {
          if (!user) {
            setAuthMode("login");
            setCurrentView("auth");
            window.history.replaceState({ view: "auth", page: "dashboard" }, "", "#auth");
          } else {
            setCurrentView("dashboard");
            setActivePage(hashPage);
            window.history.replaceState({ view: "dashboard", page: hashPage }, "", `#${hashPage}`);
          }
        } else if (hashPage === "auth") {
          setCurrentView("auth");
          window.history.replaceState({ view: "auth", page: "dashboard" }, "", "#auth");
        } else {
          setCurrentView("landing");
          window.history.replaceState({ view: "landing", page: "dashboard" }, "", "#landing");
        }
      }
    };

    window.addEventListener("popstate", handlePopState);
    window.addEventListener("hashchange", handlePopState);
    return () => {
      window.removeEventListener("popstate", handlePopState);
      window.removeEventListener("hashchange", handlePopState);
    };
  }, [user, currentView, activePage]);

  // Update history when switching tabs inside the dashboard
  function navigatePage(newPage) {
    if (newPage === activePage) return;
    setActivePage(newPage);
    window.history.pushState(
      { view: "dashboard", page: newPage },
      "",
      `#${newPage}`
    );
  }

  // Back button callback for sub-pages (Settings, Profile, etc.)
  function handleBack() {
    if (window.history.length > 1) {
      window.history.back();
    } else {
      navigatePage("dashboard");
    }
  }

  // Check user authentication
  useEffect(() => {
    // Read hash from URL on initial load (e.g. "#profile" → "profile")
    const hashPage = window.location.hash.replace("#", "").toLowerCase();
    const isValidDashboardPage = DASHBOARD_PAGES.includes(hashPage);

    fetchCurrentUser()
      .then((response) => {
        setUser(response.data.user);
        // Restore the page from URL hash if it's a valid dashboard page
        const targetPage = isValidDashboardPage ? hashPage : "dashboard";
        setCurrentView("dashboard");
        setActivePage(targetPage);
        window.history.replaceState({ view: "dashboard", page: targetPage }, "", `#${targetPage}`);
      })
      .catch(() => {
        setUser(null);
        // If a protected page was in the URL, redirect to login instead of landing
        if (isValidDashboardPage) {
          setAuthMode("login");
          setCurrentView("auth");
          window.history.replaceState({ view: "auth", page: "dashboard" }, "", "#auth");
        } else {
          setCurrentView("landing");
          window.history.replaceState({ view: "landing", page: "dashboard" }, "", "#landing");
        }
      });
  }, []);

  useEffect(() => {
    if (!user) return;

    setStats((currentStats) => currentStats.map((stat) => {
      if (stat.id === "weight") {
        return { ...stat, value: Number(user.weight) };
      }

      if (stat.id === "water") {
        const waterToday = user.waterDate === getLocalDate() ? user.waterIntake || 0 : 0;
        return { ...stat, value: waterToday };
      }

      if (stat.id === "bmi") {
        return { ...stat, value: user.bmi ?? "—" };
      }

      return stat;
    }));
  }, [user?.weight, user?.waterIntake, user?.waterDate, user?.bmi]);

  useEffect(() => {
    if (!user?._id && !user?.id) return;

    let cancelled = false;
    fetchGoals()
      .then(({ data }) => {
        if (!cancelled) setGoals(data.goals);
      })
      .catch((error) => {
        console.error("Could not load goals:", error);
        if (!cancelled) setGoals([]);
      });

    return () => {
      cancelled = true;
    };
  }, [user?._id, user?.id]);

  useEffect(() => {
    if (!user?._id && !user?.id) return;

    let cancelled = false;
    fetchWorkouts(todayDate)
      .then(({ data }) => {
        if (cancelled) return;

        setActivities(data.workouts);
        updateStat("calories", data.totalCalories);
        updateStat("workouts", data.completedCount);
      })
      .catch((error) => console.error("Could not load workouts:", error));

    return () => {
      cancelled = true;
    };
  }, [user?._id, user?.id, todayDate]);

  function handleNavigate(targetView, mode = "login") {
    setAuthMode(mode);
    setCurrentView(targetView);
    window.history.pushState({ view: targetView, page: activePage }, "", `#${targetView}`);
  }

  function handleAuthenticated(userData) {
    if (userData) setUser(userData);
    setCurrentView("dashboard");
    setActivePage("dashboard");
    window.history.pushState({ view: "dashboard", page: "dashboard" }, "", "#dashboard");
  }

  async function handleLogout() {
    try {
      await logoutUser();
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      setUser(null);
      setGoals([]);
      setCurrentView("landing");
      window.history.pushState({ view: "landing", page: "dashboard" }, "", "#landing");
    }
  }

  async function saveWeight(weight) {
    const { data } = await updateProfileWeight(weight);
    const savedWeight = data.weight;

    setUser((prev) => ({ ...prev, weight: savedWeight }));
    updateStat("weight", savedWeight);

    const weightGoals = goals.filter(
      (goal) => goal.type === "weight" || goal.unit?.toLowerCase() === "kg"
    );
    for (const goal of weightGoals) {
      const goalId = goal.id || goal._id;
      const { data } = await updateGoal(goalId, { current: savedWeight });

      setGoals((currentGoals) =>
        currentGoals.map((item) =>
          (item.id || item._id) === goalId ? data.goal : item
        )
      );
    }
  }

  async function handleUpdateUser(updatedFields) {
    await saveWeight(Number(updatedFields.weight));
    setUser((prev) => ({ ...prev, ...updatedFields }));
  }

  function updateStat(id, newValue) {
    setStats((prevStats) =>
      prevStats.map((stat) =>
        stat.id === id ? { ...stat, value: newValue } : stat
      )
    );
  }

  async function handleToggleActivity(id) {
    try {
      const { data } = await toggleWorkout(id, todayDate);
      setActivities((prev) =>
        prev.map((item) => item._id === id ? data.workout : item)
      );
      setGoals(data.goals);
      updateStat("calories", data.totalCalories);
      updateStat("workouts", data.completedCount);
    } catch (error) {
      alert(error.response?.data?.message || "Could not update workout. Please try again.");
    }
  }

  async function handleAddWorkout(workoutData) {
    try {
      const { data } = await createWorkout(workoutData);
      setActivities((prev) => [...prev, data.workout]);
      setActiveModal(null);
    } catch (error) {
      alert(error.response?.data?.message || "Could not add workout. Please try again.");
    }
  }

  async function handleLogWater(amountLiters) {
    try {
      const { data } = await logWaterIntake(amountLiters, getLocalDate());
      setUser((prev) => ({ ...prev, ...data }));
      setActiveModal(null);
    } catch (error) {
      alert(error.response?.data?.message || "Could not save water intake. Please try again.");
    }
  }

  async function handleUpdateWeight(newWeight) {
    try {
      await saveWeight(newWeight);
      setActiveModal(null);
    } catch (error) {
      alert(error.response?.data?.message || "Could not update weight. Please try again.");
    }
  }

  async function handleBMICalculated(bmiValue) {
    try {
      const { data } = await updateUserBmi(bmiValue);
      setUser((prev) => ({ ...prev, bmi: data.bmi }));
    } catch (error) {
      alert(error.response?.data?.message || "Could not save BMI. Please try again.");
    }
  }

  async function handleAddGoal(goalData) {
    try {
      const { data } = await createGoal(goalData);
      setGoals((prev) => [...prev, data.goal]);
      setActiveModal(null);
    } catch (error) {
      console.error("Could not create goal:", error);
      alert(error.response?.data?.message || "Could not save the goal. Please try again.");
    }
  }

  async function handleUpdateGoal(goalId, goalData) {
    try {
      const { data } = await updateGoal(goalId, goalData);
      setGoals((prev) =>
        prev.map((goal) => (goal.id || goal._id) === goalId ? data.goal : goal)
      );
      setActiveModal(null);
    } catch (error) {
      console.error("Could not update goal:", error);
      alert(error.response?.data?.message || "Could not update the goal. Please try again.");
    }
  }

  async function handleDeleteGoal(goalId) {
    try {
      await deleteGoal(goalId);
      setGoals((prev) => prev.filter((goal) => (goal.id || goal._id) !== goalId));
    } catch (error) {
      console.error("Could not delete goal:", error);
      alert(error.response?.data?.message || "Could not delete the goal. Please try again.");
    }
  }

  const weightStat = stats?.find((stat) => stat.id === "weight");

  if (currentView === "landing") {
    return <LandingPage onNavigate={(mode) => handleNavigate("auth", mode)} />;
  }

  if (currentView === "auth") {
    return (
      <Auth
        initialMode={authMode}
        onBack={() => {
          setCurrentView("landing");
          window.history.pushState({ view: "landing", page: "dashboard" }, "", "#landing");
        }}
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
        onNavClick={navigatePage}
        onAddWorkoutClick={() => setActiveModal("workout")}
        mobileOpen={mobileNavOpen}
        onClose={() => setMobileNavOpen(false)}
        onLogout={handleLogout}
      />

      <main className="main-content">
        <Header
          userName={user?.name || "User"}
          date={user?.date || new Date().toLocaleDateString()}
          avatarUrl={user?.avatarUrl || ""}
          onMenuClick={() => setMobileNavOpen(true)}
        />

        {activePage === "profile" ? (
          <Profile user={user} onBack={handleBack} />
        ) : activePage === "settings" ? (
          <Settings user={user} onUpdateUser={handleUpdateUser} onBack={handleBack} />
        ) : activePage === "goals" ? (
          <Goals
            goals={goals}
            onAddGoal={() => { setEditingGoal(null); setActiveModal("goal"); }}
            onEditGoal={(goal) => { setEditingGoal(goal); setActiveModal("goal"); }}
            onDeleteGoal={handleDeleteGoal}
          />
        ) : (
          <>
            <Stats stats={stats || []} />
            <Activity
              weeklyData={getWeeklyActivity(activities)}
              currentDay={new Date().toLocaleDateString("en-US", { weekday: "short" })}
              activities={activities || []}
              onToggleActivity={handleToggleActivity}
              goals={goals || []}
              onAddGoalClick={() => { setEditingGoal(null); setActiveModal("goal"); }}
            />
            <QuickActions
              onLogWater={() => setActiveModal("water")}
              onUpdateWeight={() => setActiveModal("weight")}
              onCalculateBMI={() => setActiveModal("bmi")}
              onAddGoal={() => { setEditingGoal(null); setActiveModal("goal"); }}
            />
          </>
        )}
      </main>

      {activeModal === "workout" && (
        <Modal title="Add Workout" onClose={() => setActiveModal(null)}>
          <AddWorkoutForm onAddWorkout={handleAddWorkout} />
        </Modal>
      )}

      {activeModal === "water" && (
        <Modal title="Log Water" onClose={() => setActiveModal(null)}>
          <LogWaterForm onLogWater={handleLogWater} />
        </Modal>
      )}

      {activeModal === "weight" && (
        <Modal title="Update Weight" onClose={() => setActiveModal(null)}>
          <UpdateWeightForm
            currentWeight={Number(weightStat?.value) || Number(user?.weight) || 0}
            onUpdateWeight={handleUpdateWeight}
          />
        </Modal>
      )}

      {activeModal === "bmi" && (
        <Modal title="Calculate BMI" onClose={() => setActiveModal(null)}>
          <BMICalculatorForm
            defaultWeight={Number(weightStat?.value) || Number(user?.weight) || 0}
            defaultHeight={user?.height || 170}
            onCalculated={handleBMICalculated}
          />
        </Modal>
      )}

      {activeModal === "goal" && (
        <Modal title={editingGoal ? "Edit Goal" : "Add Goal"} onClose={() => { setActiveModal(null); setEditingGoal(null); }}>
          <AddGoalForm
            initialGoal={editingGoal}
            onAddGoal={editingGoal
              ? (goalData) => handleUpdateGoal(editingGoal.id || editingGoal._id, goalData)
              : handleAddGoal}
          />
        </Modal>
      )}
    </div>
  );
}

export default App;
