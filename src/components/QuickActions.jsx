import React from "react";
import "./QuickActions.css";

// ==============================================================
// QuickActions Component
// --------------------------------------------------------------
// Props:
//   - onLogWater: function() => void
//   - onUpdateWeight: function() => void
//   - onCalculateBMI: function() => void
//   - onAddGoal: function() => void
//
// Each button just calls the handler passed down from App.jsx.
// This keeps QuickActions "dumb" (no state of its own) while the
// real logic/state changes happen in the parent.
// ==============================================================
function QuickActions({ onLogWater, onUpdateWeight, onCalculateBMI, onAddGoal }) {
  const actions = [
    { label: "Log Water", icon: "💧", handler: onLogWater, highlighted: true },
    { label: "Update Weight", icon: "⚖️", handler: onUpdateWeight },
    { label: "Calculate BMI", icon: "🧮", handler: onCalculateBMI },
    { label: "Add Goal", icon: "🚩", handler: onAddGoal },
  ];

  return (
    <div className="quick-actions-row">
      {actions.map((action) => (
        <button className="quick-action-card" key={action.label} onClick={action.handler}>
          <span className={`quick-action-icon ${action.highlighted ? "quick-action-icon-highlighted" : ""}`}>
            {action.icon}
          </span>
          <span className="quick-action-label">{action.label}</span>
        </button>
      ))}
    </div>
  );
}

export default QuickActions;
