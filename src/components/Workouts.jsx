import Icon from "./Icon";

function Workouts({ activities = [], weeklyData = [], onToggleActivity, onDeleteWorkout, onEditWorkout, onAddWorkout }) {
  const completedToday = activities.filter((activity) => activity.done);
  const caloriesToday = completedToday.reduce((total, activity) => total + (Number(activity.calories) || 0), 0);
  const minutesToday = completedToday.reduce((total, activity) => total + (Number(activity.durationMinutes) || 0), 0);
  const weekMinutes = weeklyData.reduce((total, day) => total + day.minutes, 0);
  const maxMinutes = Math.max(...weeklyData.map((day) => day.minutes), 1);
  const now = new Date();
  const todayKey = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;

  return (
    <div className="feature-page workouts-page">
      <div className="feature-page-heading">
        <div>
          <p className="feature-eyebrow">TRAINING LOG</p>
          <h1>Workouts</h1>
          <p className="feature-page-description">Plan your sessions, log your effort, and keep your weekly momentum.</p>
        </div>
        <button className="feature-primary-button" onClick={onAddWorkout}>
          <Icon name="plus" size={18} /> Add Workout
        </button>
      </div>

      <section className="feature-summary-grid" aria-label="Workout summary">
        <article className="feature-summary-card">
          <span className="feature-summary-icon blue"><Icon name="dumbbell" size={20} /></span>
          <div><p>Completed today</p><strong>{completedToday.length}</strong><span>workouts</span></div>
        </article>
        <article className="feature-summary-card">
          <span className="feature-summary-icon coral"><Icon name="flame" size={20} /></span>
          <div><p>Calories burned</p><strong>{caloriesToday.toLocaleString()}</strong><span>kcal today</span></div>
        </article>
        <article className="feature-summary-card">
          <span className="feature-summary-icon mint"><Icon name="activity" size={20} /></span>
          <div><p>Active time</p><strong>{weekMinutes}</strong><span>minutes this week · {minutesToday} today</span></div>
        </article>
      </section>

      <section className="feature-panel weekly-panel">
        <div className="feature-panel-heading">
          <div><h2>Your weekly activity</h2><p>Minutes from completed workouts</p></div>
          <span className="feature-panel-total">{weekMinutes} min</span>
        </div>
        <div className="workout-week-chart">
          {weeklyData.map((day) => (
            <div className="workout-week-column" key={day.date}>
              <span className="workout-week-value">{day.minutes || ""}</span>
              <div className="workout-week-track">
                <div className={`workout-week-bar ${day.date === todayKey ? "is-today" : ""}`} style={{ height: `${day.minutes ? Math.max(8, (day.minutes / maxMinutes) * 100) : 0}%` }} />
              </div>
              <span className="workout-week-label">{day.day}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="feature-panel workout-list-panel">
        <div className="feature-panel-heading">
          <div><h2>Today’s sessions</h2><p>Tap a workout to mark it complete or undo it.</p></div>
          <span className="workout-count-pill">{completedToday.length}/{activities.length} done</span>
        </div>
        {activities.length === 0 ? (
          <div className="feature-empty-state">
            <span className="feature-empty-icon"><Icon name="dumbbell" size={24} /></span>
            <h3>No workouts yet</h3>
            <p>Add a workout to start building your training log.</p>
            <button className="feature-secondary-button" onClick={onAddWorkout}>Add your first workout</button>
          </div>
        ) : (
          <div className="workout-session-list">
            {activities.map((activity) => (
              <div className={`workout-session ${activity.done ? "is-complete" : ""}`} key={activity.id || activity._id}>
                <span className="workout-session-icon"><Icon name={activity.name.toLowerCase().includes("run") ? "run" : "activity"} size={19} /></span>
                <span className="workout-session-info"><strong>{activity.name}</strong><span>{activity.durationMinutes || 0} min <i /> {activity.calories || 0} kcal</span></span>
                <button className="workout-session-toggle" onClick={() => onToggleActivity(activity.id || activity._id)}>{activity.done ? <><Icon name="check" size={15} /> Completed</> : "Mark done"}</button>
                <button className="workout-session-edit" aria-label={`Edit ${activity.name}`} onClick={() => onEditWorkout(activity)}><Icon name="edit" size={16} /></button>
                <button className="workout-session-delete" aria-label={`Delete ${activity.name}`} onClick={() => onDeleteWorkout(activity.id || activity._id)}><Icon name="trash" size={16} /></button>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

export default Workouts;
