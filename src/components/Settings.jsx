import { useState } from 'react';
import './Settings.css';

export default function Settings({ user, onUpdateUser, onBack }) {
  const [profile, setProfile] = useState({
    name: user?.name || 'User',
    email: user?.email || 'user@example.com',
    height: user?.height || '175',
    weight: user?.weight || '70',
    goal: user?.goal || 'full_transformation',
    notifications: true,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProfile((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onUpdateUser) {
      onUpdateUser(profile);
    }
    alert('Settings saved successfully!');
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

      <form onSubmit={handleSubmit}>
        {/* Personal Details */}
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
            </div>
            <div className="settings-group">
              <label>Email Address</label>
              <input
                type="email"
                name="email"
                value={profile.email}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>

        {/* Physical Metrics */}
        <div className="settings-card">
          <h2>Body & Goals</h2>
          <div className="settings-form">
            <div className="settings-row">
              <div className="settings-group" style={{ flex: 1 }}>
                <label>Height (cm)</label>
                <input
                  type="number"
                  name="height"
                  value={profile.height}
                  onChange={handleChange}
                />
              </div>
              <div className="settings-group" style={{ flex: 1 }}>
                <label>Weight (kg)</label>
                <input
                  type="number"
                  name="weight"
                  value={profile.weight}
                  onChange={handleChange}
                />
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

        {/* Preferences */}
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