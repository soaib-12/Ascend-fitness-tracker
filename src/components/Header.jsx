import React from "react";
import "./Header.css";

// ==============================================================
// Header Component
// --------------------------------------------------------------
// Props:
//   - userName: string, shown in the "Good morning, X" greeting
//   - date: string, shown inside the pill on the right
//   - avatarUrl: string, the user's profile picture URL
// This component is purely presentational (no state of its own).
// ==============================================================
function Header({ userName, date, avatarUrl }) {
  return (
    <header className="app-header">
      <div>
        <h2 className="greeting">Good morning, {userName}</h2>
        <p className="subtitle">Stay consistent and keep moving toward your goals.</p>
      </div>

      <div className="header-right">
        <span className="date-pill">{date}</span>
        <img className="avatar" src={avatarUrl} alt={`${userName}'s avatar`} />
      </div>
    </header>
  );
}

export default Header;
