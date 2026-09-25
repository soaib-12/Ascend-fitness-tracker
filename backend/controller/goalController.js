import mongoose from "mongoose";
import User from "../model/user.js";

// Calculate progress between the starting value and the target value.
function calculateProgress(current, start, target, direction) {
  let progress;

  if (direction === "decrease") {
    progress = ((start - current) / (start - target)) * 100;
  } else {
    progress = ((current - start) / (target - start)) * 100;
  }

  // Progress should always stay between 0% and 100%.
  return Math.round(Math.max(0, Math.min(progress, 100)));
}

// Check that the submitted values make a valid goal.
function isValidGoal(title, current, start, target, unit, direction) {
  const valuesAreNumbers = [current, start, target].every((value) =>
    Number.isFinite(Number(value))
  );
  const titleIsValid =
    typeof title === "string" && title.trim().length > 0 && title.trim().length <= 100;
  const unitIsValid =
    typeof unit === "string" && unit.trim().length > 0 && unit.trim().length <= 20;
  const directionIsValid = direction === "increase" || direction === "decrease";

  if (!valuesAreNumbers || !titleIsValid || !unitIsValid || !directionIsValid) {
    return false;
  }

  if (direction === "increase") {
    return Number(target) > Number(start);
  }

  return Number(target) < Number(start);
}

export const listGoals = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("goals");

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    return res.status(200).json({ goals: user.goals });
  } catch (error) {
    console.error("List goals error:", error);
    return res.status(500).json({ message: "Could not load goals." });
  }
};

export const createGoal = async (req, res) => {
  try {
    const { title, current, target, unit, direction } = req.body;
    const start = direction === "decrease" ? Number(current) : 0;

    if (!isValidGoal(title, current, start, target, unit, direction)) {
      return res.status(400).json({
        message: "Enter a title, values, unit, and a target in the selected direction.",
      });
    }

    const user = await User.findById(req.userId);

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    const unitName = unit.trim().toLowerCase();
    const isWeightGoal = unitName === "kg";
    const isCalorieGoal = ["kcal", "cal", "calories"].includes(unitName);
    const goal = {
      title: title.trim(),
      current: Number(current),
      start,
      target: Number(target),
      unit: unit.trim(),
      direction,
      type: isWeightGoal ? "weight" : isCalorieGoal ? "calories" : "goal",
      icon: isWeightGoal ? "scale" : isCalorieGoal ? "flame" : "flag",
      progress: calculateProgress(Number(current), start, Number(target), direction),
    };

    // Store the new goal inside the logged-in user's record.
    user.goals.push(goal);
    await user.save();

    const savedGoal = user.goals[user.goals.length - 1];
    return res.status(201).json({ goal: savedGoal });
  } catch (error) {
    console.error("Create goal error:", error);
    return res.status(500).json({ message: "Could not create goal." });
  }
};

export const updateGoal = async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({ message: "Invalid goal id." });
    }

    const user = await User.findById(req.userId);

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    const goal = user.goals.id(req.params.id);

    if (!goal) {
      return res.status(404).json({ message: "Goal not found." });
    }

    // Keep existing values for fields that were not sent in the request.
    const title = req.body.title ?? goal.title;
    const current = Number(req.body.current ?? goal.current);
    const target = Number(req.body.target ?? goal.target);
    const unit = req.body.unit ?? goal.unit;
    const direction = req.body.direction ?? goal.direction;
    let start = goal.start;

    // If the direction changes, begin measuring progress from the current value.
    if (direction !== goal.direction) {
      start = direction === "decrease" ? current : 0;
    }

    if (!isValidGoal(title, current, start, target, unit, direction)) {
      return res.status(400).json({
        message: "Enter valid values and a target in the selected direction.",
      });
    }

    goal.title = title.trim();
    goal.current = current;
    goal.start = start;
    goal.target = target;
    goal.unit = unit.trim();
    const unitName = goal.unit.toLowerCase();
    const isWeightGoal = unitName === "kg";
    const isCalorieGoal = ["kcal", "cal", "calories"].includes(unitName);
    goal.type = isWeightGoal ? "weight" : isCalorieGoal ? "calories" : "goal";
    goal.icon = isWeightGoal ? "scale" : isCalorieGoal ? "flame" : "flag";
    goal.direction = direction;
    goal.progress = calculateProgress(current, start, target, direction);

    await user.save();
    return res.status(200).json({ goal });
  } catch (error) {
    console.error("Update goal error:", error);
    return res.status(500).json({ message: "Could not update goal." });
  }
};

export const deleteGoal = async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({ message: "Invalid goal id." });
    }

    const user = await User.findById(req.userId);

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    const goal = user.goals.id(req.params.id);

    if (!goal) {
      return res.status(404).json({ message: "Goal not found." });
    }

    goal.deleteOne();
    await user.save();

    return res.status(200).json({ message: "Goal deleted." });
  } catch (error) {
    console.error("Delete goal error:", error);
    return res.status(500).json({ message: "Could not delete goal." });
  }
};
