import React, { useState } from "react";
import { FaSpinner, FaCheckCircle, FaExclamationTriangle } from "react-icons/fa";
import "./predict.css";
import ResultCard from "../../Components/ResultCard/ResultCard";

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
  Sentiment_Score: "",
};

const validationRules = {
  Age: { min: 17, max: 45, message: "Age must be between 17 and 45" },
  GPA: { min: 1.0, max: 4.0, message: "GPA must be between 1.00 and 4.00" },
  Stress_Level: { min: 1, max: 5, message: "Stress level must be between 1 and 5" },
  Anxiety_Score: { min: 0, max: 21, message: "Anxiety score must be between 0 and 21" },
  Depression_Score: { min: 0, max: 27, message: "Depression score must be between 0 and 27" },
  Sleep_Hours: { min: 3, max: 9, message: "Sleep hours must be between 3 and 9" },
  Steps_Per_Day: { min: 2000, max: 12000, message: "Steps per day must be between 2,000 and 12,000" },
  Sentiment_Score: { min: -1, max: 1, message: "Sentiment score must be between -1.00 and 1.00" },
};

const genderOptions = [
  { label: "Female", value: 0 },
  { label: "Male", value: 1 },
  { label: "Other", value: 2 },
];

const moodOptions = [
  { label: "Happy", value: 0 },
  { label: "Sad", value: 1 },
  { label: "Anxious", value: 2 },
  { label: "Tired", value: 3 },
  { label: "Relaxed", value: 4 },
  { label: "Stressed", value: 5 },
  { label: "Motivated", value: 6 },
];

export default function Predict() {
  const [form, setForm] = useState(initialForm);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [fieldErrors, setFieldErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validateField = (name, value) => {
    const rule = validationRules[name];
    if (!rule) return "";
    
    const numValue = parseFloat(value);
    if (isNaN(numValue)) return `Please enter a valid number`;
    if (numValue < rule.min || numValue > rule.max) return rule.message;
    return "";
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    
    if (fieldErrors[name]) {
      setFieldErrors({ ...fieldErrors, [name]: "" });
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    if (value && validationRules[name]) {
      const error = validateField(name, value);
      setFieldErrors({ ...fieldErrors, [name]: error });
    }
  };

  const validateAllFields = () => {
    const errors = {};
    let isValid = true;

    for (const [field, rule] of Object.entries(validationRules)) {
      if (!form[field]) {
        errors[field] = `This field is required`;
        isValid = false;
      } else {
        const error = validateField(field, form[field]);
        if (error) {
          errors[field] = error;
          isValid = false;
        }
      }
    }

    if (form.Gender === "") {
      errors.Gender = "Please select a gender";
      isValid = false;
    }
    if (form.Mood_Description === "") {
      errors.Mood_Description = "Please select your current mood";
      isValid = false;
    }

    setFieldErrors(errors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setResult(null);

    if (!validateAllFields()) {
      setError("Please fix the errors above before submitting.");
      return;
    }

    setLoading(true);

    const data = {};
    for (let key in initialForm) {
      data[key] =
        key === "Sentiment_Score" ? parseFloat(form[key]) : Number(form[key]);
    }
    
    try {
      const response = await fetch("http://localhost:5001/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const res = await response.json();
      if (response.ok) setResult(res.prediction);
      else setError(res.error || "Something went wrong. Please try again.");
    } catch (err) {
      setError("Can't connect to server. Make sure the backend is running.");
    } finally {
      setLoading(false);
    }
  };

  const progressPercentage = (Object.values(form).filter(v => v !== "").length / Object.keys(form).length) * 100;

  return (
    <div className="predict-page">
      <div className="predict-container">
        <div className="predict-header">
          <h1 className="predict-title">Mental Health Assessment</h1>
          <p className="predict-subtitle">
            This tool analyzes multiple factors - sleep patterns, physical activity, mood, and academic stress - to provide a comprehensive mental health assessment for students.
          </p>
          
          <div className="progress-bar-container">
            <div className="progress-bar" style={{ width: `${progressPercentage}%` }}></div>
          </div>
          <p className="progress-text">{Math.round(progressPercentage)}% Complete</p>
        </div>

        <form onSubmit={handleSubmit} className="predict-form">
          <div className="form-section">
            <h3 className="section-heading">Personal Information</h3>
            
            <div className="form-grid">
              <div className="form-group">
                <label htmlFor="Age" className="form-label">
                  Age
                </label>
                <input
                  id="Age"
                  type="number"
                  name="Age"
                  value={form.Age}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  required
                  min="17"
                  max="45"
                  className={`form-input ${fieldErrors.Age ? "input-error" : ""}`}
                  placeholder="17 - 45"
                />
                <span className="form-hint">Enter your age (17 to 45)</span>
                {fieldErrors.Age && <span className="field-error">{fieldErrors.Age}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="Gender" className="form-label">
                  Gender
                </label>
                <select
                  id="Gender"
                  name="Gender"
                  value={form.Gender}
                  onChange={handleChange}
                  required
                  className={`form-select ${fieldErrors.Gender ? "input-error" : ""}`}
                >
                  <option value="">Select Gender</option>
                  {genderOptions.map((g) => (
                    <option value={g.value} key={g.value}>
                      {g.label}
                    </option>
                  ))}
                </select>
                {fieldErrors.Gender && <span className="field-error">{fieldErrors.Gender}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="GPA" className="form-label">
                  GPA
                </label>
                <input
                  id="GPA"
                  type="number"
                  name="GPA"
                  value={form.GPA}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  required
                  step="0.01"
                  min="1"
                  max="4"
                  className={`form-input ${fieldErrors.GPA ? "input-error" : ""}`}
                  placeholder="1.00 - 4.00"
                />
                <span className="form-hint">Enter your current GPA (1.00 to 4.00)</span>
                {fieldErrors.GPA && <span className="field-error">{fieldErrors.GPA}</span>}
              </div>
            </div>
          </div>

          <div className="form-section">
            <h3 className="section-heading">Mental Health Indicators</h3>
            
            <div className="form-grid">
              <div className="form-group">
                <label htmlFor="Stress_Level" className="form-label">
                  Self-Perceived Stress
                </label>
                <input
                  id="Stress_Level"
                  type="number"
                  name="Stress_Level"
                  value={form.Stress_Level}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  required
                  min="1"
                  max="5"
                  className={`form-input ${fieldErrors.Stress_Level ? "input-error" : ""}`}
                  placeholder="1 (Low) - 5 (High)"
                />
                <span className="form-hint">How stressed do YOU feel? (1=Not stressed, 5=Very stressed)</span>
                {fieldErrors.Stress_Level && <span className="field-error">{fieldErrors.Stress_Level}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="Anxiety_Score" className="form-label">
                  Anxiety Score
                </label>
                <input
                  id="Anxiety_Score"
                  type="number"
                  name="Anxiety_Score"
                  value={form.Anxiety_Score}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  required
                  min="0"
                  max="21"
                  className={`form-input ${fieldErrors.Anxiety_Score ? "input-error" : ""}`}
                  placeholder="0 - 21"
                />
                <span className="form-hint">Score from 0 (None) to 21 (Severe)</span>
                {fieldErrors.Anxiety_Score && <span className="field-error">{fieldErrors.Anxiety_Score}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="Depression_Score" className="form-label">
                  Depression Score
                </label>
                <input
                  id="Depression_Score"
                  type="number"
                  name="Depression_Score"
                  value={form.Depression_Score}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  required
                  min="0"
                  max="27"
                  className={`form-input ${fieldErrors.Depression_Score ? "input-error" : ""}`}
                  placeholder="0 - 27"
                />
                <span className="form-hint">Score from 0 (None) to 27 (Severe)</span>
                {fieldErrors.Depression_Score && <span className="field-error">{fieldErrors.Depression_Score}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="Mood_Description" className="form-label">
                  Current Mood
                </label>
                <select
                  id="Mood_Description"
                  name="Mood_Description"
                  value={form.Mood_Description}
                  onChange={handleChange}
                  required
                  className={`form-select ${fieldErrors.Mood_Description ? "input-error" : ""}`}
                >
                  <option value="">Select Mood</option>
                  {moodOptions.map((m) => (
                    <option value={m.value} key={m.value}>
                      {m.label}
                    </option>
                  ))}
                </select>
                {fieldErrors.Mood_Description && <span className="field-error">{fieldErrors.Mood_Description}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="Sentiment_Score" className="form-label">
                  Sentiment Score: {form.Sentiment_Score || 0}
                </label>
                <div className="slider-container">
                  <input
                    id="Sentiment_Score"
                    type="range"
                    name="Sentiment_Score"
                    value={form.Sentiment_Score || 0}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    required
                    min="-1"
                    max="1"
                    step="0.1"
                    className="form-slider"
                  />
                  <div className="slider-labels">
                    <span className="slider-label-left">Very Negative (-1)</span>
                    <span className="slider-label-center">Neutral (0)</span>
                    <span className="slider-label-right">Very Positive (+1)</span>
                  </div>
                </div>
                <span className="form-hint">Drag the slider: How positive or negative is your daily outlook?</span>
                {fieldErrors.Sentiment_Score && <span className="field-error">{fieldErrors.Sentiment_Score}</span>}
              </div>
            </div>
          </div>

          <div className="form-section">
            <h3 className="section-heading">Lifestyle Factors</h3>
            
            <div className="form-grid">
              <div className="form-group">
                <label htmlFor="Sleep_Hours" className="form-label">
                  Sleep Hours
                </label>
                <input
                  id="Sleep_Hours"
                  type="number"
                  name="Sleep_Hours"
                  value={form.Sleep_Hours}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  required
                  step="0.1"
                  min="3"
                  max="9"
                  className={`form-input ${fieldErrors.Sleep_Hours ? "input-error" : ""}`}
                  placeholder="3.0 - 9.0"
                />
                <span className="form-hint">Average hours per night (3 to 9)</span>
                {fieldErrors.Sleep_Hours && <span className="field-error">{fieldErrors.Sleep_Hours}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="Steps_Per_Day" className="form-label">
                  Steps Per Day
                </label>
                <input
                  id="Steps_Per_Day"
                  type="number"
                  name="Steps_Per_Day"
                  value={form.Steps_Per_Day}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  required
                  min="2000"
                  max="12000"
                  className={`form-input ${fieldErrors.Steps_Per_Day ? "input-error" : ""}`}
                  placeholder="2,000 - 12,000"
                />
                <span className="form-hint">Your average daily physical activity (walking, exercise)</span>
                {fieldErrors.Steps_Per_Day && <span className="field-error">{fieldErrors.Steps_Per_Day}</span>}
              </div>
            </div>
          </div>

          <button type="submit" disabled={loading} className="submit-btn">
            {loading ? (
              <>
                <FaSpinner className="spinner" />
                Analyzing...
              </>
            ) : (
              <>
                <FaCheckCircle />
                Predict
              </>
            )}
          </button>
        </form>

        {result !== null && <ResultCard prediction={result} />}
        
        {error && (
          <div className="error-box">
            <FaExclamationTriangle className="error-icon" />
            <p>{error}</p>
          </div>
        )}
      </div>
    </div>
  );
}
