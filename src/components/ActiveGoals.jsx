import React from "react";
import "./ActiveGoals.css";

// ==============================================================
// ActiveGoals Component
// --------------------------------------------------------------
// Props:
//   - goals: array of {id, title, current, target, unit, progress}
//   - onAddGoalClick: function() => void, opens the "Add Goal"
//     form/modal (handled by the parent component)
// ==============================================================
function ActiveGoals({ goals, onAddGoalClick }) {
  return (
    <div className="goals-card">
      <div className="goals-header">
        <h3 className="goals-title">Active Goals</h3>
        <button className="goals-add-btn" onClick={onAddGoalClick} aria-label="Add goal">
          +
        </button>
      </div>

      {goals.map((goal) => (
        <div className="goal-item" key={goal.id}>
          <div className="goal-item-top">
            <div>
              <p className="goal-name">{goal.title}</p>
              <p className="goal-current">
                Currently {goal.current} {goal.unit}
              </p>
            </div>
            <span className="goal-progress-value">{goal.progress}%</span>
          </div>
          <div className="goal-track">
            <div className="goal-fill" style={{ width: `${goal.progress}%` }} />
          </div>
        </div>
      ))}
    </div>
  );
}

export default ActiveGoals;
