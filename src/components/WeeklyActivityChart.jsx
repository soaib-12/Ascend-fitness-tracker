import React from "react";
import "./WeeklyActivityChart.css";

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

export default WeeklyActivityChart;
