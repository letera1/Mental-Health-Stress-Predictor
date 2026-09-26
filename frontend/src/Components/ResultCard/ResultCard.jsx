import { FiAlertCircle, FiAlertTriangle, FiArrowRight, FiCheck, FiPhone } from "react-icons/fi";
import { Link } from "react-router-dom";
import { OUTCOMES } from "../../lib/assessment";
import "./ResultCard.css";

const ICONS = {
  0: FiCheck,
  1: FiAlertTriangle,
  2: FiAlertCircle,
};

export default function ResultCard({ prediction, confidence, probabilities }) {
  const outcome = OUTCOMES[prediction];
  if (!outcome) return null;

  const Icon = ICONS[prediction];
  const bars = probabilities
    ? Object.entries(probabilities).sort((a, b) => b[1] - a[1])
    : null;

  return (
    <section className={`result result--${outcome.tone}`} aria-live="polite">
      <header className="result__head">
        <span className="result__badge">
          <Icon aria-hidden="true" />
        </span>
        <div>
          <p className="eyebrow">Assessment result</p>
          <h2 className="result__title">{outcome.label}</h2>
        </div>
        {typeof confidence === "number" && (
          <div className="result__confidence">
            <span className="result__confidence-value tnum">{Math.round(confidence * 100)}%</span>
            <span className="eyebrow">Model confidence</span>
          </div>
        )}
      </header>

      <div className="result__body">
        <h3 className="result__headline">{outcome.headline}</h3>
        <p className="result__summary">{outcome.summary}</p>

        {bars && (
          <div className="result__dist">
            <p className="eyebrow">Probability distribution</p>
            {bars.map(([name, value]) => (
              <div key={name} className="dist-row">
                <span className="dist-row__label">{name}</span>
                <div className="dist-row__track">
                  <div
                    className={`dist-row__fill${name === outcome.label ? " dist-row__fill--lead" : ""}`}
                    style={{ width: `${Math.max(value * 100, 1.5)}%` }}
                  />
                </div>
                <span className="dist-row__value tnum">{(value * 100).toFixed(1)}%</span>
              </div>
            ))}
          </div>
        )}

        <div className="result__actions-block">
          <p className="eyebrow">Recommended next steps</p>
          <ul className="result__list">
            {outcome.actions.map((action) => (
              <li key={action}>
                <FiCheck aria-hidden="true" />
                <span>{action}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="result__cta">
          <Link to="/resources" className="btn btn--ghost">
            View resources
            <FiArrowRight aria-hidden="true" />
          </Link>
          {prediction === 2 && (
            <a href="tel:988" className="btn btn--danger">
              <FiPhone aria-hidden="true" />
              Call 988 now
            </a>
          )}
        </div>
      </div>

      <footer className="result__disclaimer">
        This is a screening aid, not a diagnosis. It cannot replace assessment by a qualified
        clinician. In an emergency, call 911 or 988.
      </footer>
    </section>
  );
}
