import React, { useState } from "react";

// ==============================================================
// BMICalculatorForm Component
// --------------------------------------------------------------
// Props:
//   - defaultWeight: number, pre-fills the weight field (kg)
//   - onCalculated: function(bmiValue) => void, called after the
//     BMI is calculated so the parent can update the BMI stat card
//
// State:
//   - weight, heightCm: the two form inputs
//   - result: the calculated BMI (null until "Calculate" is clicked)
//
// Formula: BMI = weight(kg) / (height(m))^2
// ==============================================================
function BMICalculatorForm({ defaultWeight, onCalculated }) {
  const [weight, setWeight] = useState(defaultWeight);
  const [heightCm, setHeightCm] = useState(170);
  const [result, setResult] = useState(null);

  function handleSubmit(e) {
    e.preventDefault();
    const w = parseFloat(weight);
    const hMeters = parseFloat(heightCm) / 100;
    if (isNaN(w) || isNaN(hMeters) || hMeters <= 0) return;

    const bmi = w / (hMeters * hMeters);
    const rounded = Math.round(bmi * 10) / 10;
    setResult(rounded);
    onCalculated(rounded);
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="bmi-weight">Weight (kg)</label>
      <input
        id="bmi-weight"
        type="number"
        step="0.1"
        value={weight}
        onChange={(e) => setWeight(e.target.value)}
      />

      <label htmlFor="bmi-height">Height (cm)</label>
      <input
        id="bmi-height"
        type="number"
        step="1"
        value={heightCm}
        onChange={(e) => setHeightCm(e.target.value)}
      />

      <button type="submit" className="modal-submit-btn">
        Calculate BMI
      </button>

      {result !== null && (
        <div className="modal-result">Your BMI is {result}</div>
      )}
    </form>
  );
}

export default BMICalculatorForm;
