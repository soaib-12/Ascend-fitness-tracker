// src/App.jsx
import { useState } from "react";
import LandingPage from "./components/LandingPage";
import Auth from "./components/Auth"; // Replace 'Auth' with your teammate's component filename

export default function App() {
  const [currentView, setCurrentView] = useState("landing"); // 'landing' or 'auth'
  const [authMode, setAuthMode] = useState("login"); // 'login' or 'signup'

  const handleNavigate = (targetView, mode = "login") => {
    setAuthMode(mode);
    setCurrentView(targetView);
  };

  return (
    <div className="min-h-screen">
      {currentView === "landing" ? (
        <LandingPage 
          onNavigate={(mode) => handleNavigate("auth", mode)} 
        />
      ) : (
        <Auth 
          initialMode={authMode} 
          onBack={() => setCurrentView("landing")} 
        />
      )}
    </div>
  );
}