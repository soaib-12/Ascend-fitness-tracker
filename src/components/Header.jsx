import React from "react";
import Icon from "./Icon";
import "./Header.css";

function Header({ userName, date, avatarUrl, onMenuClick }) {
  return (
    <header className="app-header">
      <div className="mobile-header-row">
        <button className="mobile-menu-btn" onClick={onMenuClick} aria-label="Open navigation">
          <Icon name="grid" size={21} />
        </button>
        <div className="mobile-brand">Ascend</div>
      </div>

      <div className="greeting-block">
        <h2 className="greeting">Good morning, {userName}</h2>
        <p className="subtitle">Stay consistent and keep moving toward your goals.</p>
      </div>

      <div className="header-right">
        <span className="date-pill">
          <span className="date-icon"><Icon name="activity" size={15} /></span>
          {date}
        </span>
        <img className="avatar" src={avatarUrl} alt={`${userName}'s avatar`} />
      </div>
    </header>
  );
}

export default Header;
