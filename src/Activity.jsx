import React from "react";
import Icon from "./Icon";

function WeeklyActivityChart({ data, currentDay }) {
  const maxMinutes = Math.max(...data.map((d) => d.minutes), 1);
  const gridRows = [100, 75, 50, 25, 0];

  return (
    <section className="chart-card">
      <div className="chart-heading">
        <div>
          <h3 className="chart-title">Weekly Workout Activity</h3>
          <p className="chart-subtitle">Minutes of activity completed this week</p>
        </div>
      </div>

      <div className="chart-body">
        <div className="chart-grid" aria-hidden="true">
          {gridRows.map((row) => <span key={row} style={{ bottom: `${row}%` }} />)}
        </div>
        <div className="chart-bars">
          {data.map((entry) => {
            const heightPercent = entry.minutes === 0 ? 0 : Math.max(8, (entry.minutes / maxMinutes) * 100);
            const isToday = entry.day === currentDay;
            return (
              <div className="chart-column" key={entry.day}>
                <div className="chart-value">{entry.minutes > 0 ? `${entry.minutes}m` : ""}</div>
                <div className="chart-bar-track">
                  <div
                    className={`chart-bar ${isToday ? "chart-bar-active" : ""}`}
                    style={{ height: `${heightPercent}%` }}
                    title={`${entry.minutes} minutes`}
                  />
                </div>
                <span className={`chart-day-label ${isToday ? "chart-day-active" : ""}`}>{entry.day}</span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

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

function Activity({ weeklyData, currentDay, activities, onToggleActivity, goals, onAddGoalClick }) {
  return (
    <div className="dashboard-columns">
      <WeeklyActivityChart data={weeklyData} currentDay={currentDay} />
      <div className="dashboard-right-column">
        <TodaysActivity activities={activities} onToggleActivity={onToggleActivity} />
        <ActiveGoals goals={goals} onAddGoalClick={onAddGoalClick} />
      </div>
    </div>
  );
}

export default Activity;
