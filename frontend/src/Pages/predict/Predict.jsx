import { useMemo, useState } from "react";
import { FiAlertCircle, FiArrowRight, FiLoader } from "react-icons/fi";
import ResultCard from "../../Components/ResultCard/ResultCard";
import {
  EMPTY_FORM,
  GENDER_OPTIONS,
  MOOD_OPTIONS,
  NUMERIC_FIELDS,
} from "../../lib/assessment";
import { appendEntry } from "../../lib/history";
import "./predict.css";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "/api";
const NUMERIC_SET = new Set(NUMERIC_FIELDS);

const SECTIONS = [
  { id: "profile", index: "01", title: "Profile", hint: "Baseline academic context." },
  {
    id: "clinical",
    index: "02",
    title: "Clinical indicators",
    hint: "Use your most recent GAD-7 and PHQ-9 scores if you have them.",
  },
  { id: "lifestyle", index: "03", title: "Lifestyle", hint: "Typical week, not your best day." },
  { id: "mood", index: "04", title: "Mood", hint: "How things feel right now." },
];

export default function Predict() {
  const [form, setForm] = useState(EMPTY_FORM);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const completion = useMemo(() => {
    const keys = Object.keys(EMPTY_FORM);
    const filled = keys.filter((key) => form[key] !== "" && form[key] !== null).length;
    return Math.round((filled / keys.length) * 100);
  }, [form]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null);
    setResult(null);
    setLoading(true);

    const payload = {};
    for (const key of Object.keys(EMPTY_FORM)) {
      payload[key] = NUMERIC_SET.has(key) ? Number(form[key]) : form[key];
    }

    try {
      const response = await fetch(`${API_BASE_URL}/predict`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "The assessment could not be completed. Please try again.");
        return;
      }

      setResult(data);
      appendEntry({
        prediction: data.prediction,
        label: data.label,
        confidence: data.confidence ?? null,
        inputs: payload,
      });
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch {
      setError("Cannot reach the assessment service. Check that the backend is running.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="predict">
      <header className="page-head">
        <div>
          <h1 className="page-head__title">Assessment</h1>
          <p className="page-head__sub">
            Ten indicators, about two minutes. Processed in memory and never stored on a server.
          </p>
        </div>
        <div className="completion">
          <div className="completion__track">
            <div className="completion__fill" style={{ width: `${completion}%` }} />
          </div>
          <span className="completion__value tnum">{completion}% complete</span>
        </div>
      </header>

      <div className="page predict__body">
        {result && (
          <ResultCard
            prediction={result.prediction}
            confidence={result.confidence}
            probabilities={result.probabilities}
          />
        )}

        {error && (
          <div className="alert" role="alert">
            <FiAlertCircle aria-hidden="true" />
            <p>{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="form">
          {/* ---- 01 Profile ---- */}
          <FormSection meta={SECTIONS[0]}>
            <Field
              label="Age"
              hint="17 to 45"
              input={
                <input
                  id="Age"
                  name="Age"
                  type="number"
                  value={form.Age}
                  onChange={handleChange}
                  required
                  min="17"
                  max="45"
                  className="input"
                  placeholder="e.g. 21"
                />
              }
            />
            <Field
              label="Grade point average"
              hint="1.00 to 4.00"
              input={
                <input
                  id="GPA"
                  name="GPA"
                  type="number"
                  value={form.GPA}
                  onChange={handleChange}
                  required
                  step="0.01"
                  min="1"
                  max="4"
                  className="input"
                  placeholder="e.g. 3.20"
                />
              }
            />
            <Field
              label="Gender"
              full
              input={
                <div className="choice-row">
                  {GENDER_OPTIONS.map((option) => (
                    <label key={option.value} className="choice">
                      <input
                        type="radio"
                        name="Gender"
                        value={option.value}
                        checked={form.Gender === option.value}
                        onChange={handleChange}
                        required
                      />
                      <span className="choice__face">{option.label}</span>
                    </label>
                  ))}
                </div>
              }
            />
          </FormSection>

          {/* ---- 02 Clinical ---- */}
          <FormSection meta={SECTIONS[1]}>
            <Field
              label="Perceived stress"
              full
              hint="1 = minimal, 5 = overwhelming"
              input={
                <Slider
                  id="Stress_Level"
                  name="Stress_Level"
                  value={form.Stress_Level}
                  onChange={handleChange}
                  min={1}
                  max={5}
                  step={1}
                  display={`${form.Stress_Level} / 5`}
                  ticks={["Minimal", "Moderate", "Overwhelming"]}
                />
              }
            />
            <Field
              label="Anxiety score"
              hint="GAD-7 scale, 0 to 21"
              input={
                <input
                  id="Anxiety_Score"
                  name="Anxiety_Score"
                  type="number"
                  value={form.Anxiety_Score}
                  onChange={handleChange}
                  required
                  min="0"
                  max="21"
                  className="input"
                  placeholder="0-21"
                />
              }
            />
            <Field
              label="Depression score"
              hint="PHQ-9 scale, 0 to 27"
              input={
                <input
                  id="Depression_Score"
                  name="Depression_Score"
                  type="number"
                  value={form.Depression_Score}
                  onChange={handleChange}
                  required
                  min="0"
                  max="27"
                  className="input"
                  placeholder="0-27"
                />
              }
            />
          </FormSection>

          {/* ---- 03 Lifestyle ---- */}
          <FormSection meta={SECTIONS[2]}>
            <Field
              label="Sleep per night"
              hint="Average hours, 3 to 9"
              input={
                <input
                  id="Sleep_Hours"
                  name="Sleep_Hours"
                  type="number"
                  value={form.Sleep_Hours}
                  onChange={handleChange}
                  required
                  step="0.5"
                  min="3"
                  max="9"
                  className="input"
                  placeholder="e.g. 7"
                />
              }
            />
            <Field
              label="Steps per day"
              hint="2,000 to 12,000"
              input={
                <input
                  id="Steps_Per_Day"
                  name="Steps_Per_Day"
                  type="number"
                  value={form.Steps_Per_Day}
                  onChange={handleChange}
                  required
                  min="2000"
                  max="12000"
                  step="100"
                  className="input"
                  placeholder="e.g. 6000"
                />
              }
            />
          </FormSection>

          {/* ---- 04 Mood ---- */}
          <FormSection meta={SECTIONS[3]}>
            <Field
              label="Closest description of your mood"
              full
              input={
                <div className="choice-grid">
                  {MOOD_OPTIONS.map((mood) => (
                    <label key={mood.value} className="choice">
                      <input
                        type="radio"
                        name="Mood_Description"
                        value={mood.value}
                        checked={form.Mood_Description === mood.value}
                        onChange={handleChange}
                        required
                      />
                      <span className="choice__face">{mood.label}</span>
                    </label>
                  ))}
                </div>
              }
            />
            <Field
              label="Overall sentiment"
              full
              hint="Your general outlook over the past week"
              input={
                <Slider
                  id="Sentiment_Score"
                  name="Sentiment_Score"
                  value={form.Sentiment_Score}
                  onChange={handleChange}
                  min={-1}
                  max={1}
                  step={0.1}
                  display={Number(form.Sentiment_Score).toFixed(1)}
                  ticks={["Negative", "Neutral", "Positive"]}
                />
              }
            />
          </FormSection>

          <div className="form__submit">
            <p className="form__note">
              Results are a screening signal, not a diagnosis. Review them with a professional.
            </p>
            <button type="submit" className="btn btn--primary btn--lg" disabled={loading}>
              {loading ? (
                <>
                  <FiLoader className="spin" aria-hidden="true" />
                  Analysing
                </>
              ) : (
                <>
                  Run assessment
                  <FiArrowRight aria-hidden="true" />
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function FormSection({ meta, children }) {
  return (
    <section className="form-section">
      <div className="form-section__head">
        <span className="form-section__index tnum">{meta.index}</span>
        <div>
          <h2 className="form-section__title">{meta.title}</h2>
          <p className="form-section__hint">{meta.hint}</p>
        </div>
      </div>
      <div className="form-section__grid">{children}</div>
    </section>
  );
}

function Field({ label, hint, input, full }) {
  return (
    <div className={`field${full ? " field--full" : ""}`}>
      <label className="field__label" htmlFor={input.props.id}>
        {label}
      </label>
      {input}
      {hint && <span className="field__hint">{hint}</span>}
    </div>
  );
}

function Slider({ id, name, value, onChange, min, max, step, display, ticks }) {
  const percent = ((Number(value) - min) / (max - min)) * 100;
  return (
    <div className="slider">
      <div className="slider__row">
        <input
          id={id}
          name={name}
          type="range"
          value={value}
          onChange={onChange}
          min={min}
          max={max}
          step={step}
          className="slider__input"
          style={{ "--fill": `${percent}%` }}
        />
        <output className="slider__value tnum">{display}</output>
      </div>
      <div className="slider__ticks">
        {ticks.map((tick) => (
          <span key={tick}>{tick}</span>
        ))}
      </div>
    </div>
  );
}
