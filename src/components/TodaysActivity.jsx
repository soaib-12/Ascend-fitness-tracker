import React from "react";
import "./TodaysActivity.css";

// ==============================================================
// TodaysActivity Component
// --------------------------------------------------------------
// Props:
//   - activities: array of {id, name, icon, done} objects
//   - onToggleActivity: function(id) => void, called when the
//     user clicks an activity row's checkmark circle. The actual
//     state update happens in the parent (App.jsx) since that is
//     where the `activities` state lives ("lifting state up").
//
// The "Overall Progress" percentage is DERIVED from the
// activities array (not stored separately), so it always stays
// in sync automatically whenever an activity is toggled.
// ==============================================================
function TodaysActivity({ activities, onToggleActivity }) {
  // Calculate what % of today's activities are marked done
  const doneCount = activities.filter((a) => a.done).length;
  const progressPercent =
    activities.length === 0 ? 0 : Math.round((doneCount / activities.length) * 100);

  return (
    <div className="today-card">
      <h3 className="today-title">Today's Activity</h3>

      {/* --- Overall progress bar --- */}
      <div className="progress-header">
        <span>Overall Progress</span>
        <span className="progress-percent">{progressPercent}%</span>
      </div>
      <div className="progress-track">
        <div className="progress-fill" style={{ width: `${progressPercent}%` }} />
      </div>

      {/* --- Activity checklist --- */}
      <div className="activity-list">
        {activities.map((activity) => (
          <button
            key={activity.id}
            className="activity-item"
            onClick={() => onToggleActivity(activity.id)}
          >
            <span className="activity-icon">{activity.icon}</span>
            <span className="activity-name">{activity.name}</span>
            <span className={`activity-check ${activity.done ? "activity-check-done" : ""}`}>
              {activity.done ? "✓" : ""}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}

export default TodaysActivity;
