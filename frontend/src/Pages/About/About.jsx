import { useState, useEffect } from "react";
import { FaBrain, FaShieldAlt, FaChartLine, FaHeart, FaLock, FaUserShield, FaCode, FaRobot, FaSun, FaMoon, FaCheckCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import "./about.css";

export default function About() {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'dark';
  });

  useEffect(() => {
    document.documentElement.className = theme === 'light' ? 'light-theme' : 'dark-theme';
  }, [theme]);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  };

  const features = [
    {
      icon: <FaBrain />,
      title: "AI-Powered Analysis",
      description: "Our ensemble machine learning model combines multiple algorithms to provide highly accurate assessments.",
      color: "#6366f1"
    },
    {
      icon: <FaShieldAlt />,
      title: "Privacy First",
      description: "Your data is never stored. All assessments are processed in real-time and immediately discarded.",
      color: "#10b981"
    },
    {
      icon: <FaChartLine />,
      title: "Evidence-Based",
      description: "Built on established psychological research and validated assessment tools.",
      color: "#14b8a6"
    },
    {
      icon: <FaHeart />,
      title: "Student-Focused",
      description: "Designed specifically for the unique mental health challenges faced by students.",
      color: "#ec4899"
    }
  ];

  const techStack = [
    { name: "Machine Learning", tech: "Ensemble Learning (Soft Voting)", icon: <FaRobot /> },
    { name: "Backend", tech: "Flask & Python", icon: <FaCode /> },
    { name: "Frontend", tech: "React & Vite", icon: <FaCode /> },
    { name: "Styling", tech: "Modern CSS3", icon: <FaCode /> }
  ];

  const privacyPoints = [
    {
      icon: <FaUserShield />,
      title: "No Data Storage",
      description: "Your assessment data is never saved or stored on our servers."
    },
    {
      icon: <FaShieldAlt />,
      title: "Completely Anonymous",
      description: "We don't collect any personally identifiable information."
    },
    {
      icon: <FaLock />,
      title: "Secure Processing",
      description: "All data is processed securely and discarded immediately after assessment."
    }
  ];

  return (
    <div className="about-page">
      <div className="about-topbar">
        <div className="topbar-left">
          <h1 className="page-title">About</h1>
          <p className="page-subtitle">Learn more about MindCare and our mission</p>
        </div>
        <button onClick={toggleTheme} className="theme-toggle-btn" aria-label="Toggle theme">
          {theme === 'light' ? <FaMoon /> : <FaSun />}
        </button>
      </div>

      <div className="about-container">
        <motion.section
          className="about-hero"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="hero-badge">
            <FaBrain />
            <span>About MindCare</span>
          </div>
          <h2 className="hero-title">Empowering Students Through Technology</h2>
          <p className="hero-lead">
            MindCare is a web application that uses machine learning models to help students 
            gain valuable insights into their mental wellness and stress levels. We combine 
            ensemble learning techniques with evidence-based psychology to provide accessible, 
            confidential support.
          </p>
        </motion.section>

        <motion.section
          className="mission-section"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <div className="mission-card">
            <h2 className="mission-title">Our Mission</h2>
            <p className="mission-text">
              We believe that mental health support should be accessible, immediate, and stigma-free. 
              MindCare provides students with a safe space to assess their mental wellness and 
              connect with resources—all without judgment or barriers.
            </p>
          </div>
        </motion.section>

        <section className="features-section">
          <div className="section-header">
            <h2 className="section-title">What Makes Us Different</h2>
            <p className="section-description">
              Combining cutting-edge technology with compassionate care
            </p>
          </div>
          <div className="features-grid">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="feature-card"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -4 }}
              >
                <div className="feature-icon-wrapper" style={{ background: `${feature.color}15` }}>
                  <div className="feature-icon" style={{ color: feature.color }}>
                    {feature.icon}
                  </div>
                </div>
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-description">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </section>

        <section className="privacy-section">
          <motion.div
            className="privacy-card"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
          >
            <div className="privacy-header">
              <div className="privacy-icon-large">
                <FaLock />
              </div>
              <h2 className="privacy-title">Your Privacy Matters</h2>
              <p className="privacy-subtitle">
                We take your privacy seriously. Here's how we protect your information.
              </p>
            </div>
            <div className="privacy-grid">
              {privacyPoints.map((point, index) => (
                <motion.div
                  key={index}
                  className="privacy-point"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                >
                  <div className="point-icon-wrapper">
                    {point.icon}
                  </div>
                  <div className="point-content">
                    <h4 className="point-title">{point.title}</h4>
                    <p className="point-description">{point.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        <section className="tech-section">
          <div className="section-header">
            <h2 className="section-title">Built With Modern Technology</h2>
            <p className="section-description">
              Powered by state-of-the-art machine learning and web technologies
            </p>
          </div>
          <div className="tech-grid">
            {techStack.map((item, index) => (
              <motion.div
                key={index}
                className="tech-card"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
              >
                <div className="tech-icon-wrapper">
                  {item.icon}
                </div>
                <div className="tech-content">
                  <h4 className="tech-name">{item.name}</h4>
                  <p className="tech-detail">{item.tech}</p>
                </div>
              </motion.div>
            ))}
          </div>
          <motion.div
            className="tech-note"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <FaRobot className="note-icon" />
            <p>
              Our ensemble machine learning model uses soft voting to combine predictions from multiple 
              algorithms, providing more accurate and reliable mental health assessments.
            </p>
          </motion.div>
        </section>

        <section className="disclaimer-section">
          <motion.div
            className="disclaimer-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h3 className="disclaimer-title">Important Disclaimer</h3>
            <ul className="disclaimer-list">
              <li>
                <FaCheckCircle className="list-icon" />
                <div>
                  <strong>Not a Diagnosis:</strong> MindCare assessments are not medical diagnoses 
                  and should not be used as a substitute for professional medical advice.
                </div>
              </li>
              <li>
                <FaCheckCircle className="list-icon" />
                <div>
                  <strong>Educational Purpose:</strong> This tool is designed for educational and 
                  awareness purposes to help students understand their mental wellness.
                </div>
              </li>
              <li>
                <FaCheckCircle className="list-icon" />
                <div>
                  <strong>Seek Professional Help:</strong> If you're experiencing mental health 
                  concerns, please consult with a qualified mental health professional.
                </div>
              </li>
              <li>
                <FaCheckCircle className="list-icon" />
                <div>
                  <strong>Emergency Situations:</strong> In case of emergency, call 911 or 988 
                  (Suicide & Crisis Lifeline) immediately.
                </div>
              </li>
            </ul>
          </motion.div>
        </section>

        <motion.section
          className="cta-section"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
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
        </motion.section>
      </div>
    </div>
  );
}
