import React from "react";
import "./WeeklyActivityChart.css";

// ==============================================================
// WeeklyActivityChart Component
// --------------------------------------------------------------
// Props:
//   - data: array of {day, minutes} objects
//   - currentDay: string, the day to visually highlight (e.g. "Thu")
//
// This is a simple bar chart built with plain <div> elements and
// CSS, rather than a charting library. This keeps things
// beginner-friendly and easy to explain: each bar's height is
// just set using inline style based on the `minutes` value.
// ==============================================================
function WeeklyActivityChart({ data, currentDay }) {
  // Find the largest value so we can scale every bar relative to it
  const maxMinutes = Math.max(...data.map((d) => d.minutes), 1);

  return (
    <div className="chart-card">
      <h3 className="chart-title">Weekly Workout Activity</h3>

      <div className="chart-bars">
        {data.map((entry) => {
          // Scale bar height as a percentage of the tallest bar
          const heightPercent = (entry.minutes / maxMinutes) * 100;
          const isToday = entry.day === currentDay;

          return (
            <div className="chart-column" key={entry.day}>
              <div className="chart-bar-track">
                <div
                  className={`chart-bar ${isToday ? "chart-bar-active" : ""}`}
                  style={{ height: `${heightPercent}%` }}
                  title={`${entry.minutes} min`}
                />
              </div>
              <span className={`chart-day-label ${isToday ? "chart-day-active" : ""}`}>
                {entry.day}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default WeeklyActivityChart;
