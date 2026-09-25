import React, { useState } from "react";
import Icon from "./Icon";
import "./Goals.css";

function getGoalType(goal) {
  const unit = goal.unit?.toLowerCase();
  if (unit === "kg" || goal.type === "weight") return "weight";
  if (["kcal", "cal", "calories"].includes(unit) || goal.type === "calories") return "calories";
  return goal.type || "goal";
}

export default function Goals({ goals = [], onAddGoal, onEditGoal, onDeleteGoal }) {
  const [activeTab, setActiveTab] = useState("active");
  const visibleGoals = goals.filter((goal) =>
    activeTab === "completed" ? goal.progress >= 100 : goal.progress < 100
  );

  return (
    <div className="goals-page">
      {/* Header Section */}
      <div className="goals-header">
        <div>
          <h1 className="goals-title">My Goals</h1>
          <p className="goals-subtitle">Track your progress and stay consistent.</p>
        </div>
        <button className="goals-page-add-btn" onClick={onAddGoal}>
          <Icon name="plus" size={16} strokeWidth={2.5} />
          Add Goal
        </button>
      </div>

      {/* Tabs */}
      <div className="goals-tabs">
        <button 
          className={`goals-tab ${activeTab === "active" ? "active" : ""}`}
          onClick={() => setActiveTab("active")}
        >
          Active
        </button>
        <button 
          className={`goals-tab ${activeTab === "completed" ? "active" : ""}`}
          onClick={() => setActiveTab("completed")}
        >
          Completed
        </button>
      </div>

      {/* Goals Grid */}
      <div className="goals-grid">
        {visibleGoals.length === 0 ? (
            <p className="goals-empty-state">
              {activeTab === "completed" ? "No completed goals yet." : "No active goals. Add one to get started."}
            </p>
        ) : visibleGoals.map((goal) => {
          const type = getGoalType(goal);
          const icon = type === "calories" ? "flame" : goal.icon || "scale";
          const progress = Math.max(0, Math.min(Number(goal.progress) || 0, 100));

          return (
            <div key={goal.id || goal._id} className="goal-card-item">
              <div className="goal-card-header">
                <div className={`goal-card-icon-wrap icon-${type}`}>
                  <Icon name={icon} size={20} strokeWidth={2} />
                </div>
                <span className="goal-card-badge">
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </span>
              </div>

              <h3 className="goal-card-title">{goal.title}</h3>

              <div className="goal-card-actions">
                <button type="button" onClick={() => onEditGoal(goal)}>Edit</button>
                <button type="button" onClick={() => onDeleteGoal(goal.id || goal._id)}>Delete</button>
              </div>

              <div className="goal-card-progress-row">
                <span className="goal-card-percent">{Math.round(progress)}%</span>
                <span className="goal-card-target">{goal.targetText || `Target: ${goal.target} ${goal.unit}`}</span>
              </div>

              <div className="goal-card-bar-track">
                <div className="goal-card-bar-fill" style={{ width: `${progress}%` }} />
              </div>

              <div className="goal-card-footer">
                <Icon name={goal.footerIcon || "calendar"} size={14} />
                <span>{goal.footerText || "No deadline"}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
