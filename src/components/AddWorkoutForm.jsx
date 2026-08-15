import React, { useState } from "react";

// ==============================================================
// AddWorkoutForm Component
// --------------------------------------------------------------
// Props:
//   - onAddWorkout: function(workoutName) => void, called with the
//     new workout's name when the form is submitted.
//
// State:
//   - workoutName: string, tracks what the user has typed into
//     the text input (a "controlled input" - React state is the
//     single source of truth for the input's value).
// ==============================================================
function AddWorkoutForm({ onAddWorkout }) {
  const [workoutName, setWorkoutName] = useState("");

  // Runs when the form is submitted (button click or Enter key)
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

export default AddWorkoutForm;
