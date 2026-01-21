import { Link } from "react-router-dom";
import { FaArrowRight, FaShieldAlt, FaBrain, FaChartLine, FaUsers } from "react-icons/fa";
import "./Home.css";

export default function Home() {
  return (
    <div className="home-page">
      <section className="hero-section">
        <div className="hero-content">
          <div className="hero-badge">
           
            <span>Mental Health & Stress Prediction in Students</span>
          </div>
          
          <h1 className="hero-title">
            Welcome to <span className="gradient-text">MindCare</span>
          </h1>
          
          <p className="hero-description">
            A simple tool to help students understand their mental health better. 
            Answer a few questions and get instant insights about your wellbeing.
          </p>
          
          <div className="hero-actions">
            <Link to="/predict" className="btn btn-primary">
              Take Assessment
              <FaArrowRight className="btn-icon" />
            </Link>
            <Link to="/resources" className="btn btn-secondary">
              Resources
            </Link>
          </div>
          
          <div className="hero-stats">
            <div className="stat-item">
              <FaShieldAlt className="stat-icon" />
              <div className="stat-content">
                <span className="stat-number">100%</span>
                <span className="stat-label">Private</span>
              </div>
            </div>
            <div className="stat-item">
              <FaChartLine className="stat-icon" />
              <div className="stat-content">
                <span className="stat-number">Quick</span>
                <span className="stat-label">Results</span>
              </div>
            </div>
            <div className="stat-item">
              <FaUsers className="stat-icon" />
              <div className="stat-content">
                <span className="stat-number">Free</span>
                <span className="stat-label">Always</span>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <section className="features-section">
        <h2 className="section-title">How It Works</h2>
        
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon feature-icon-1">
              <FaBrain />
            </div>
            <h3 className="feature-title">Quick Assessment</h3>
            <p className="feature-description">
              Fill out a simple form about your daily life, sleep, and mood. Takes just 2 minutes.
            </p>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon feature-icon-2">
              <FaShieldAlt />
            </div>
            <h3 className="feature-title">Your Privacy Matters</h3>
            <p className="feature-description">
              Nothing is saved. Your answers are used only for the prediction and then deleted.
            </p>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon feature-icon-3">
              <FaChartLine />
            </div>
            <h3 className="feature-title">Get Helpful Tips</h3>
            <p className="feature-description">
              Receive personalized suggestions and resources based on your results.
            </p>
          </div>
        </div>
      </section>
      
      <section className="cta-section">
        <div className="cta-content">
          <h2 className="cta-title">Ready to Check In?</h2>
          <p className="cta-description">
            Take a moment to understand how you're doing. It's free, private, and takes less than 5 minutes.
          </p>
          <Link to="/predict" className="btn btn-primary btn-large">
            Start Now
            <FaArrowRight className="btn-icon" />
          </Link>
        </div>
      </section>
    </div>
  );
}
