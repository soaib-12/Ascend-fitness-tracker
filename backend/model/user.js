const mongoose = require("mongoose");

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

    fitnessGoal: {
      type: String,
      required: true,
      enum: [
        "full_transformation",
        "weight_loss",
        "mass_gain",
      ],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);