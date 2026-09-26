import { useEffect, useState } from "react";
import { FiCheck, FiCpu, FiMonitor, FiTrash2 } from "react-icons/fi";
import { useTheme } from "../../theme/theme-context";
import { clearHistory, readHistory } from "../../lib/history";
import "./Settings.css";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "/api";
const THEMES = [
  { value: "light", label: "Light", hint: "Best for shared or bright spaces" },
  { value: "dark", label: "Dark", hint: "Easier on the eyes at night" },
];

function ThemePreview({ variant }) {
  return (
    <span className={`tp tp--${variant}`} aria-hidden="true">
      <span className="tp__side">
        <span className="tp__mark" />
        <span className="tp__line" />
        <span className="tp__line" />
        <span className="tp__line tp__line--dim" />
      </span>
      <span className="tp__main">
        <span className="tp__title" />
        <span className="tp__card" />
        <span className="tp__card" />
      </span>
    </span>
  );
}

export default function Settings() {
  const { theme, setTheme } = useTheme();
  const [count, setCount] = useState(() => readHistory().length);
  const [cleared, setCleared] = useState(false);
  const [service, setService] = useState({ state: "loading" });

  useEffect(() => {
    let active = true;
    fetch(`${API_BASE_URL}/health`)
      .then((response) => (response.ok ? response.json() : Promise.reject(response)))
      .then((data) => active && setService({ state: "ok", ...data }))
      .catch(() => active && setService({ state: "down" }));
    return () => {
      active = false;
    };
  }, []);

  const handleClear = () => {
    clearHistory();
    setCount(0);
    setCleared(true);
    window.setTimeout(() => setCleared(false), 2600);
  };

  return (
    <div className="settings">
      <header className="page-head">
        <div className="page-head__inner">
          <div>
            <h1 className="page-head__title">Settings</h1>
            <p className="page-head__sub">Appearance and the data held on this device.</p>
          </div>
        </div>
      </header>

      <div className="page settings__body">
        <section className="panel">
          <div className="panel__head">
            <h2 className="panel__title">Appearance</h2>
            <p className="panel__sub">Applies instantly and is remembered on this browser.</p>
          </div>
          <div className="theme-options" role="radiogroup" aria-label="Colour theme">
            {THEMES.map(({ value, label, hint }) => (
              <button
                key={value}
                type="button"
                role="radio"
                aria-checked={theme === value}
                className={`theme-option${theme === value ? " theme-option--active" : ""}`}
                onClick={() => setTheme(value)}
              >
                <ThemePreview variant={value} />
                <span className="theme-option__meta">
                  <span className="theme-option__label">{label}</span>
                  <span className="theme-option__hint">{hint}</span>
                </span>
                <span className="theme-option__check">
                  <FiCheck aria-hidden="true" />
                </span>
              </button>
            ))}
          </div>
        </section>

        <section className="panel">
          <div className="panel__head">
            <h2 className="panel__title">Your data</h2>
            <p className="panel__sub">
              MindCare has no accounts and no server-side database. Assessment inputs are used for a
              single prediction and discarded.
            </p>
          </div>

          <div className="rows">
            <div className="row">
              <div className="row__text">
                <h3 className="row__title">Assessment history</h3>
                <p className="row__desc">
                  {count === 0
                    ? "No assessments stored on this device."
                    : `${count} assessment${count === 1 ? "" : "s"} stored in this browser.`}
                </p>
              </div>
              <button
                type="button"
                className="btn btn--ghost"
                onClick={handleClear}
                disabled={count === 0}
              >
                {cleared ? (
                  <>
                    <FiCheck aria-hidden="true" />
                    Cleared
                  </>
                ) : (
                  <>
                    <FiTrash2 aria-hidden="true" />
                    Clear history
                  </>
                )}
              </button>
            </div>

            <div className="row">
              <div className="row__text">
                <h3 className="row__title">Server-side storage</h3>
                <p className="row__desc">
                  None. The prediction endpoint is stateless and writes nothing to disk.
                </p>
              </div>
              <span className="tag">
                <FiMonitor aria-hidden="true" />
                Device only
              </span>
            </div>
          </div>
        </section>

        <section className="panel">
          <div className="panel__head">
            <h2 className="panel__title">Service</h2>
            <p className="panel__sub">Live status of the model that scores your assessment.</p>
          </div>

          <div className="rows">
            <div className="row">
              <div className="row__text">
                <h3 className="row__title">Prediction API</h3>
                <p className="row__desc">
                  {service.state === "loading" && "Checking…"}
                  {service.state === "ok" && "Reachable and responding."}
                  {service.state === "down" &&
                    "Unreachable. Start the backend with python app.py on port 5001."}
                </p>
              </div>
              <span className={`status status--${service.state}`}>
                <span className="status__dot" />
                {service.state === "loading" && "Checking"}
                {service.state === "ok" && "Online"}
                {service.state === "down" && "Offline"}
              </span>
            </div>

            <div className="row">
              <div className="row__text">
                <h3 className="row__title">Active model</h3>
                <p className="row__desc">
                  {service.state === "ok" && service.model_loaded
                    ? "Soft-voting ensemble of five classifiers."
                    : "Unavailable until the service responds."}
                </p>
              </div>
              <span className="tag tag--mono">
                <FiCpu aria-hidden="true" />
                {service.state === "ok" && service.model_name ? service.model_name : "—"}
              </span>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
