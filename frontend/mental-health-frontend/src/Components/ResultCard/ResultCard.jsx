import { FaCheckCircle, FaExclamationTriangle, FaExclamationCircle, FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import "./ResultCard.css";

export default function ResultCard({ prediction }) {
  const LABELS = {
    0: "Healthy",
    1: "At Risk",
    2: "Struggling",
  };

  const COLORS = {
    0: { bg: "#d1fae5", border: "#10b981", text: "#065f46" },
    1: { bg: "#fef3c7", border: "#f59e0b", text: "#92400e" },
    2: { bg: "#fee2e2", border: "#ef4444", text: "#991b1b" },
  };

  const ICONS = {
    0: <FaCheckCircle />,
    1: <FaExclamationTriangle />,
    2: <FaExclamationCircle />,
  };

  const MESSAGES = {
    0: {
      title: "Great News!",
      description: "Your assessment indicates healthy mental wellness. Keep up the excellent habits and continue prioritizing your well-being.",
      tips: [
        "Maintain your current sleep schedule",
        "Continue regular physical activity",
        "Keep engaging in activities you enjoy"
      ]
    },
    1: {
      title: "Attention Needed",
      description: "Your assessment shows some risk factors. It's important to take proactive steps to support your mental health.",
      tips: [
        "Consider talking to a counselor",
        "Review our mental health resources",
        "Focus on stress management techniques",
        "Ensure adequate sleep and exercise"
      ]
    },
    2: {
      title: "Immediate Support Recommended",
      description: "Your assessment indicates you may be struggling. Please reach out for professional support—your wellbeing matters.",
      tips: [
        "Contact a mental health professional immediately",
        "Reach out to campus counseling services",
        "Talk to someone you trust",
        "Call 988 for immediate crisis support"
      ]
    }
  };

  const currentColor = COLORS[prediction];
  const currentMessage = MESSAGES[prediction];

  return (
    <div className="result-card-container">
      <div 
        className="result-card" 
        style={{ 
          background: currentColor.bg,
          borderColor: currentColor.border,
          color: currentColor.text
        }}
      >
        <div className="result-header">
          <div className="result-icon" style={{ color: currentColor.border }}>
            {ICONS[prediction]}
          </div>
          <div className="result-status">
            <span className="result-label">Assessment Result</span>
            <h2 className="result-title">{LABELS[prediction]}</h2>
          </div>
        </div>

        <div className="result-content">
          <h3 className="result-message-title">{currentMessage.title}</h3>
          <p className="result-description">{currentMessage.description}</p>

          <div className="result-tips">
            <h4 className="tips-heading">Recommended Actions:</h4>
            <ul className="tips-list">
              {currentMessage.tips.map((tip, index) => (
                <li key={index}>{tip}</li>
              ))}
            </ul>
          </div>

          <div className="result-actions">
            <Link to="/resources" className="result-btn">
              View Resources
              <FaArrowRight />
            </Link>
            {prediction === 2 && (
              <a href="tel:988" className="result-btn result-btn-emergency">
                Call 988 Now
              </a>
            )}
          </div>
        </div>
      </div>

      <div className="result-disclaimer">
        <p>
          <strong>Disclaimer:</strong> This assessment is for educational purposes only and should not be used as a substitute for professional medical advice, diagnosis, or treatment. If you're experiencing a mental health crisis, please contact emergency services or call 988.
        </p>
      </div>
    </div>
  );
}
