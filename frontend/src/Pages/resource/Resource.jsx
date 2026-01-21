import { FaPhone, FaComments, FaExternalLinkAlt, FaHeart, FaUsers, FaBook } from "react-icons/fa";
import "./resource.css";

export default function Resource() {
  const emergencyResources = [
    {
      name: "988 Suicide & Crisis Lifeline",
      description: "24/7 free and confidential support for people in distress",
      contact: "Call or text 988",
      link: "tel:988",
      icon: <FaPhone />
    },
    {
      name: "Crisis Text Line",
      description: "Text-based support available 24/7",
      contact: "Text HOME to 741741",
      link: "sms:741741&body=HOME",
      icon: <FaComments />
    }
  ];

  const mentalHealthResources = [
    {
      name: "National Alliance on Mental Illness (NAMI)",
      description: "Education, support, and advocacy for mental health",
      url: "https://www.nami.org/Home",
      icon: <FaUsers />
    },
    {
      name: "MentalHealth.gov",
      description: "Comprehensive mental health information and resources",
      url: "https://www.mentalhealth.gov/",
      icon: <FaBook />
    },
    {
      name: "Active Minds",
      description: "Student mental health awareness and education",
      url: "https://www.activeminds.org/",
      icon: <FaHeart />
    },
    {
      name: "The Jed Foundation",
      description: "Protecting emotional health and preventing suicide for teens and young adults",
      url: "https://jedfoundation.org/",
      icon: <FaHeart />
    }
  ];

  const campusResources = [
    {
      name: "Campus Counseling Services",
      description: "Most universities offer free or low-cost counseling services to students",
      action: "Contact your student health center"
    },
    {
      name: "Student Wellness Programs",
      description: "Many campuses provide wellness workshops, support groups, and stress management programs",
      action: "Check your university's wellness center"
    },
    {
      name: "Academic Support Services",
      description: "Academic advisors and support services can help manage academic stress",
      action: "Visit your academic advising office"
    }
  ];

  return (
    <div className="resources-page">
      <div className="resources-header">
        <h1 className="resources-title">Mental Health Resources</h1>
        <p className="resources-subtitle">
          You're not alone. Help is available 24/7. Reach out to any of these trusted resources.
        </p>
      </div>

      <section className="resources-section emergency-section">
        <div className="section-badge emergency-badge">
          <FaPhone />
          <span>Emergency Support</span>
        </div>
        <h2 className="section-title">Immediate Help</h2>
        <p className="section-description">
          If you're in crisis or need immediate support, these resources are available 24/7.
        </p>
        
        <div className="resources-grid">
          {emergencyResources.map((resource, index) => (
            <a 
              key={index}
              href={resource.link}
              className="resource-card emergency-card"
            >
              <div className="resource-icon emergency-icon">
                {resource.icon}
              </div>
              <div className="resource-content">
                <h3 className="resource-name">{resource.name}</h3>
                <p className="resource-description">{resource.description}</p>
                <div className="resource-contact">{resource.contact}</div>
              </div>
            </a>
          ))}
        </div>
      </section>

      <section className="resources-section">
        <div className="section-badge">
          <FaHeart />
          <span>Mental Health Organizations</span>
        </div>
        <h2 className="section-title">National Resources</h2>
        <p className="section-description">
          Trusted organizations providing information, support, and advocacy for mental health.
        </p>
        
        <div className="resources-grid">
          {mentalHealthResources.map((resource, index) => (
            <a 
              key={index}
              href={resource.url}
              target="_blank"
              rel="noopener noreferrer"
              className="resource-card"
            >
              <div className="resource-icon">
                {resource.icon}
              </div>
              <div className="resource-content">
                <h3 className="resource-name">
                  {resource.name}
                  <FaExternalLinkAlt className="external-icon" />
                </h3>
                <p className="resource-description">{resource.description}</p>
              </div>
            </a>
          ))}
        </div>
      </section>

      <section className="resources-section">
        <div className="section-badge">
          <FaUsers />
          <span>Campus Support</span>
        </div>
        <h2 className="section-title">On-Campus Resources</h2>
        <p className="section-description">
          Take advantage of the mental health and wellness resources available at your university.
        </p>
        
        <div className="campus-resources">
          {campusResources.map((resource, index) => (
            <div key={index} className="campus-card">
              <h3 className="campus-name">{resource.name}</h3>
              <p className="campus-description">{resource.description}</p>
              <div className="campus-action">{resource.action}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="info-section">
        <div className="info-card">
          <h3 className="info-title">Remember</h3>
          <ul className="info-list">
            <li>Seeking help is a sign of strength, not weakness</li>
            <li>Mental health is just as important as physical health</li>
            <li>Recovery is possible with the right support</li>
            <li>You deserve to feel better</li>
          </ul>
        </div>
        
        <div className="warning-card">
          <FaPhone className="warning-icon" />
          <h3 className="warning-title">In Case of Emergency</h3>
          <p className="warning-text">
            If you or someone you know is in immediate danger, please call 911 or go to your nearest emergency room.
          </p>
        </div>
      </section>
    </div>
  );
}
