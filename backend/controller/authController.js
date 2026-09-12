import bcrypt from "bcryptjs";
import User from "../model/user.js";
import jwt from "jsonwebtoken";
export const signup = async (req, res) => {
    try {
        const { name, email, password, age, height, weight, fitnessGoal } = req.body;
            const existingUser = await User.findOne({ email });

                if (existingUser) {
                    return res.status(400).json({
                    message: "User already exists",
                });
            }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            age,
            height,
            weight,
            fitnessGoal,
        });

        res.status(201).json({
            message: "User created successfully",
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
        res.status(500).json({
            message: "Signup failed",
            error: error.message,
        });
    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({
                message: "Invalid email or password",
            });
        }

        const isPasswordCorrect = await bcrypt.compare(
            password,
            user.password
        );

        if (!isPasswordCorrect) {
            return res.status(400).json({
                message: "Invalid email or password",
            });
        }

        const token = jwt.sign(
    { id: user._id },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
);

res.cookie("token", token, {
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000
});

res.json({
    message: "Login successful",
    user: {
        id: user._id,
        name: user.name,
        email: user.email,
    },
});
    } catch (error) {
        res.status(500).json({
            message: "Login failed",
            error: error.message,
        });
    }
};

export const getMe = async (req, res) => {
    try {
        const user = await User.findById(req.userId).select("-password");

        if (!user) {
            return res.status(404).json({
                message: "User not found",
            });
        }

        res.status(200).json({
            message: "User profile fetched successfully",
            user,
        });
    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch user profile",
            error: error.message,
        });
    }
};

export const logout = (req, res) => {
    res.clearCookie("token", {
        httpOnly: true,
    });

    return res.status(200).json({
        message: "Logout successful",
    });
};