import { useEffect, useMemo, useRef, useState } from "react";
import { FiAlertCircle, FiArrowRight, FiLoader } from "react-icons/fi";
import ResultCard from "../../Components/ResultCard/ResultCard";
import { Card, Eyebrow, Page, PageContent, PageHeader } from "../../Components/ui/primitives";
import { buttonClass, join } from "../../Components/ui/styles";
import {
  EMPTY_FORM,
  GENDER_OPTIONS,
  MOOD_OPTIONS,
  NUMERIC_FIELDS,
} from "../../lib/assessment";
import { appendEntry } from "../../lib/history";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "/api";
const NUMERIC_SET = new Set(NUMERIC_FIELDS);

const SECTIONS = [
  { index: "01", title: "Profile", hint: "Baseline academic context." },
  {
    index: "02",
    title: "Clinical indicators",
    hint: "Use your latest GAD-7 and PHQ-9 scores when available.",
  },
  { index: "03", title: "Lifestyle", hint: "Answer for a typical week, not your best day." },
  { index: "04", title: "Mood", hint: "Choose what best reflects how things feel now." },
];

const INPUT_CLASS =
  "h-11 w-full rounded-lg border border-line bg-surface px-3.5 text-[15px] tabular-nums text-strong outline-none transition placeholder:text-faint hover:border-line-strong focus:border-accent focus:ring-2 focus:ring-accent/15";

export default function Predict() {
  const [form, setForm] = useState(EMPTY_FORM);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const resultRef = useRef(null);

  const completion = useMemo(() => {
    const keys = Object.keys(EMPTY_FORM);
    const filled = keys.filter((key) => form[key] !== "" && form[key] !== null).length;
    return Math.round((filled / keys.length) * 100);
  }, [form]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  useEffect(() => {
    if (result) resultRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [result]);

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
    } catch {
      setError("Cannot reach the assessment service. Start the Flask backend on port 5001.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Page>
      <PageHeader
        title="Mental wellness assessment"
        description="Ten indicators, about two minutes. Processed in memory and never stored on a server."
        actions={
          <div className="w-full min-w-44 sm:w-52">
            <div className="h-1.5 overflow-hidden rounded-full bg-muted-surface">
              <div
                className="h-full rounded-full bg-accent transition-[width] duration-300"
                style={{ width: `${completion}%` }}
              />
            </div>
            <p className="mt-1.5 text-right text-xs tabular-nums text-muted">{completion}% complete</p>
          </div>
        }
      />

      <PageContent className="max-w-260 space-y-6">
        {result && (
          <div ref={resultRef} className="scroll-mt-48 lg:scroll-mt-24">
            <ResultCard
              prediction={result.prediction}
              confidence={result.confidence}
              probabilities={result.probabilities}
            />
          </div>
        )}

        {error && (
          <div className="flex items-start gap-3 rounded-xl border border-danger/60 bg-danger-soft px-4 py-3.5 text-sm text-strong" role="alert">
            <FiAlertCircle className="mt-0.5 size-4.5 shrink-0 text-danger" aria-hidden="true" />
            <p>{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <FormSection meta={SECTIONS[0]}>
            <Field label="Age" htmlFor="Age" hint="17 to 45">
              <input
                id="Age"
                name="Age"
                type="number"
                value={form.Age}
                onChange={handleChange}
                required
                min="17"
                max="45"
                aria-describedby="Age-hint"
                className={INPUT_CLASS}
                placeholder="e.g. 21"
              />
            </Field>
            <Field label="Grade point average" htmlFor="GPA" hint="1.00 to 4.00">
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
                aria-describedby="GPA-hint"
                className={INPUT_CLASS}
                placeholder="e.g. 3.20"
              />
            </Field>
            <Field label="Gender" full>
              <ChoiceGroup
                name="Gender"
                value={form.Gender}
                options={GENDER_OPTIONS}
                onChange={handleChange}
              />
            </Field>
          </FormSection>

          <FormSection meta={SECTIONS[1]}>
            <Field label="Perceived stress" htmlFor="Stress_Level" full hint="1 = minimal, 5 = overwhelming">
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
                ariaDescribedBy="Stress_Level-hint"
              />
            </Field>
            <Field label="Anxiety score" htmlFor="Anxiety_Score" hint="GAD-7 scale, 0 to 21">
              <input
                id="Anxiety_Score"
                name="Anxiety_Score"
                type="number"
                value={form.Anxiety_Score}
                onChange={handleChange}
                required
                min="0"
                max="21"
                aria-describedby="Anxiety_Score-hint"
                className={INPUT_CLASS}
                placeholder="0-21"
              />
            </Field>
            <Field label="Depression score" htmlFor="Depression_Score" hint="PHQ-9 scale, 0 to 27">
              <input
                id="Depression_Score"
                name="Depression_Score"
                type="number"
                value={form.Depression_Score}
                onChange={handleChange}
                required
                min="0"
                max="27"
                aria-describedby="Depression_Score-hint"
                className={INPUT_CLASS}
                placeholder="0-27"
              />
            </Field>
          </FormSection>

          <FormSection meta={SECTIONS[2]}>
            <Field label="Sleep per night" htmlFor="Sleep_Hours" hint="Average hours, 3 to 9">
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
                aria-describedby="Sleep_Hours-hint"
                className={INPUT_CLASS}
                placeholder="e.g. 7"
              />
            </Field>
            <Field label="Steps per day" htmlFor="Steps_Per_Day" hint="2,000 to 12,000">
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
                aria-describedby="Steps_Per_Day-hint"
                className={INPUT_CLASS}
                placeholder="e.g. 6000"
              />
            </Field>
          </FormSection>

          <FormSection meta={SECTIONS[3]}>
            <Field label="Closest description of your mood" full>
              <ChoiceGroup
                name="Mood_Description"
                value={form.Mood_Description}
                options={MOOD_OPTIONS}
                onChange={handleChange}
                grid
              />
            </Field>
            <Field label="Overall sentiment" htmlFor="Sentiment_Score" full hint="Your general outlook over the past week">
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
                ariaDescribedBy="Sentiment_Score-hint"
              />
            </Field>
          </FormSection>

          <div className="flex flex-col gap-4 rounded-xl border border-line bg-surface p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
            <p className="max-w-xl text-xs leading-5 text-muted sm:text-sm">
              Results are a screening signal, not a diagnosis. Review concerns with a qualified
              professional.
            </p>
            <button
              type="submit"
              disabled={loading}
              className={buttonClass({ size: "lg", className: "w-full sm:w-auto" })}
            >
              {loading ? (
                <>
                  <FiLoader className="animate-spin" aria-hidden="true" />
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
      </PageContent>
    </Page>
  );
}

function FormSection({ meta, children }) {
  return (
    <Card>
      <div className="flex items-start gap-3 border-b border-line-subtle px-5 py-4 sm:gap-4 sm:px-6">
        <span className="mt-0.5 rounded-md bg-accent-soft px-2 py-1 font-mono text-xs font-semibold tabular-nums text-accent-ink">
          {meta.index}
        </span>
        <div>
          <h2 className="font-display text-base font-semibold text-strong sm:text-lg">{meta.title}</h2>
          <p className="mt-0.5 text-sm leading-5 text-muted">{meta.hint}</p>
        </div>
      </div>
      <div className="grid gap-5 p-5 sm:grid-cols-2 sm:p-6">{children}</div>
    </Card>
  );
}

function Field({ label, htmlFor, hint, children, full = false }) {
  return (
    <div className={join("min-w-0", full && "sm:col-span-2")}>
      <label className="mb-2 block text-sm font-semibold text-strong" htmlFor={htmlFor}>
        {label}
      </label>
      {children}
      {hint && (
        <span id={`${htmlFor}-hint`} className="mt-2 block text-xs text-faint">
          {hint}
        </span>
      )}
    </div>
  );
}

function ChoiceGroup({ name, value, options, onChange, grid = false }) {
  return (
    <div className={grid ? "grid grid-cols-2 gap-2 sm:grid-cols-4 lg:grid-cols-7" : "flex flex-wrap gap-2"}>
      {options.map((option) => (
        <label key={option.value} className="min-w-0 flex-1 cursor-pointer">
          <input
            type="radio"
            name={name}
            value={option.value}
            checked={value === option.value}
            onChange={onChange}
            required
            className="peer sr-only"
          />
          <span className="flex h-10 items-center justify-center rounded-lg border border-line bg-surface px-3 text-sm font-medium text-body transition hover:border-line-strong hover:bg-subtle peer-checked:border-accent peer-checked:bg-accent-soft peer-checked:font-semibold peer-checked:text-accent-ink peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-accent">
            {option.label}
          </span>
        </label>
      ))}
    </div>
  );
}

function Slider({ id, name, value, onChange, min, max, step, display, ticks, ariaDescribedBy }) {
  const percent = ((Number(value) - min) / (max - min)) * 100;
  return (
    <div>
      <div className="flex items-center gap-4">
        <input
          id={id}
          name={name}
          type="range"
          value={value}
          onChange={onChange}
          min={min}
          max={max}
          step={step}
          aria-describedby={ariaDescribedBy}
          className="h-1.5 min-w-0 flex-1 cursor-pointer appearance-none rounded-full outline-none focus-visible:ring-2 focus-visible:ring-accent/20 [&::-moz-range-thumb]:size-5 [&::-moz-range-thumb]:cursor-pointer [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-accent [&::-moz-range-thumb]:bg-surface [&::-webkit-slider-thumb]:size-5 [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-accent [&::-webkit-slider-thumb]:bg-surface [&::-webkit-slider-thumb]:shadow-sm"
          style={{
            background: `linear-gradient(to right, var(--accent) 0%, var(--accent) ${percent}%, var(--bg-muted) ${percent}%, var(--bg-muted) 100%)`,
          }}
        />
        <output className="grid h-9 min-w-16 place-items-center rounded-lg border border-line bg-subtle px-2 text-sm font-semibold tabular-nums text-strong">
          {display}
        </output>
      </div>
      <div className="mt-2 flex justify-between text-[11px] text-faint">
        {ticks.map((tick) => (
          <span key={tick}>{tick}</span>
        ))}
      </div>
    </div>
  );
}
