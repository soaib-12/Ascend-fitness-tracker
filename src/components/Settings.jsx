import { useState } from 'react';
import './Settings.css';


export default function Settings({ user, onUpdateUser, onBack }) {
  const [profile, setProfile] = useState({
    name: user?.name || 'User',
    email: user?.email || 'user@example.com',
    height: user?.height || '175',
    weight: user?.weight ?? '',
    goal: user?.goal || 'full_transformation',
    notifications: true,
  });

  // State to track field-level error messages
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    // Prevent invalid keypresses for h and w
    if (name === 'height' || name === 'weight') {
      if (type === 'number' && value.includes('.')) return;
    }

    setProfile((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));

    // Clear field error as user types
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const validate = () => {
    const newErrors = {};

    // Name validation
if (!profile.name.trim()) {
  newErrors.name = 'Full name is required.';
} else {
  const name = profile.name.trim();

  for (let i = 0; i < name.length; i++) {
    const ch = name[i];

    if (
      !(ch >= 'A' && ch <= 'Z') &&
      !(ch >= 'a' && ch <= 'z') &&
      ch !== ' '
    ) {
      newErrors.name = 'Name must contain letters only (no numbers).';
      break;
    }
  }
}

    // Email validation
if (!profile.email.trim()) {
  newErrors.email = 'Email address is required.';
} else {
  const email = profile.email.trim();

  const atPos = email.indexOf('@');
  const dotPos = email.lastIndexOf('.');

  if (
    atPos <= 0 ||
    dotPos <= atPos + 1 ||
    dotPos === email.length - 1
  ) {
    newErrors.email = 'Please enter a valid email address.';
  }
}

    //Height validation
    const heightNum = Number(profile.height);
    if (!profile.height || isNaN(heightNum) || heightNum <= 0 || !Number.isInteger(heightNum)) {
      newErrors.height = 'Height must be a positive integer.';
    }

    //Weight validation
    const weightNum = Number(profile.weight);
    if (!profile.weight || isNaN(weightNum) || weightNum <= 0 || !Number.isInteger(weightNum)) {
      newErrors.weight = 'Weight must be a positive integer.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    try {
      await onUpdateUser?.({
        ...profile,
        height: Number(profile.height),
        weight: Number(profile.weight),
      });
      alert("Weight updated successfully!");
    } catch (error) {
      alert(error.response?.data?.message || "Could not save settings. Please try again.");
    }
  };

  return (
    <div className="settings-container">
      <div className="settings-header">
        <h1>Account Settings</h1>
        {onBack && (
          <button type="button" onClick={onBack} className="back-btn">
            ← Back
          </button>
        )}
      </div>

      <form onSubmit={handleSubmit} noValidate>
        <div className="settings-card">
          <h2>Personal Details</h2>
          <div className="settings-form">
            <div className="settings-group">
              <label>Full Name</label>
              <input
                type="text"
                name="name"
                value={profile.name}
                onChange={handleChange}
              />
              {errors.name && <span className="error-text">{errors.name}</span>}
            </div>
            <div className="settings-group">
              <label>Email Address</label>
              <input
                type="email"
                name="email"
                value={profile.email}
                onChange={handleChange}
              />
              {errors.email && <span className="error-text">{errors.email}</span>}
            </div>
          </div>
        </div>

        <div className="settings-card">
          <h2>Body & Goals</h2>
          <div className="settings-form">
            <div className="settings-row">
              <div className="settings-group" style={{ flex: 1 }}>
                <label>Height (cm)</label>
                <input
                  type="number"
                  name="height"
                  min="1"
                  step="1"
                  value={profile.height}
                  onChange={handleChange}
                />
                {errors.height && <span className="error-text">{errors.height}</span>}
              </div>
              <div className="settings-group" style={{ flex: 1 }}>
                <label>Weight (kg)</label>
                <input
                  type="number"
                  name="weight"
                  min="1"
                  step="1"
                  value={profile.weight}
                  onChange={handleChange}
                />
                {errors.weight && <span className="error-text">{errors.weight}</span>}
              </div>
            </div>

            <div className="settings-group">
              <label>Fitness Goal</label>
              <select name="goal" value={profile.goal} onChange={handleChange}>
                <option value="full_transformation">Full Body Transformation</option>
                <option value="weight_loss">Weight Loss</option>
                <option value="mass_gain">Mass Gain</option>
              </select>
            </div>
          </div>
        </div>

        <div className="settings-card">
          <h2>Preferences</h2>
          <div className="settings-form">
            <div className="toggle-group">
              <label htmlFor="notifications">Email Notifications</label>
              <input
                id="notifications"
                type="checkbox"
                name="notifications"
                checked={profile.notifications}
                onChange={handleChange}
              />
            </div>
          </div>
          <button type="submit" className="save-btn">
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
}
