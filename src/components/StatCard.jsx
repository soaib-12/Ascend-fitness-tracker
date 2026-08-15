import React from "react";
import "./StatCard.css";

// ==============================================================
// StatCard Component
// --------------------------------------------------------------
// A small reusable "summary" card (used 5 times: Workouts,
// Calories, Weight, Water, BMI). Keeping this as its own
// component avoids repeating the same JSX 5 times in the parent.
//
// Props:
//   - icon: string (emoji used as a lightweight icon)
//   - label: string, e.g. "Workouts"
//   - value: string|number, the big bold number
//   - unit: string, the small grey caption under the value
// ==============================================================
function StatCard({ icon, label, value, unit }) {
  return (
    <div className="stat-card">
      <div className="stat-card-label">
        <span className="stat-icon">{icon}</span>
        <span>{label}</span>
      </div>
      <div className="stat-value">{value}</div>
      <div className="stat-unit">{unit}</div>
    </div>
  );
}

export default StatCard;
