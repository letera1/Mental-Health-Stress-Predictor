import { FaBrain, FaShieldAlt, FaChartLine, FaHeart, FaLock, FaUserShield, FaCode, FaRobot } from "react-icons/fa";
import { Link } from "react-router-dom";
import "./about.css";

export default function About() {
  const features = [
    {
      icon: <FaBrain />,
      title: "AI-Powered Analysis",
      description: "Our ensemble machine learning model combines multiple algorithms to provide highly accurate assessments."
    },
    {
      icon: <FaShieldAlt />,
      title: "Privacy First",
      description: "Your data is never stored. All assessments are processed in real-time and immediately discarded."
    },
    {
      icon: <FaChartLine />,
      title: "Evidence-Based",
      description: "Built on established psychological research and validated assessment tools."
    },
    {
      icon: <FaHeart />,
      title: "Student-Focused",
      description: "Designed specifically for the unique mental health challenges faced by students."
    }
  ];

  const techStack = [
    { name: "Machine Learning", tech: "Ensemble Learning (Soft Voting)" },
    { name: "Backend", tech: "Flask & Python" },
    { name: "Frontend", tech: "React & Vite" },
    { name: "Styling", tech: "Modern CSS3" }
  ];

  return (
    <div className="about-page">
      <section className="about-hero">
        <div className="about-hero-content">
          <div className="hero-badge">
           
            <span>About MindCare</span>
          </div>
          <h1 className="about-title">Empowering Students Through Technology</h1>
          <p className="about-lead">
            MindCare is a web application that uses machine learning models to help students 
            gain valuable insights into their mental wellness and stress levels. We combine 
            ensemble learning techniques with evidence-based psychology to provide accessible, 
            confidential support.
          </p>
        </div>
      </section>

      <section className="about-mission">
        <div className="mission-content">
          <h2 className="section-title">Our Mission</h2>
          <p className="mission-text">
            We believe that mental health support should be accessible, immediate, and stigma-free. 
            MindCare provides students with a safe space to assess their mental wellness and 
            connect with resources—all without judgment or barriers.
          </p>
        </div>
      </section>

      <section className="about-features">
        <h2 className="section-title">What Makes Us Different</h2>
        <div className="features-grid">
          {features.map((feature, index) => (
            <div key={index} className="feature-item">
              <div className="feature-icon-wrapper">
                {feature.icon}
              </div>
              <h3 className="feature-title">{feature.title}</h3>
              <p className="feature-description">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="about-privacy">
        <div className="privacy-card">
          <div className="privacy-icon">
            <FaLock />
          </div>
          <div className="privacy-content">
            <h2 className="privacy-title">Your Privacy Matters</h2>
            <div className="privacy-points">
              <div className="privacy-point">
                <FaUserShield className="point-icon" />
                <div>
                  <h4>No Data Storage</h4>
                  <p>Your assessment data is never saved or stored on our servers.</p>
                </div>
              </div>
              <div className="privacy-point">
                <FaShieldAlt className="point-icon" />
                <div>
                  <h4>Completely Anonymous</h4>
                  <p>We don't collect any personally identifiable information.</p>
                </div>
              </div>
              <div className="privacy-point">
                <FaLock className="point-icon" />
                <div>
                  <h4>Secure Processing</h4>
                  <p>All data is processed securely and discarded immediately after assessment.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="about-tech">
        <h2 className="section-title">Built With Modern Technology</h2>
        <div className="tech-grid">
          {techStack.map((item, index) => (
            <div key={index} className="tech-item">
              <FaCode className="tech-icon" />
              <div className="tech-content">
                <h4 className="tech-name">{item.name}</h4>
                <p className="tech-detail">{item.tech}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="tech-note">
          <FaRobot className="note-icon" />
          <p>
            Our ensemble machine learning model uses soft voting to combine predictions from multiple 
            algorithms, providing more accurate and reliable mental health assessments.
          </p>
        </div>
      </section>

      <section className="about-disclaimer">
        <div className="disclaimer-card">
          <h3 className="disclaimer-title">Important Disclaimer</h3>
          <ul className="disclaimer-list">
            <li>
              <strong>Not a Diagnosis:</strong> MindCare assessments are not medical diagnoses 
              and should not be used as a substitute for professional medical advice.
            </li>
            <li>
              <strong>Educational Purpose:</strong> This tool is designed for educational and 
              awareness purposes to help students understand their mental wellness.
            </li>
            <li>
              <strong>Seek Professional Help:</strong> If you're experiencing mental health 
              concerns, please consult with a qualified mental health professional.
            </li>
            <li>
              <strong>Emergency Situations:</strong> In case of emergency, call 911 or 988 
              (Suicide & Crisis Lifeline) immediately.
            </li>
          </ul>
        </div>
      </section>

      <section className="about-cta">
        <div className="cta-card">
          <h2 className="cta-title">Ready to Get Started?</h2>
          <p className="cta-text">
            Take the first step towards understanding your mental wellness.
          </p>
          <div className="cta-buttons">
            <Link to="/predict" className="cta-btn cta-btn-primary">
              Start Assessment
            </Link>
            <Link to="/resources" className="cta-btn cta-btn-secondary">
              View Resources
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
