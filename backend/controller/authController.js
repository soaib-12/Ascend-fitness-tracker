const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../model/user");

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const ALLOWED_GOALS = [
  "full_transformation",
  "weight_loss",
  "mass_gain",
];

const signup = async (req, res) => {
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


const login = async (req, res) => {
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


const getMe = async (req, res) => {
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


const logout = async (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  });

  return res.status(200).json({
    message: "Logged out successfully.",
  });
};


module.exports = {
  signup,
  login,
  getMe,
  logout,
};