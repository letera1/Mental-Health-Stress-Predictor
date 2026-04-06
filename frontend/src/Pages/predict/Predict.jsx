import { useState } from "react";
import { motion } from "framer-motion";
import { 
  FaBrain, FaUser, FaGraduationCap, FaHeartbeat, 
  FaMoon, FaRunning, FaSmile, FaCheckCircle, 
  FaExclamationTriangle, FaSpinner, FaArrowRight
} from "react-icons/fa";
import ResultCard from "../../Components/ResultCard/ResultCard";
import "./predict.css";

const initialForm = {
  Age: "",
  Gender: "",
  GPA: "",
  Stress_Level: "",
  Anxiety_Score: "",
  Depression_Score: "",
  Sleep_Hours: "",
  Steps_Per_Day: "",
  Mood_Description: "",
  Sentiment_Score: "0",
};

const genderOptions = [
  { label: "Male", value: 1 },
  { label: "Female", value: 0 },
];

const moodOptions = [
  { label: "😊 Happy", value: 0 },
  { label: "😢 Sad", value: 1 },
  { label: "😰 Anxious", value: 2 },
  { label: "😴 Tired", value: 3 },
  { label: "😌 Relaxed", value: 4 },
  { label: "😫 Stressed", value: 5 },
  { label: "💪 Motivated", value: 6 },
];

export default function Predict() {
  const [form, setForm] = useState(initialForm);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setResult(null);
    setLoading(true);

    const data = {};
    for (let key in initialForm) {
      data[key] = key === "Sentiment_Score" ? parseFloat(form[key]) : Number(form[key]);
    }
    
    try {
      const response = await fetch("http://localhost:5001/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const res = await response.json();
      if (response.ok) {
        setResult(res.prediction);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        setError(res.error || "Something went wrong. Please try again.");
      }
    } catch (err) {
      setError("Can't connect to server. Make sure the backend is running.");
    } finally {
      setLoading(false);
    }
  };

  const progressPercentage = (Object.values(form).filter(v => v !== "").length / Object.keys(form).length) * 100;

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
    <div className="predict-page">
      {/* Header */}
      <div className="predict-header">
        <div className="header-content">
          <motion.div 
            className="header-icon"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200 }}
          >
            <FaBrain />
          </motion.div>
          <h1 className="predict-title">Mental Health Assessment</h1>
          <p className="predict-subtitle">
            Take a comprehensive assessment to understand your mental wellness
          </p>
        </div>

        {/* Progress Bar */}
        <div className="progress-container">
          <div className="progress-bar">
            <motion.div 
              className="progress-fill"
              initial={{ width: 0 }}
              animate={{ width: `${progressPercentage}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
          <span className="progress-text">{Math.round(progressPercentage)}% Complete</span>
        </div>
      </div>

      <motion.div 
        className="predict-container"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {result !== null && <ResultCard prediction={result} />}

        <form onSubmit={handleSubmit} className="predict-form">
          {/* Personal Information */}
          <motion.div className="form-section" variants={itemVariants}>
            <div className="section-header">
              <FaUser className="section-icon" />
              <h2 className="section-title">Personal Information</h2>
            </div>
            
            <div className="form-grid">
              <div className="form-group">
                <label htmlFor="Age" className="form-label">Age</label>
                <input
                  id="Age"
                  type="number"
                  name="Age"
                  value={form.Age}
                  onChange={handleChange}
                  required
                  min="17"
                  max="45"
                  className="form-input"
                  placeholder="Enter your age"
                />
                <span className="form-hint">Age between 17-45 years</span>
              </div>

              <div className="form-group">
                <label htmlFor="Gender" className="form-label">Gender</label>
                <div className="radio-group">
                  {genderOptions.map((option) => (
                    <label key={option.value} className="radio-label">
                      <input
                        type="radio"
                        name="Gender"
                        value={option.value}
                        checked={form.Gender === String(option.value)}
                        onChange={handleChange}
                        required
                        className="radio-input"
                      />
                      <span className="radio-custom"></span>
                      <span className="radio-text">{option.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="GPA" className="form-label">
                  <FaGraduationCap className="label-icon" />
                  GPA
                </label>
                <input
                  id="GPA"
                  type="number"
                  name="GPA"
                  value={form.GPA}
                  onChange={handleChange}
                  required
                  step="0.01"
                  min="1"
                  max="4"
                  className="form-input"
                  placeholder="0.00"
                />
                <span className="form-hint">Grade Point Average (1.00 - 4.00)</span>
              </div>
            </div>
          </motion.div>

          {/* Mental Health Indicators */}
          <motion.div className="form-section" variants={itemVariants}>
            <div className="section-header">
              <FaHeartbeat className="section-icon" />
              <h2 className="section-title">Mental Health Indicators</h2>
            </div>
            
            <div className="form-grid">
              <div className="form-group">
                <label htmlFor="Stress_Level" className="form-label">Stress Level</label>
                <div className="slider-container">
                  <input
                    id="Stress_Level"
                    type="range"
                    name="Stress_Level"
                    value={form.Stress_Level || 1}
                    onChange={handleChange}
                    required
                    min="1"
                    max="5"
                    className="form-slider"
                  />
                  <div className="slider-value">{form.Stress_Level || 1}/5</div>
                </div>
                <div className="slider-labels">
                  <span>Low</span>
                  <span>Moderate</span>
                  <span>High</span>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="Anxiety_Score" className="form-label">Anxiety Score</label>
                <input
                  id="Anxiety_Score"
                  type="number"
                  name="Anxiety_Score"
                  value={form.Anxiety_Score}
                  onChange={handleChange}
                  required
                  min="0"
                  max="21"
                  className="form-input"
                  placeholder="0-21"
                />
                <span className="form-hint">0 = None, 21 = Severe</span>
              </div>

              <div className="form-group">
                <label htmlFor="Depression_Score" className="form-label">Depression Score</label>
                <input
                  id="Depression_Score"
                  type="number"
                  name="Depression_Score"
                  value={form.Depression_Score}
                  onChange={handleChange}
                  required
                  min="0"
                  max="27"
                  className="form-input"
                  placeholder="0-27"
                />
                <span className="form-hint">0 = None, 27 = Severe</span>
              </div>
            </div>
          </motion.div>

          {/* Lifestyle Factors */}
          <motion.div className="form-section" variants={itemVariants}>
            <div className="section-header">
              <FaMoon className="section-icon" />
              <h2 className="section-title">Lifestyle Factors</h2>
            </div>
            
            <div className="form-grid">
              <div className="form-group">
                <label htmlFor="Sleep_Hours" className="form-label">
                  <FaMoon className="label-icon" />
                  Sleep Hours
                </label>
                <input
                  id="Sleep_Hours"
                  type="number"
                  name="Sleep_Hours"
                  value={form.Sleep_Hours}
                  onChange={handleChange}
                  required
                  step="0.5"
                  min="3"
                  max="9"
                  className="form-input"
                  placeholder="0.0"
                />
                <span className="form-hint">Average hours per night (3-9)</span>
              </div>

              <div className="form-group">
                <label htmlFor="Steps_Per_Day" className="form-label">
                  <FaRunning className="label-icon" />
                  Daily Steps
                </label>
                <input
                  id="Steps_Per_Day"
                  type="number"
                  name="Steps_Per_Day"
                  value={form.Steps_Per_Day}
                  onChange={handleChange}
                  required
                  min="2000"
                  max="12000"
                  className="form-input"
                  placeholder="0"
                />
                <span className="form-hint">Steps per day (2,000 - 12,000)</span>
              </div>
            </div>
          </motion.div>

          {/* Mood & Sentiment */}
          <motion.div className="form-section" variants={itemVariants}>
            <div className="section-header">
              <FaSmile className="section-icon" />
              <h2 className="section-title">Mood & Sentiment</h2>
            </div>
            
            <div className="form-grid">
              <div className="form-group full-width">
                <label htmlFor="Mood_Description" className="form-label">Current Mood</label>
                <div className="mood-grid">
                  {moodOptions.map((mood) => (
                    <label key={mood.value} className="mood-option">
                      <input
                        type="radio"
                        name="Mood_Description"
                        value={mood.value}
                        checked={form.Mood_Description === String(mood.value)}
                        onChange={handleChange}
                        required
                        className="mood-input"
                      />
                      <span className="mood-card">
                        {mood.label}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="form-group full-width">
                <label htmlFor="Sentiment_Score" className="form-label">
                  Overall Sentiment: {form.Sentiment_Score}
                </label>
                <div className="slider-container">
                  <input
                    id="Sentiment_Score"
                    type="range"
                    name="Sentiment_Score"
                    value={form.Sentiment_Score}
                    onChange={handleChange}
                    required
                    min="-1"
                    max="1"
                    step="0.1"
                    className="form-slider sentiment-slider"
                  />
                </div>
                <div className="slider-labels">
                  <span>Very Negative</span>
                  <span>Neutral</span>
                  <span>Very Positive</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Submit Button */}
          <motion.div className="form-actions" variants={itemVariants}>
            <button type="submit" disabled={loading} className="submit-btn">
              {loading ? (
                <>
                  <FaSpinner className="spinner" />
                  Analyzing...
                </>
              ) : (
                <>
                  <FaCheckCircle />
                  Get Assessment
                  <FaArrowRight />
                </>
              )}
            </button>
          </motion.div>
        </form>

        {error && (
          <motion.div 
            className="error-box"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <FaExclamationTriangle className="error-icon" />
            <p>{error}</p>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
