import React from "react";
import Icon from "./Icon";
import "./Sidebar.css";

const iconMap = {
  dashboard: "grid",
  workouts: "dumbbell",
  health: "activity",
  goals: "trophy",
  progress: "trend",
};

function Sidebar({ navLinks, activePage, onNavClick, onAddWorkoutClick, mobileOpen, onClose }) {
  return (
    <>
      <div className={`sidebar-overlay ${mobileOpen ? "sidebar-overlay-visible" : ""}`} onClick={onClose} />
      <aside className={`sidebar ${mobileOpen ? "sidebar-mobile-open" : ""}`}>
        <div className="sidebar-top">
          <div className="sidebar-logo">
            <div className="logo-mark" aria-hidden="true">
              <Icon name="dumbbell" size={22} strokeWidth={2.2} />
            </div>
            <div>
              <h1 className="logo-title">Ascend</h1>
              <p className="logo-subtitle">Productive Wellness</p>
            </div>
          </div>

          <button className="sidebar-close" onClick={onClose} aria-label="Close navigation">
            ×
          </button>

          <button className="add-workout-btn" onClick={onAddWorkoutClick}>
            <Icon name="plus" size={21} strokeWidth={2} />
            <span>Add Workout</span>
          </button>

          <nav className="sidebar-nav" aria-label="Primary navigation">
            <ul>
              {navLinks.map((link) => (
                <li key={link.id}>
                  <button
                    className={`nav-item ${activePage === link.id ? "nav-item-active" : ""}`}
                    onClick={() => {
                      onNavClick(link.id);
                      onClose();
                    }}
                  >
                    <Icon name={iconMap[link.id]} size={20} />
                    <span>{link.label}</span>
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="sidebar-footer">
          <button className="nav-item">
            <Icon name="user" size={20} />
            <span>Profile</span>
          </button>
          <button className="nav-item">
            <Icon name="settings" size={20} />
            <span>Settings</span>
          </button>
          <button className="nav-item">
            <Icon name="logout" size={20} />
            <span>Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
}

export default Sidebar;
