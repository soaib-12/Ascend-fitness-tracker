import React from "react";
import StatCard from "./StatCard";
import "./StatsRow.css";

const tones = {
  Workouts: ["dumbbell", "blue"],
  Calories: ["flame", "red"],
  Weight: ["scale", "teal"],
  Water: ["droplet", "blue"],
  BMI: ["bmi", "slate"],
};

function StatsRow({ stats }) {
  return (
    <section className="stats-row" aria-label="Weekly health summary">
      {stats.map((stat) => {
        const [icon, tone] = tones[stat.label] || ["activity", "blue"];
        return (
          <StatCard
            key={stat.id}
            icon={icon}
            label={stat.label}
            value={stat.value}
            unit={stat.unit}
            tone={tone}
          />
        );
      })}
    </section>
  );
}

export default StatsRow;
