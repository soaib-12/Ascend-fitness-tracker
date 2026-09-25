import mongoose from "mongoose";

const goalSchema = new mongoose.Schema({
  type: { type: String, default: "goal", trim: true },
  title: { type: String, required: true, trim: true, maxlength: 100 },
  current: { type: Number, required: true },
  start: { type: Number, required: true },
  target: { type: Number, required: true },
  unit: { type: String, required: true, trim: true, maxlength: 20 },
  direction: { type: String, enum: ["increase", "decrease"], required: true },
  progress: { type: Number, min: 0, max: 100, required: true },
  completedAt: { type: Date, default: null },
  targetText: String,
  footerIcon: String,
  footerText: String,
  icon: String,
}, { timestamps: true });

const workoutSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true, maxlength: 100 },
  calories: { type: Number, required: true, min: 0 },
  durationMinutes: { type: Number, default: 0, min: 0 },
  done: { type: Boolean, default: false },
  completedAt: { type: Date, default: null },
  completionDate: { type: String, default: "" },
  completionHistory: { type: [String], default: [] },
}, { timestamps: true });

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 50,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    },

    password: {
      type: String,
      required: true,
      minlength: 8,
      maxlength: 128,
    },

    age: {
      type: Number,
      required: true,
      min: 13,
      max: 120,
      validate: {
        validator: Number.isInteger,
        message: "Age must be a whole number.",
      },
    },

    height: {
      type: Number,
      required: true,
      min: 50,
      max: 250,
    },

    weight: {
      type: Number,
      required: true,
      min: 20,
      max: 500,
    },

    waterIntake: {
      type: Number,
      default: 0,
      min: 0,
    },

    waterDate: {
      type: String,
      default: "",
    },

    bmi: {
      type: Number,
      min: 0,
      max: 100,
    },

    fitnessGoal: {
      type: String,
      required: true,
      enum: [
        "full_transformation",
        "weight_loss",
        "mass_gain",
      ],
    },
    goals: { type: [goalSchema], default: [] },
    workouts: { type: [workoutSchema], default: [] },
  },
  {
    timestamps: true,
  }
);

// module.exports = mongoose.model("User", userSchema);
const User = mongoose.model("User", userSchema);

export default User;
