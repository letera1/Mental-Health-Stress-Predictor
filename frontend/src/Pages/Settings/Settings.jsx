import { useState } from "react";
import { FiCheck, FiMonitor, FiMoon, FiSun, FiTrash2 } from "react-icons/fi";
import { useTheme } from "../../theme/theme-context";
import { clearHistory, readHistory } from "../../lib/history";
import "./Settings.css";

const THEMES = [
  { value: "light", label: "Light", icon: FiSun },
  { value: "dark", label: "Dark", icon: FiMoon },
];

export default function Settings() {
  const { theme, setTheme } = useTheme();
  const [count, setCount] = useState(() => readHistory().length);
  const [cleared, setCleared] = useState(false);

  const handleClear = () => {
    clearHistory();
    setCount(0);
    setCleared(true);
    window.setTimeout(() => setCleared(false), 2600);
  };

  return (
    <div className="settings">
      <header className="page-head">
        <div>
          <h1 className="page-head__title">Settings</h1>
          <p className="page-head__sub">Appearance and the data held on this device.</p>
        </div>
      </header>

      <div className="page settings__body">
        <section className="panel">
          <div className="panel__head">
            <h2 className="panel__title">Appearance</h2>
            <p className="panel__sub">Applies instantly and is remembered on this browser.</p>
          </div>
          <div className="theme-options" role="radiogroup" aria-label="Colour theme">
            {THEMES.map(({ value, label, icon: Icon }) => (
              <button
                key={value}
                type="button"
                role="radio"
                aria-checked={theme === value}
                className={`theme-option${theme === value ? " theme-option--active" : ""}`}
                onClick={() => setTheme(value)}
              >
                <span className={`theme-option__preview theme-option__preview--${value}`}>
                  <Icon aria-hidden="true" />
                </span>
                <span className="theme-option__label">{label}</span>
                {theme === value && <FiCheck className="theme-option__check" aria-hidden="true" />}
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

          <div className="data-row">
            <div>
              <h3 className="data-row__title">Assessment history</h3>
              <p className="data-row__text">
                {count === 0
                  ? "No assessments stored on this device."
                  : `${count} assessment${count === 1 ? "" : "s"} stored in this browser's local storage.`}
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

          <div className="data-row">
            <div>
              <h3 className="data-row__title">Server-side storage</h3>
              <p className="data-row__text">
                None. The prediction endpoint is stateless and writes nothing to disk.
              </p>
            </div>
            <span className="tag">
              <FiMonitor aria-hidden="true" />
              Device only
            </span>
          </div>
        </section>
      </div>
    </div>
  );
}
