import React from "react";
import Icon from "./Icon";
import "./QuickActions.css";

function QuickActions({ onLogWater, onUpdateWeight, onCalculateBMI, onAddGoal }) {
  const actions = [
    { label: "Log Water", icon: "water", handler: onLogWater, highlighted: true },
    { label: "Update Weight", icon: "weight", handler: onUpdateWeight },
    { label: "Calculate BMI", icon: "calculator", handler: onCalculateBMI },
    { label: "Add Goal", icon: "flag", handler: onAddGoal },
  ];

  return (
    <section className="quick-actions-row" aria-label="Quick actions">
      {actions.map((action) => (
        <button className="quick-action-card" key={action.label} onClick={action.handler}>
          <span className={`quick-action-icon ${action.highlighted ? "quick-action-icon-highlighted" : ""}`}>
            <Icon name={action.icon} size={21} />
          </span>
          <span className="quick-action-label">{action.label}</span>
        </button>
      ))}
    </section>
  );
}

export default QuickActions;
