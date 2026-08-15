import React, { useState } from "react";

// ==============================================================
// AddGoalForm Component
// --------------------------------------------------------------
// Props:
//   - onAddGoal: function(goalData) => void, where goalData is
//     { title, current, target, unit }
// ==============================================================
function AddGoalForm({ onAddGoal }) {
  const [title, setTitle] = useState("");
  const [current, setCurrent] = useState("");
  const [target, setTarget] = useState("");
  const [unit, setUnit] = useState("kg");

  function handleSubmit(e) {
    e.preventDefault();
    if (title.trim() === "" || current === "" || target === "") return;

    onAddGoal({
      title: title.trim(),
      current: parseFloat(current),
      target: parseFloat(target),
      unit,
    });
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="goal-title">Goal title</label>
      <input
        id="goal-title"
        type="text"
        placeholder="e.g. Reach 60 kg"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <label htmlFor="goal-current">Current value</label>
      <input
        id="goal-current"
        type="number"
        value={current}
        onChange={(e) => setCurrent(e.target.value)}
      />

      <label htmlFor="goal-target">Target value</label>
      <input
        id="goal-target"
        type="number"
        value={target}
        onChange={(e) => setTarget(e.target.value)}
      />

      <label htmlFor="goal-unit">Unit</label>
      <input
        id="goal-unit"
        type="text"
        value={unit}
        onChange={(e) => setUnit(e.target.value)}
      />

      <button type="submit" className="modal-submit-btn">
        Add Goal
      </button>
    </form>
  );
}

export default AddGoalForm;
