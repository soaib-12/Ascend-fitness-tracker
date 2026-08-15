import React, { useState } from "react";

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

export default LogWaterForm;
