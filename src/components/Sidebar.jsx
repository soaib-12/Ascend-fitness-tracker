import React from "react";
import "./Sidebar.css";

// ==============================================================
// Sidebar Component
// --------------------------------------------------------------
// Props:
//   - navLinks: array of {id, label, icon, active} objects, used
//     to render the navigation list dynamically instead of
//     hardcoding each <li> by hand.
//   - activePage: string, the id of the currently selected page
//   - onNavClick: function(id) => void, called when a nav item
//     is clicked, lets the parent (App.jsx) update which page
//     is "active" (state lives in the parent = "lifting state up")
//   - onAddWorkoutClick: function() => void, opens the Add Workout modal
// ==============================================================
function Sidebar({ navLinks, activePage, onNavClick, onAddWorkoutClick }) {
  return (
    <aside className="sidebar">
      {/* --- Logo / App name --- */}
      <div className="sidebar-logo">
        <div className="logo-icon">🧭</div>
        <div>
          <h1 className="logo-title">Ascend</h1>
          <p className="logo-subtitle">Productive Wellness</p>
        </div>
      </div>

      {/* --- Primary call-to-action button --- */}
      <button className="add-workout-btn" onClick={onAddWorkoutClick}>
        <span className="plus-icon">+</span> Add Workout
      </button>

      {/* --- Navigation list ---
          We map over the navLinks array so that adding a new page
          only requires editing mockData.js, not this component. */}
      <nav className="sidebar-nav">
        <ul>
          {navLinks.map((link) => (
            <li key={link.id}>
              <button
                className={`nav-item ${activePage === link.id ? "nav-item-active" : ""}`}
                onClick={() => onNavClick(link.id)}
              >
                <span className="nav-icon">{link.icon}</span>
                {link.label}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {/* --- Bottom section: profile / settings / logout --- */}
      <div className="sidebar-footer">
        <button className="nav-item">
          <span className="nav-icon">👤</span> Profile
        </button>
        <button className="nav-item">
          <span className="nav-icon">⚙️</span> Settings
        </button>
        <button className="nav-item">
          <span className="nav-icon">🚪</span> Logout
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;
