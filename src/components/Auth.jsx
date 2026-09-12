
import { useState } from "react";
import "./Auth.css";
import {
  registerUser,
  loginUser,
  fetchCurrentUser,
} from "../services/api";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const ALLOWED_GOALS = [
  "full_transformation",
  "weight_loss",
  "mass_gain",
];

export default function Auth({
  initialMode = "login",
  onBack,
  onAuthenticated,
}) {
  const [isLoginView, setIsLoginView] = useState(
    initialMode !== "signup"
  );

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const [regData, setRegData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    age: "",
    height: "",
    weight: "",
    goal: "",
  });

  const handleRegInput = (e) => {
    setRegData({
      ...regData,
      [e.target.name]: e.target.value,
    });
  };

  // LOGIN
  const handleLoginSubmit = async (e) => {
    e.preventDefault();

    const normalizedEmail = loginEmail.trim().toLowerCase();

    // Validate email
    if (!EMAIL_REGEX.test(normalizedEmail)) {
      alert("Please enter a valid email address.");
      return;
    }

    // Validate password
    if (!loginPassword) {
      alert("Password is required.");
      return;
    }

    try {
      await loginUser({
        email: normalizedEmail,
        password: loginPassword,
      });

      const userResponse = await fetchCurrentUser();

      onAuthenticated?.(userResponse.data.user);
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Login failed. Please check your email and password."
      );
    }
  };

  // REGISTRATION
  const handleRegisterSubmit = async (e) => {
    e.preventDefault();

    const normalizedName = regData.name.trim();
    const normalizedEmail = regData.email.trim().toLowerCase();

    // Validate name
    if (
      normalizedName.length < 2 ||
      normalizedName.length > 50
    ) {
      alert("Name must be between 2 and 50 characters.");
      return;
    }

    // Validate email
    if (!EMAIL_REGEX.test(normalizedEmail)) {
      alert("Please enter a valid email address.");
      return;
    }

    // Validate password
    if (
      regData.password.length < 8 ||
      regData.password.length > 128
    ) {
      alert("Password must be between 8 and 128 characters.");
      return;
    }

    // Validate password confirmation
    if (regData.password !== regData.confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    // Convert number fields
    const parsedAge = Number(regData.age);
    const parsedHeight = Number(regData.height);
    const parsedWeight = Number(regData.weight);

    // Validate age
    if (
      !Number.isInteger(parsedAge) ||
      parsedAge < 13 ||
      parsedAge > 120
    ) {
      alert("Age must be a whole number between 13 and 120.");
      return;
    }

    // Validate height
    if (
      !Number.isFinite(parsedHeight) ||
      parsedHeight < 50 ||
      parsedHeight > 250
    ) {
      alert("Height must be between 50 and 250 cm.");
      return;
    }

    // Validate weight
    if (
      !Number.isFinite(parsedWeight) ||
      parsedWeight < 20 ||
      parsedWeight > 500
    ) {
      alert("Weight must be between 20 and 500 kg.");
      return;
    }

    // Validate fitness goal
    if (!ALLOWED_GOALS.includes(regData.goal)) {
      alert("Please select a valid fitness goal.");
      return;
    }

    try {
      const response = await registerUser({
        name: normalizedName,
        email: normalizedEmail,
        password: regData.password,
        age: parsedAge,
        height: parsedHeight,
        weight: parsedWeight,
        fitnessGoal: regData.goal,
      });

      alert(response.data.message);

      // Switch to login
      setIsLoginView(true);

      // Put normalized email into login field
      setLoginEmail(normalizedEmail);

      // Clear password
      setLoginPassword("");
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Registration failed. Please try again."
      );
    }
  };

  return (
    <div className="auth-container">
      {onBack && (
        <button
          type="button"
          onClick={onBack}
          className="toggle-btn"
        >
          Back to home
        </button>
      )}

      <div className="auth-header">
        <img
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuDqbO3NDSeq7NljSJkZkgEce9cZlv08cDb09ISGTiWBqWskpOyW1Bz4FdFMGatsj5s-0uXblPLxfiXuwqitpOPRwP45fOAKDqguZPYR9jSyrzIIRH-dmZyyCpbQCQvp4__ETwcS_EA-9eLIgoJcEA0CzwaF7U_71JB8ojRkF7BNd-pWHFNxYZM0SuPp0yZinNU7IURF4LIa-7Soa9_UXNYubCOR6JBOyX-IASCLwpj3PbU67QS7Z4S3"
          alt="Ascend Fitness Logo"
          className="auth-logo"
        />

        <h2>
          {isLoginView
            ? "Welcome back"
            : "Set up your profile"}
        </h2>

        <p>
          {isLoginView
            ? "Continue your wellness journey."
            : "Start your personalized fitness path today."}
        </p>
      </div>

      <div className="auth-card">
        {isLoginView ? (
          <form
            onSubmit={handleLoginSubmit}
            className="auth-form"
          >
            <div className="form-group">
              <label>Email address</label>

              <input
                type="email"
                required
                value={loginEmail}
                onChange={(e) =>
                  setLoginEmail(e.target.value)
                }
                placeholder="you@example.com"
              />
            </div>

            <div className="form-group">
              <label>Password</label>

              <input
                type="password"
                required
                value={loginPassword}
                onChange={(e) =>
                  setLoginPassword(e.target.value)
                }
              />
            </div>

            <button
              type="submit"
              className="submit-btn"
            >
              Sign In
            </button>

            <p className="toggle-text">
              New to Ascend?{" "}
              <button
                type="button"
                onClick={() => setIsLoginView(false)}
                className="toggle-btn"
              >
                Create an account
              </button>
            </p>
          </form>
        ) : (
          <form
            onSubmit={handleRegisterSubmit}
            className="auth-form"
          >
            <div className="form-group">
              <label>Full Name</label>

              <input
                type="text"
                name="name"
                value={regData.name}
                required
                minLength="2"
                maxLength="50"
                onChange={handleRegInput}
              />
            </div>

            <div className="form-group">
              <label>Email address</label>

              <input
                type="email"
                name="email"
                value={regData.email}
                required
                onChange={handleRegInput}
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Password</label>

                <input
                  type="password"
                  name="password"
                  value={regData.password}
                  required
                  minLength="8"
                  maxLength="128"
                  onChange={handleRegInput}
                />
              </div>

              <div className="form-group">
                <label>Confirm Password</label>

                <input
                  type="password"
                  name="confirmPassword"
                  value={regData.confirmPassword}
                  required
                  onChange={handleRegInput}
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Age</label>

                <input
                  type="number"
                  name="age"
                  min="13"
                  max="120"
                  step="1"
                  value={regData.age}
                  required
                  onChange={handleRegInput}
                />
              </div>

              <div className="form-group">
                <label>Height (cm)</label>

                <input
                  type="number"
                  name="height"
                  min="50"
                  max="250"
                  step="0.1"
                  value={regData.height}
                  required
                  onChange={handleRegInput}
                />
              </div>

              <div className="form-group">
                <label>Weight (kg)</label>

                <input
                  type="number"
                  name="weight"
                  min="20"
                  max="500"
                  step="0.1"
                  value={regData.weight}
                  required
                  onChange={handleRegInput}
                />
              </div>
            </div>

            <div className="form-group">
              <label>Fitness Goal</label>

              <select
                name="goal"
                value={regData.goal}
                required
                onChange={handleRegInput}
              >
                <option value="">
                  Select your goal
                </option>

                <option value="full_transformation">
                  Full Body Transformation
                </option>

                <option value="weight_loss">
                  Weight Loss
                </option>

                <option value="mass_gain">
                  Mass Gain
                </option>
              </select>
            </div>

            <button
              type="submit"
              className="submit-btn"
            >
              Complete Registration
            </button>

            <p className="toggle-text">
              Already have an account?{" "}
              <button
                type="button"
                onClick={() => setIsLoginView(true)}
                className="toggle-btn"
              >
                Sign in
              </button>
            </p>
          </form>
        )}
      </div>
    </div>
  );
}
