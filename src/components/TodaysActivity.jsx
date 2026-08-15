import React from "react";
import Icon from "./Icon";
import "./TodaysActivity.css";

function TodaysActivity({ activities, onToggleActivity }) {
  const doneCount = activities.filter((a) => a.done).length;
  const progressPercent = activities.length === 0 ? 0 : Math.round((doneCount / activities.length) * 100);

  const iconFor = (activity) => {
    if (activity.name.toLowerCase().includes("run")) return "run";
    if (activity.name.toLowerCase().includes("stretch")) return "stretch";
    return "activity";
  };

  return (
    <section className="today-card">
      <h3 className="today-title">Today's Activity</h3>

      <div className="progress-header">
        <span>Overall Progress</span>
        <span className="progress-percent">{progressPercent}%</span>
      </div>
      <div className="progress-track" aria-label={`Today's activity progress: ${progressPercent}%`}>
        <div className="progress-fill" style={{ width: `${progressPercent}%` }} />
      </div>

      <div className="activity-list">
        {activities.map((activity) => (
          <button
            key={activity.id}
            className={`activity-item ${activity.done ? "activity-item-done" : ""}`}
            onClick={() => onToggleActivity(activity.id)}
          >
            <span className={`activity-icon ${activity.done ? "activity-icon-done" : ""}`}>
              <Icon name={iconFor(activity)} size={17} />
            </span>
            <span className="activity-name">{activity.name}</span>
            <span className={`activity-check ${activity.done ? "activity-check-done" : ""}`}>
              {activity.done && <Icon name="check" size={12} strokeWidth={2.6} />}
            </span>
          </button>
        ))}
      </div>
    </section>
  );
}

export default TodaysActivity;
