import React from "react";
import Icon from "./Icon";

const tones = {
  Workouts: ["dumbbell", "blue"],
  Calories: ["flame", "red"],
  Weight: ["scale", "teal"],
  Water: ["droplet", "blue"],
  BMI: ["bmi", "slate"],
};

function StatCard({ icon, label, value, unit, tone = "blue" }) {
  return (
    <article className="stat-card">
      <div className={`stat-icon-wrap stat-icon-${tone}`}>
        <Icon name={icon} size={18} strokeWidth={1.9} />
      </div>
      <div className="stat-content">
        <div className="stat-card-label">{label}</div>
        <div className="stat-value">{value}</div>
        <div className={`stat-unit ${label === "BMI" ? "stat-unit-status" : ""}`}>{unit}</div>
      </div>
    </article>
  );
}

function Stats({ stats }) {
  return (
    <section className="stats-row" aria-label="Weekly health summary">
      {stats.map((stat) => {
        const [icon, tone] = tones[stat.label] || ["activity", "blue"];
        return <StatCard key={stat.id} icon={icon} label={stat.label} value={stat.value} unit={stat.unit} tone={tone} />;
      })}
    </section>
  );
}

export default Stats;
