import { useState } from 'react';
import './Auth.css';
import {
  registerUser,
  loginUser,
  fetchCurrentUser,
} from '../services/api';

export default function Auth({ initialMode = 'login', onBack, onAuthenticated }) {
  const [isLoginView, setIsLoginView] = useState(initialMode !== 'signup');

  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  const [regData, setRegData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    age: '',
    height: '',
    weight: '',
    goal: '',
  });

  const handleRegInput = (e) => {
    setRegData({
      ...regData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await loginUser({
        email: loginEmail,
        password: loginPassword,
      });

      const { token } = response.data;

      localStorage.setItem('token', token);

      const userResponse = await fetchCurrentUser();

      onAuthenticated?.(userResponse.data.user);
    } catch (error) {
      alert(
        error.response?.data?.message ||
          'Login failed. Please check your email and password.'
      );
    }
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();

    if (regData.password !== regData.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    try {
      const response = await registerUser({
        name: regData.name,
        email: regData.email,
        password: regData.password,
        age: Number(regData.age),
        height: Number(regData.height),
        weight: Number(regData.weight),
        fitnessGoal: regData.goal,
      });

      alert(response.data.message);

      setIsLoginView(true);
      setLoginEmail(regData.email);
      setLoginPassword('');
    } catch (error) {
      alert(
        error.response?.data?.message ||
          'Registration failed. Please try again.'
      );
    }
  };

  return (
    <div className="auth-container">
      {onBack && (
        <button type="button" onClick={onBack} className="toggle-btn">
          Back to home
        </button>
      )}

      <div className="auth-header">
        <img
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuDqbO3NDSeq7NljSJkZkgEce9cZlv08cDb09ISGTiWBqWskpOyW1Bz4FdFMGatsj5s-0uXblPLxfiXuwqitpOPRwP45fOAKDqguZPYR9jSyrzIIRH-dmZyyCpbQCQvp4__ETwcS_EA-9eLIgoJcEA0CzwaF7U_71JB8ojRkF7BNd-pWHFNxYZM0SuPp0yZinNU7IURF4LIa-7Soa9_UXNYubCOR6JBOyX-IASCLwpj3PbU67QS7Z4S3"
          alt="Ascend Fitness Logo"
          className="auth-logo"
        />

        <h2>{isLoginView ? 'Welcome back' : 'Set up your profile'}</h2>

        <p>
          {isLoginView
            ? 'Continue your wellness journey.'
            : 'Start your personalized fitness path today.'}
        </p>
      </div>

      <div className="auth-card">
        {isLoginView ? (
          <form onSubmit={handleLoginSubmit} className="auth-form">
            <div className="form-group">
              <label>Email address</label>
              <input
                type="email"
                required
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                required
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
              />
            </div>

            <button type="submit" className="submit-btn">
              Sign In
            </button>

            <p className="toggle-text">
              New to Ascend?{' '}
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
          <form onSubmit={handleRegisterSubmit} className="auth-form">
            <div className="form-group">
              <label>Full Name</label>
              <input
                type="text"
                name="name"
                value={regData.name}
                required
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
                  min="1"
                  max="120"
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
                <option value="">Select your goal</option>
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

            <button type="submit" className="submit-btn">
              Complete Registration
            </button>

            <p className="toggle-text">
              Already have an account?{' '}
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
