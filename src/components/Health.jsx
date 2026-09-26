import Icon from "./Icon";

function getBmiLabel(value) {
  const bmi = Number(value);
  if (!bmi) return "Calculate your BMI";
  if (bmi < 18.5) return "Below recommended range";
  if (bmi < 25) return "Within recommended range";
  if (bmi < 30) return "Above recommended range";
  return "High BMI range";
}

function Health({ stats = [], user, onLogWater, onUpdateWeight, onCalculateBMI, onClearWater, onClearBMI }) {
  const weight = stats.find((stat) => stat.id === "weight")?.value ?? user?.weight ?? "—";
  const water = Number(stats.find((stat) => stat.id === "water")?.value ?? 0) || 0;
  const bmi = stats.find((stat) => stat.id === "bmi")?.value ?? user?.bmi;
  const hydrationPercent = Math.min((water / 2) * 100, 100);
  const bmiValue = Number(bmi) || 0;

  const healthMetrics = [
    { id: "weight", label: "Current weight", value: weight, unit: "kg", icon: "scale", tone: "mint", action: onUpdateWeight, actionLabel: "Update" },
    { id: "water", label: "Water today", value: water.toFixed(2).replace(/0+$/, "").replace(/\.$/, ""), unit: "L", icon: "droplet", tone: "blue", action: onLogWater, actionLabel: "Log water" },
    { id: "bmi", label: "Body mass index", value: bmiValue || "—", unit: "BMI", icon: "bmi", tone: "lavender", action: onCalculateBMI, actionLabel: "Calculate" },
  ];

  return (
    <div className="feature-page health-page">
      <div className="feature-page-heading">
        <div>
          <p className="feature-eyebrow">WELLNESS OVERVIEW</p>
          <h1>Health</h1>
          <p className="feature-page-description">A simple view of your daily health habits and body metrics.</p>
        </div>
        <span className="health-date-pill"><Icon name="calendar" size={16} /> Today</span>
      </div>

      <section className="health-metric-grid" aria-label="Health metrics">
        {healthMetrics.map((metric) => (
          <article className="health-metric-card" key={metric.id}>
            <div className={`health-metric-icon ${metric.tone}`}><Icon name={metric.icon} size={20} /></div>
            <p>{metric.label}</p>
            <div className="health-metric-value">{metric.value}<span>{metric.unit}</span></div>
            {metric.id === "bmi" && <span className="health-metric-note">{getBmiLabel(bmi)}</span>}
            <div className="health-metric-actions">
              <button className="health-metric-action" onClick={metric.action}>{metric.actionLabel}<Icon name="trend" size={14} /></button>
              {metric.id === "water" && water > 0 && <button className="health-metric-delete" onClick={onClearWater}>Clear</button>}
              {metric.id === "bmi" && bmiValue > 0 && <button className="health-metric-delete" onClick={onClearBMI}>Clear</button>}
            </div>
          </article>
        ))}
      </section>

      <section className="health-details-grid">
        <article className="feature-panel hydration-panel">
          <div className="health-panel-icon blue"><Icon name="water" size={21} /></div>
          <div className="health-panel-heading"><div><h2>Daily hydration</h2><p>Keep water nearby throughout the day.</p></div><button className="feature-secondary-button" onClick={onLogWater}>+ Log water</button></div>
          <div className="hydration-total"><strong>{water.toFixed(2).replace(/0+$/, "").replace(/\.$/, "")}</strong><span> / 2.00 L goal</span></div>
          <div className="hydration-track" role="progressbar" aria-label="Daily hydration progress" aria-valuenow={Math.round(hydrationPercent)} aria-valuemin="0" aria-valuemax="100"><div style={{ width: `${hydrationPercent}%` }} /></div>
          <div className="hydration-footnote"><span>{Math.round(hydrationPercent)}% of daily goal</span><span>{Math.max(0, 2 - water).toFixed(2)} L to go</span></div>
        </article>

        <article className="feature-panel body-panel">
          <div className="health-panel-icon mint"><Icon name="user" size={21} /></div>
          <h2>Your body metrics</h2>
          <p className="body-panel-description">Your profile details help keep your health snapshot up to date.</p>
          <div className="body-detail-row"><span>Height</span><strong>{user?.height ? `${user.height} cm` : "Not set"}</strong></div>
          <div className="body-detail-row"><span>Age</span><strong>{user?.age ? `${user.age} years` : "Not set"}</strong></div>
          <button className="body-panel-action" onClick={onUpdateWeight}>Update your weight <Icon name="trend" size={15} /></button>
        </article>
      </section>
    </div>
  );
}

export default Health;
