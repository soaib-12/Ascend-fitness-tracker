import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../model/user.js";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const ALLOWED_GOALS = [
  "full_transformation",
  "weight_loss",
  "mass_gain",
];

export const signup = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      age,
      height,
      weight,
      fitnessGoal,
    } = req.body;

    // Validate name
    if (
      typeof name !== "string" ||
      name.trim().length < 2 ||
      name.trim().length > 50
    ) {
      return res.status(400).json({
        message: "Name must be between 2 and 50 characters.",
      });
    }

    // Validate email
    if (
      typeof email !== "string" ||
      !EMAIL_REGEX.test(email.trim())
    ) {
      return res.status(400).json({
        message: "Please provide a valid email address.",
      });
    }

    // Validate password
    if (
      typeof password !== "string" ||
      password.length < 8 ||
      password.length > 128
    ) {
      return res.status(400).json({
        message: "Password must be between 8 and 128 characters.",
      });
    }

    // Validate age
    const parsedAge = Number(age);

    if (
      !Number.isInteger(parsedAge) ||
      parsedAge < 13 ||
      parsedAge > 120
    ) {
      return res.status(400).json({
        message: "Age must be between 13 and 120.",
      });
    }

    // Validate height
    const parsedHeight = Number(height);

    if (
      !Number.isFinite(parsedHeight) ||
      parsedHeight < 50 ||
      parsedHeight > 250
    ) {
      return res.status(400).json({
        message: "Height must be between 50 and 250 cm.",
      });
    }

    // Validate weight
    const parsedWeight = Number(weight);

    if (
      !Number.isFinite(parsedWeight) ||
      parsedWeight < 20 ||
      parsedWeight > 500
    ) {
      return res.status(400).json({
        message: "Weight must be between 20 and 500 kg.",
      });
    }

    // Validate fitness goal
    if (!ALLOWED_GOALS.includes(fitnessGoal)) {
      return res.status(400).json({
        message: "Invalid fitness goal.",
      });
    }

    const normalizedName = name.trim();
    const normalizedEmail = email.trim().toLowerCase();

    // Check duplicate email
    const existingUser = await User.findOne({
      email: normalizedEmail,
    });

    if (existingUser) {
      return res.status(409).json({
        message: "An account with this email already exists.",
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create user
    const user = await User.create({
      name: normalizedName,
      email: normalizedEmail,
      password: hashedPassword,
      age: parsedAge,
      height: parsedHeight,
      weight: parsedWeight,
      fitnessGoal,
    });

    return res.status(201).json({
      message: "Account created successfully.",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        age: user.age,
        height: user.height,
        weight: user.weight,
        fitnessGoal: user.fitnessGoal,
      },
    });
  } catch (error) {
    console.error("Signup error:", error);

    return res.status(500).json({
      message: "Something went wrong while creating your account.",
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate email
    if (
      typeof email !== "string" ||
      !EMAIL_REGEX.test(email.trim())
    ) {
      return res.status(400).json({
        message: "Please provide a valid email address.",
      });
    }

    // Validate password
    if (
      typeof password !== "string" ||
      password.length === 0
    ) {
      return res.status(400).json({
        message: "Password is required.",
      });
    }

    const normalizedEmail = email.trim().toLowerCase();

    // Find user
    const user = await User.findOne({
      email: normalizedEmail,
    });

    if (!user) {
      return res.status(401).json({
        message: "Invalid email or password.",
      });
    }

    // Compare passwords
    const passwordMatches = await bcrypt.compare(
      password,
      user.password
    );

    if (!passwordMatches) {
      return res.status(401).json({
        message: "Invalid email or password.",
      });
    }

    // Create JWT
    const token = jwt.sign(
      {
        id: user._id,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );

    // Store JWT in HTTP-only cookie
    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      maxAge: 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({
      message: "Login successful.",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        age: user.age,
        height: user.height,
        weight: user.weight,
        fitnessGoal: user.fitnessGoal,
      },
    });
  } catch (error) {
    console.error("Login error:", error);

    return res.status(500).json({
      message: "Something went wrong while logging in.",
    });
  }
};

export const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("-password");

    if (!user) {
      return res.status(404).json({
        message: "User not found.",
      });
    }

    return res.status(200).json({
      user,
    });
  } catch (error) {
    console.error("Get user error:", error);

    return res.status(500).json({
      message: "Something went wrong.",
    });
  }
};

export const updateWeight = async (req, res) => {
  try {
    const weight = Number(req.body.weight);

    if (!Number.isFinite(weight) || weight < 20 || weight > 500) {
      return res.status(400).json({
        message: "Weight must be between 20 and 500 kg.",
      });
    }

    const user = await User.findById(req.userId);

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    user.weight = weight;
    await user.save();

    return res.status(200).json({ weight: user.weight });
  } catch (error) {
    console.error("Update weight error:", error);
    return res.status(500).json({ message: "Could not update weight." });
  }
};

export const logWater = async (req, res) => {
  try {
    const amount = Number(req.body.amount);
    const date = req.body.date;
    const parsedDate = new Date(`${date}T00:00:00.000Z`);

    if (
      !Number.isFinite(amount) ||
      amount <= 0 ||
      typeof date !== "string" ||
      !/^\d{4}-\d{2}-\d{2}$/.test(date) ||
      Number.isNaN(parsedDate.getTime()) ||
      parsedDate.toISOString().slice(0, 10) !== date
    ) {
      return res.status(400).json({ message: "Enter a valid water amount and date." });
    }

    const user = await User.findById(req.userId);

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    if (user.waterDate !== date) {
      user.waterIntake = 0;
      user.waterDate = date;
    }

    user.waterIntake = Math.round((user.waterIntake + amount) * 100) / 100;
    await user.save();

    return res.status(200).json({
      waterIntake: user.waterIntake,
      waterDate: user.waterDate,
    });
  } catch (error) {
    console.error("Log water error:", error);
    return res.status(500).json({ message: "Could not save water intake." });
  }
};

export const clearWater = async (req, res) => {
  try {
    const date = req.body.date;
    const parsedDate = new Date(`${date}T00:00:00.000Z`);
    if (
      typeof date !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(date) ||
      Number.isNaN(parsedDate.getTime()) || parsedDate.toISOString().slice(0, 10) !== date
    ) {
      return res.status(400).json({ message: "Enter a valid date." });
    }

    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    user.waterIntake = 0;
    user.waterDate = date;
    await user.save();

    return res.status(200).json({ waterIntake: user.waterIntake, waterDate: user.waterDate });
  } catch (error) {
    console.error("Clear water error:", error);
    return res.status(500).json({ message: "Could not clear water intake." });
  }
};

export const updateBmi = async (req, res) => {
  try {
    const bmi = Number(req.body.bmi);

    if (!Number.isFinite(bmi) || bmi <= 0 || bmi > 100) {
      return res.status(400).json({ message: "Enter a valid BMI value." });
    }

    const user = await User.findById(req.userId);

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    user.bmi = Math.round(bmi * 10) / 10;
    await user.save();

    return res.status(200).json({ bmi: user.bmi });
  } catch (error) {
    console.error("Update BMI error:", error);
    return res.status(500).json({ message: "Could not save BMI." });
  }
};

export const clearBmi = async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    user.bmi = undefined;
    await user.save();
    return res.status(200).json({ message: "BMI cleared." });
  } catch (error) {
    console.error("Clear BMI error:", error);
    return res.status(500).json({ message: "Could not clear BMI." });
  }
};

export const logout = async (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  });

  return res.status(200).json({
    message: "Logged out successfully.",
  });
};
