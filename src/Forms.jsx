import React, { useState } from "react";


function Modal({ title, onClose, children }) {
  return (
    // Clicking the dark backdrop closes the modal
    <div className="modal-backdrop" onClick={onClose}>
      {

      }
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>{title}</h3>
          <button className="modal-close-btn" onClick={onClose} aria-label="Close">
            ✕
          </button>
        </div>
        <div className="modal-body">{children}</div>
      </div>
    </div>
  );
}


function AddWorkoutForm({ onAddWorkout }) {
  const [workoutName, setWorkoutName] = useState("");

  
  function handleSubmit(e) {
    e.preventDefault(); // stop the page from reloading
    if (workoutName.trim() === "") return; // ignore empty input
    onAddWorkout(workoutName.trim());
    setWorkoutName(""); // reset the field for next time
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="workout-name">Workout name</label>
      <input
        id="workout-name"
        type="text"
        placeholder="e.g. Evening Cycling"
        value={workoutName}
        onChange={(e) => setWorkoutName(e.target.value)}
      />
      <button type="submit" className="modal-submit-btn">
        Add Workout
      </button>
    </form>
  );
}

// ==============================================================
// LogWaterForm Component
// --------------------------------------------------------------
// Props:
//   - onLogWater: function(amountInLiters) => void
// State:
//   - amount: string, the number typed by the user (kept as a
//     string because that's what <input> gives us; converted to
//     a number only when we submit)
// ==============================================================
function LogWaterForm({ onLogWater }) {
  const [amount, setAmount] = useState("0.25");

  function handleSubmit(e) {
    e.preventDefault();
    const numericAmount = parseFloat(amount);
    if (isNaN(numericAmount) || numericAmount <= 0) return;
    onLogWater(numericAmount);
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="water-amount">Amount (liters)</label>
      <input
        id="water-amount"
        type="number"
        step="0.05"
        min="0"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <button type="submit" className="modal-submit-btn">
        Log Water
      </button>
    </form>
  );
}

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

export {
  Modal,
  AddWorkoutForm,
  LogWaterForm,
  UpdateWeightForm,
  BMICalculatorForm,
  AddGoalForm,
};
