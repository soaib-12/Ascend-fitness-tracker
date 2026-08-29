import './LandingPage.css';

export default function LandingPage({ onNavigate }) {
  return (
    <div className="landing-container">
      {/* Navbar */}
      <header className="landing-header">
        <div className="nav-content">
          <div className="brand-logo">Ascend</div>
          <nav className="nav-links">
            <a href="#features">Features</a>
            <a href="#about">About</a>
          </nav>
          <div className="nav-actions">
            <button 
              onClick={() => onNavigate('login')} 
              className="btn-secondary"
            >
              Sign In
            </button>
            <button 
              onClick={() => onNavigate('signup')} 
              className="btn-primary"
            >
              Get Started
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="landing-main">
        {/* Hero Section */}
        <section className="hero-section">
          <h1 className="hero-title">
            Track your fitness. Understand your progress. Reach your goals.
          </h1>
          <p className="hero-description">
            The all-in-one platform for recording workouts, monitoring health, and achieving your fitness targets with absolute clarity.
          </p>
          <div className="hero-actions">
            <button 
              onClick={() => onNavigate('signup')} 
              className="btn-primary btn-large"
            >
              Get Started
            </button>
            <button 
              onClick={() => onNavigate('login')} 
              className="btn-secondary btn-large"
            >
              Sign In
            </button>
          </div>

          {/* <div className="hero-preview">
            <img 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAB2FiTLlZUschVw-f2vnsWGOgQGKY7uGPVS1hyBivHOvqgbOISXa7lV14jTpWebtMi66rWgUd-AQRt0C9gEeo4KnLP7IEHHOI8Rw-tIb56SO1QDV6cz3ttTqkYkugcSO1YxLv8PJjeMy_212rdpVmruQuRtoGhqKl-LoHYsPARbeM8g4-LFJAO02ogbyo-9HCoLAQJWtLFONRiVMnAiSAjKAA9cqWc_nDfFFVrXAeKQ8daFVfdK8c7" 
              alt="Ascend Dashboard Preview" 
            />
          </div> */}
        </section>

        {/* Features */}
        <section className="features-section" id="features">
          <div className="section-header">
            <h2>Intelligent Tracking</h2>
            <p>Everything you need to maintain momentum, organized perfectly.</p>
          </div>
          <div className="bento-grid">
            <div className="card card-large">
              <div>
                {/* <div className="icon-badge"></div> */}
                <h3>Progress Analytics</h3>
                <p>Visualize your journey with clarity. Our advanced analytics break down your performance over time.</p>
              </div>
            </div>

            <div className="card card-medium">
              <h3>Workout Tracking</h3>
              <p>Log sets, reps, and routines effortlessly with our frictionless interface.</p>
            </div>

            <div className="card card-medium">
              <h3>Health Tracking</h3>
              <p>Monitor vitals, sleep, and recovery metrics alongside your active routines.</p>
            </div>

            <div className="card card-half">
              <h3>Goal Tracking</h3>
              <p>Set specific targets and let Ascend map the trajectory to reach them.</p>
            </div>

            <div className="card card-half">
              <h3>Calorie Tracking</h3>
              <p>Understand your energy balance with simple, intuitive nutritional logging.</p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="cta-section">
          <div className="cta-card">
            <h2>Ready to elevate your wellness?</h2>
            <p>Join Ascend Today and start building a healthier, more organized life.</p>
            <button 
              onClick={() => onNavigate('signup')} 
              className="btn-cta"
            >
              Join Ascend Today
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}