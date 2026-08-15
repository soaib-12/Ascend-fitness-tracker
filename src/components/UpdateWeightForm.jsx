import React, { useState } from "react";

// ==============================================================
// UpdateWeightForm Component
// --------------------------------------------------------------
// Props:
//   - currentWeight: number, pre-fills the input with today's value
//   - onUpdateWeight: function(newWeight) => void
// ==============================================================
function UpdateWeightForm({ currentWeight, onUpdateWeight }) {
  const [weight, setWeight] = useState(currentWeight);

  function handleSubmit(e) {
    e.preventDefault();
    const numericWeight = parseFloat(weight);
    if (isNaN(numericWeight) || numericWeight <= 0) return;
    onUpdateWeight(numericWeight);
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="weight-input">Weight (kg)</label>
      <input
        id="weight-input"
        type="number"
        step="0.1"
        min="0"
        value={weight}
        onChange={(e) => setWeight(e.target.value)}
      />
      <button type="submit" className="modal-submit-btn">
        Update Weight
      </button>
    </form>
  );
}

export default UpdateWeightForm;
