import React from "react";
import Icon from "./Icon";
import "./ActiveGoals.css";

function ActiveGoals({ goals, onAddGoalClick }) {
  return (
    <section className="goals-card">
      <div className="goals-header">
        <h3 className="goals-title">Active Goals</h3>
        <button className="goals-add-btn" onClick={onAddGoalClick} aria-label="Add goal">
          <Icon name="plus" size={21} />
        </button>
      </div>

      <div className="goals-list">
        {goals.map((goal) => (
          <div className="goal-item" key={goal.id}>
            <div className="goal-item-top">
              <div>
                <p className="goal-name">{goal.title}</p>
                <p className="goal-current">Currently {goal.current} {goal.unit}</p>
              </div>
              <span className="goal-progress-value">{goal.progress}%</span>
            </div>
            <div className="goal-track">
              <div className="goal-fill" style={{ width: `${goal.progress}%` }} />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default ActiveGoals;
