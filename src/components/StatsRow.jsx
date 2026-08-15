import React from "react";
import StatCard from "./StatCard";
import "./StatsRow.css";

// ==============================================================
// StatsRow Component
// --------------------------------------------------------------
// Props:
//   - stats: array of stat objects from mockData.js
// Simply loops over the stats array and renders a <StatCard />
// for each entry. This is the "list rendering" pattern in React.
// ==============================================================
function StatsRow({ stats }) {
  return (
    <div className="stats-row">
      {stats.map((stat) => (
        <StatCard
          key={stat.id}
          icon={stat.icon}
          label={stat.label}
          value={stat.value}
          unit={stat.unit}
        />
      ))}
    </div>
  );
}

export default StatsRow;
