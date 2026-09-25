import mongoose from "mongoose";
import User from "../model/user.js";

function updateCalorieGoalProgress(goal) {
  let progress;

  if (goal.direction === "decrease") {
    progress = ((goal.start - goal.current) / (goal.start - goal.target)) * 100;
  } else {
    progress = ((goal.current - goal.start) / (goal.target - goal.start)) * 100;
  }

  if (progress < 0) progress = 0;
  if (progress > 100) progress = 100;
  goal.progress = Math.round(progress);
}

function getWorkoutTotals(workouts) {
  let totalCalories = 0;
  let completedCount = 0;

  workouts.forEach((workout) => {
    if (workout.done) {
      totalCalories += workout.calories;
      completedCount += 1;
    }
  });

  return { totalCalories, completedCount };
}

export const listWorkouts = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("workouts");

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    const totals = getWorkoutTotals(user.workouts);

    return res.status(200).json({
      workouts: user.workouts,
      totalCalories: totals.totalCalories,
      completedCount: totals.completedCount,
    });
  } catch (error) {
    console.error("List workouts error:", error);
    return res.status(500).json({ message: "Could not load workouts." });
  }
};

export const createWorkout = async (req, res) => {
  try {
    const { name, calories, durationMinutes } = req.body;
    const calorieValue = Number(calories);
    const durationValue = Number(durationMinutes);

    if (
      typeof name !== "string" ||
      !name.trim() ||
      name.trim().length > 100 ||
      !Number.isFinite(calorieValue) ||
      calorieValue < 0 ||
      !Number.isFinite(durationValue) ||
      durationValue <= 0
    ) {
      return res.status(400).json({ message: "Enter a workout name, calories, and a valid duration." });
    }

    const user = await User.findById(req.userId);

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    user.workouts.push({
      name: name.trim(),
      calories: calorieValue,
      durationMinutes: durationValue,
      done: false,
    });
    await user.save();

    return res.status(201).json({
      workout: user.workouts[user.workouts.length - 1],
    });
  } catch (error) {
    console.error("Create workout error:", error);
    return res.status(500).json({ message: "Could not create workout." });
  }
};

export const toggleWorkout = async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({ message: "Invalid workout id." });
    }

    const user = await User.findById(req.userId);

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    const workout = user.workouts.id(req.params.id);

    if (!workout) {
      return res.status(404).json({ message: "Workout not found." });
    }

    workout.done = !workout.done;
    workout.completedAt = workout.done ? new Date() : null;
    const calorieChange = workout.done ? workout.calories : -workout.calories;

    user.goals.forEach((goal) => {
      const unit = (goal.unit || "").toLowerCase();
      const isCalorieGoal =
        goal.type === "calories" || ["kcal", "cal", "calories"].includes(unit);

      if (!isCalorieGoal) return;

      goal.current = Math.max(0, goal.current + calorieChange);
      updateCalorieGoalProgress(goal);
    });

    await user.save();

    const totals = getWorkoutTotals(user.workouts);

    return res.status(200).json({
      workout,
      goals: user.goals,
      totalCalories: totals.totalCalories,
      completedCount: totals.completedCount,
    });
  } catch (error) {
    console.error("Toggle workout error:", error);
    return res.status(500).json({ message: "Could not update workout." });
  }
};
