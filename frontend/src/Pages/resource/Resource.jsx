import { useState, useEffect } from "react";
import { FaPhone, FaComments, FaExternalLinkAlt, FaHeart, FaUsers, FaBook, FaShieldAlt, FaGraduationCap, FaSun, FaMoon } from "react-icons/fa";
import { motion } from "framer-motion";
import "./resource.css";

export default function Resource() {
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

  const emergencyResources = [
    {
      name: "988 Suicide & Crisis Lifeline",
      description: "24/7 free and confidential support for people in distress",
      contact: "Call or text 988",
      link: "tel:988",
      icon: <FaPhone />,
      color: "#ef4444"
    },
    {
      name: "Crisis Text Line",
      description: "Text-based support available 24/7",
      contact: "Text HOME to 741741",
      link: "sms:741741&body=HOME",
      icon: <FaComments />,
      color: "#f59e0b"
    }
  ];

  const mentalHealthResources = [
    {
      name: "National Alliance on Mental Illness (NAMI)",
      description: "Education, support, and advocacy for mental health",
      url: "https://www.nami.org/Home",
      icon: <FaUsers />,
      color: "#6366f1"
    },
    {
      name: "MentalHealth.gov",
      description: "Comprehensive mental health information and resources",
      url: "https://www.mentalhealth.gov/",
      icon: <FaBook />,
      color: "#14b8a6"
    },
    {
      name: "Active Minds",
      description: "Student mental health awareness and education",
      url: "https://www.activeminds.org/",
      icon: <FaHeart />,
      color: "#ec4899"
    },
    {
      name: "The Jed Foundation",
      description: "Protecting emotional health and preventing suicide for teens and young adults",
      url: "https://jedfoundation.org/",
      icon: <FaShieldAlt />,
      color: "#a855f7"
    }
  ];

  const campusResources = [
    {
      name: "Campus Counseling Services",
      description: "Most universities offer free or low-cost counseling services to students",
      action: "Contact your student health center",
      icon: <FaGraduationCap />
    },
    {
      name: "Student Wellness Programs",
      description: "Many campuses provide wellness workshops, support groups, and stress management programs",
      action: "Check your university's wellness center",
      icon: <FaHeart />
    },
    {
      name: "Academic Support Services",
      description: "Academic advisors and support services can help manage academic stress",
      action: "Visit your academic advising office",
      icon: <FaBook />
    }
  ];

  return (
    <div className="resources-page">
      <div className="resources-topbar">
        <div className="topbar-left">
          <h1 className="page-title">Resources</h1>
          <p className="page-subtitle">Find support and guidance for your mental health journey</p>
        </div>
        <button onClick={toggleTheme} className="theme-toggle-btn" aria-label="Toggle theme">
          {theme === 'light' ? <FaMoon /> : <FaSun />}
        </button>
      </div>

      <div className="resources-container">
        <motion.div 
          className="resources-hero"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="hero-badge">
            <FaHeart />
            <span>You're Not Alone</span>
          </div>
          <h2 className="hero-title">Help is Available 24/7</h2>
          <p className="hero-description">
            Reach out to any of these trusted resources. Taking the first step towards getting help is a sign of strength.
          </p>
        </motion.div>

        <section className="resources-section emergency-section">
          <div className="section-header">
            <div className="section-badge emergency-badge">
              <FaPhone />
              <span>Emergency Support</span>
            </div>
            <h2 className="section-title">Immediate Help</h2>
            <p className="section-description">
              If you're in crisis or need immediate support, these resources are available 24/7.
            </p>
          </div>
          
          <div className="resources-grid emergency-grid">
            {emergencyResources.map((resource, index) => (
              <motion.a
                key={index}
                href={resource.link}
                className="resource-card emergency-card"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -4, scale: 1.02 }}
              >
                <div className="resource-icon-wrapper" style={{ background: `${resource.color}15` }}>
                  <div className="resource-icon" style={{ color: resource.color }}>
                    {resource.icon}
                  </div>
                </div>
                <div className="resource-content">
                  <h3 className="resource-name">{resource.name}</h3>
                  <p className="resource-description">{resource.description}</p>
                  <div className="resource-contact">{resource.contact}</div>
                </div>
                <div className="resource-arrow">→</div>
              </motion.a>
            ))}
          </div>
        </section>

        <section className="resources-section">
          <div className="section-header">
            <div className="section-badge">
              <FaHeart />
              <span>Mental Health Organizations</span>
            </div>
            <h2 className="section-title">National Resources</h2>
            <p className="section-description">
              Trusted organizations providing information, support, and advocacy for mental health.
            </p>
          </div>
          
          <div className="resources-grid">
            {mentalHealthResources.map((resource, index) => (
              <motion.a
                key={index}
                href={resource.url}
                target="_blank"
                rel="noopener noreferrer"
                className="resource-card"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -4 }}
              >
                <div className="resource-icon-wrapper" style={{ background: `${resource.color}15` }}>
                  <div className="resource-icon" style={{ color: resource.color }}>
                    {resource.icon}
                  </div>
                </div>
                <div className="resource-content">
                  <h3 className="resource-name">
                    {resource.name}
                    <FaExternalLinkAlt className="external-icon" />
                  </h3>
                  <p className="resource-description">{resource.description}</p>
                </div>
              </motion.a>
            ))}
          </div>
        </section>

        <section className="resources-section">
          <div className="section-header">
            <div className="section-badge">
              <FaGraduationCap />
              <span>Campus Support</span>
            </div>
            <h2 className="section-title">On-Campus Resources</h2>
            <p className="section-description">
              Take advantage of the mental health and wellness resources available at your university.
            </p>
          </div>
          
          <div className="campus-resources">
            {campusResources.map((resource, index) => (
              <motion.div
                key={index}
                className="campus-card"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ x: 4 }}
              >
                <div className="campus-icon">
                  {resource.icon}
                </div>
                <div className="campus-content">
                  <h3 className="campus-name">{resource.name}</h3>
                  <p className="campus-description">{resource.description}</p>
                  <div className="campus-action">{resource.action}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        <div className="info-grid">
          <motion.div
            className="info-card"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
          >
            <div className="info-icon">
              <FaHeart />
            </div>
            <h3 className="info-title">Remember</h3>
            <ul className="info-list">
              <li>Seeking help is a sign of strength, not weakness</li>
              <li>Mental health is just as important as physical health</li>
              <li>Recovery is possible with the right support</li>
              <li>You deserve to feel better</li>
            </ul>
          </motion.div>
          
          <motion.div
            className="warning-card"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
          >
            <div className="warning-icon-wrapper">
              <FaPhone className="warning-icon" />
            </div>
            <h3 className="warning-title">In Case of Emergency</h3>
            <p className="warning-text">
              If you or someone you know is in immediate danger, please call 911 or go to your nearest emergency room.
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
