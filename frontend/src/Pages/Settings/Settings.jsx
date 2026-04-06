import { useState } from "react";
import { motion } from "framer-motion";
import { 
  FaCog, FaUser, FaBell, FaPalette, FaShieldAlt, 
  FaLanguage, FaSave, FaCheckCircle
} from "react-icons/fa";
import "./Settings.css";

export default function Settings() {
  const [saved, setSaved] = useState(false);
  const [settings, setSettings] = useState({
    name: "",
    email: "",
    notifications: true,
    emailNotifications: false,
    theme: "dark",
    language: "en",
    dataSharing: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSettings({
      ...settings,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSave = (e) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100 }
    }
  };

  return (
    <div className="settings-page">
      <div className="settings-header">
        <div className="header-content">
          <FaCog className="header-icon" />
          <div>
            <h1 className="settings-title">Settings</h1>
            <p className="settings-subtitle">Manage your account and preferences</p>
          </div>
        </div>
      </div>

      <motion.div 
        className="settings-container"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <form onSubmit={handleSave} className="settings-form">
          {/* Profile Settings */}
          <motion.div className="settings-section" variants={itemVariants}>
            <div className="section-header">
              <FaUser className="section-icon" />
              <h2 className="section-title">Profile Information</h2>
            </div>
            
            <div className="settings-grid">
              <div className="form-group">
                <label className="form-label">Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={settings.name}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="Enter your name"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={settings.email}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="your@email.com"
                />
              </div>
            </div>
          </motion.div>

          {/* Notification Settings */}
          <motion.div className="settings-section" variants={itemVariants}>
            <div className="section-header">
              <FaBell className="section-icon" />
              <h2 className="section-title">Notifications</h2>
            </div>
            
            <div className="settings-list">
              <div className="setting-item">
                <div className="setting-info">
                  <h3 className="setting-name">Push Notifications</h3>
                  <p className="setting-description">Receive notifications about your assessments</p>
                </div>
                <label className="toggle-switch">
                  <input
                    type="checkbox"
                    name="notifications"
                    checked={settings.notifications}
                    onChange={handleChange}
                  />
                  <span className="toggle-slider"></span>
                </label>
              </div>

              <div className="setting-item">
                <div className="setting-info">
                  <h3 className="setting-name">Email Notifications</h3>
                  <p className="setting-description">Get weekly wellness reports via email</p>
                </div>
                <label className="toggle-switch">
                  <input
                    type="checkbox"
                    name="emailNotifications"
                    checked={settings.emailNotifications}
                    onChange={handleChange}
                  />
                  <span className="toggle-slider"></span>
                </label>
              </div>
            </div>
          </motion.div>

          {/* Appearance Settings */}
          <motion.div className="settings-section" variants={itemVariants}>
            <div className="section-header">
              <FaPalette className="section-icon" />
              <h2 className="section-title">Appearance</h2>
            </div>
            
            <div className="settings-grid">
              <div className="form-group">
                <label className="form-label">Theme</label>
                <select
                  name="theme"
                  value={settings.theme}
                  onChange={handleChange}
                  className="form-select"
                >
                  <option value="dark">Dark</option>
                  <option value="light">Light</option>
                  <option value="auto">Auto</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Language</label>
                <select
                  name="language"
                  value={settings.language}
                  onChange={handleChange}
                  className="form-select"
                >
                  <option value="en">English</option>
                  <option value="es">Spanish</option>
                  <option value="fr">French</option>
                  <option value="de">German</option>
                </select>
              </div>
            </div>
          </motion.div>

          {/* Privacy Settings */}
          <motion.div className="settings-section" variants={itemVariants}>
            <div className="section-header">
              <FaShieldAlt className="section-icon" />
              <h2 className="section-title">Privacy & Security</h2>
            </div>
            
            <div className="settings-list">
              <div className="setting-item">
                <div className="setting-info">
                  <h3 className="setting-name">Data Sharing</h3>
                  <p className="setting-description">Share anonymous data to improve our services</p>
                </div>
                <label className="toggle-switch">
                  <input
                    type="checkbox"
                    name="dataSharing"
                    checked={settings.dataSharing}
                    onChange={handleChange}
                  />
                  <span className="toggle-slider"></span>
                </label>
              </div>
            </div>
          </motion.div>

          {/* Save Button */}
          <motion.div className="form-actions" variants={itemVariants}>
            <button type="submit" className="save-btn">
              {saved ? (
                <>
                  <FaCheckCircle />
                  Saved Successfully!
                </>
              ) : (
                <>
                  <FaSave />
                  Save Changes
                </>
              )}
            </button>
          </motion.div>
        </form>
      </motion.div>
    </div>
  );
}
