import React from "react";
import "./Profile.css";

export default function Profile({ user }) {
  const goalLabels = {
    full_transformation: "Full Body Transformation",
    weight_loss: "Weight Loss",
    mass_gain: "Mass Gain",
  };

  const formattedGoal =
    goalLabels[user?.fitnessGoal] || user?.fitnessGoal || "General Fitness";

  return (
    <div className="profile-container">
      {/* Header Banner */}
      <div className="profile-header-card">
        <div className="profile-avatar">
          {user?.name ? user.name.charAt(0).toUpperCase() : "U"}
        </div>
        <div>
          <h2 className="profile-user-name">{user?.name || "User Profile"}</h2>
          <p className="profile-user-email">{user?.email || "No email provided"}</p>
        </div>
      </div>

      {/* Fitness Statistics Grid */}
      <div className="profile-section-title">Fitness Stats</div>
      <div className="profile-stats-grid">
        <div className="profile-stat-card">
          <span className="profile-stat-label">Age</span>
          <div className="profile-stat-value">
            {user?.age ? user.age : "—"}
            <span className="profile-stat-unit"> yrs</span>
          </div>
        </div>

        <div className="profile-stat-card">
          <span className="profile-stat-label">Height</span>
          <div className="profile-stat-value">
            {user?.height ? user.height : "—"}
            <span className="profile-stat-unit"> cm</span>
          </div>
        </div>

        <div className="profile-stat-card">
          <span className="profile-stat-label">Weight</span>
          <div className="profile-stat-value">
            {user?.weight ? user.weight : "—"}
            <span className="profile-stat-unit"> kg</span>
          </div>
        </div>

        <div className="profile-stat-card">
          <span className="profile-stat-label">Primary Goal</span>
          <div className="profile-goal-badge">{formattedGoal}</div>
        </div>
      </div>

      {/* Account Details */}
      <div className="profile-section-title">Account Details</div>
      <div className="profile-details-card">
        <div className="profile-detail-row">
          <span className="profile-detail-label">Member Since</span>
          <span className="profile-detail-value">{user?.date || "Recently Joined"}</span>
        </div>
        <div className="profile-detail-row">
          <span className="profile-detail-label">Account Status</span>
          <span className="profile-active-badge">Active</span>
        </div>
      </div>
    </div>
  );
}