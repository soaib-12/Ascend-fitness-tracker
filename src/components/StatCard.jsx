import React from "react";
import Icon from "./Icon";
import "./StatCard.css";

function StatCard({ icon, label, value, unit, tone = "blue" }) {
  return (
    <article className="stat-card">
      <div className={`stat-icon-wrap stat-icon-${tone}`}>
        <Icon name={icon} size={18} strokeWidth={1.9} />
      </div>
      <div className="stat-content">
        <div className="stat-card-label">{label}</div>
        <div className="stat-value">{value}</div>
        <div className={`stat-unit ${label === "BMI" ? "stat-unit-status" : ""}`}>{unit}</div>
      </div>
    </article>
  );
}

export default StatCard;
