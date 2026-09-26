import { Link } from "react-router-dom";
import { FiCpu, FiDatabase, FiLayers, FiLock, FiServer, FiTrendingUp } from "react-icons/fi";
import "./about.css";

const PILLARS = [
  {
    icon: FiCpu,
    title: "Ensemble modelling",
    body: "Five classifiers vote on every assessment. Averaging their probabilities is more stable than trusting any single model.",
  },
  {
    icon: FiLock,
    title: "Nothing leaves the device",
    body: "Responses are held in memory for the duration of the request. History, if you keep it, is written to your browser only.",
  },
  {
    icon: FiTrendingUp,
    title: "Calibrated for imbalance",
    body: "Tuned on balanced accuracy rather than raw accuracy, so the rarer outcomes are not quietly ignored.",
  },
  {
    icon: FiLayers,
    title: "Built for students",
    body: "Inputs map to the pressures that actually shape student wellbeing: sleep, workload, activity, and mood.",
  },
];

const STACK = [
  { icon: FiCpu, label: "Model", value: "Soft-voting ensemble, scikit-learn 1.6" },
  { icon: FiServer, label: "API", value: "Flask 3 served by Gunicorn" },
  { icon: FiLayers, label: "Interface", value: "React 19, Vite 7, Recharts" },
  { icon: FiDatabase, label: "Training data", value: "500 anonymised student records" },
];

const LIMITS = [
  {
    title: "Not a diagnosis",
    body: "A screening signal only. Diagnosis requires a qualified clinician who can see the full picture.",
  },
  {
    title: "Trained on a small sample",
    body: "The model learned from 500 records. Treat its output as a prompt to reflect, not a verdict.",
  },
  {
    title: "Confidence is not certainty",
    body: "A high probability means the classifiers agreed, not that the outcome is guaranteed correct.",
  },
  {
    title: "Emergencies need people",
    body: "If you are in crisis, call 911 or 988. Software is not the right tool for that moment.",
  },
];

export default function About() {
  return (
    <div className="about">
      <header className="page-head">
        <div className="page-head__inner">
          <div>
            <h1 className="page-head__title">About</h1>
            <p className="page-head__sub">How MindCare works, and where its limits are.</p>
          </div>
        </div>
      </header>

      <div className="page about__body">
        <section className="intro">
          <p className="eyebrow">Our approach</p>
          <h2 className="intro__title">
            Mental health screening should be immediate, private, and honest about uncertainty.
          </h2>
          <p className="intro__text">
            MindCare turns ten routine indicators into a calibrated risk signal in about two minutes.
            It exists to shorten the gap between &ldquo;something feels off&rdquo; and talking to
            someone who can help &mdash; not to replace that conversation.
          </p>
        </section>

        <section className="pillars">
          {PILLARS.map(({ icon: Icon, title, body }) => (
            <article key={title} className="pillar">
              <span className="pillar__icon">
                <Icon aria-hidden="true" />
              </span>
              <h3 className="pillar__title">{title}</h3>
              <p className="pillar__body">{body}</p>
            </article>
          ))}
        </section>

        <section className="panel">
          <div className="panel__head">
            <h2 className="panel__title">Under the hood</h2>
            <p className="panel__sub">
              Random Forest, Extra Trees, Linear SVC, K-Nearest Neighbours, and a Decision Tree,
              combined by soft voting.
            </p>
          </div>
          <ul className="spec">
            {STACK.map(({ icon: Icon, label, value }) => (
              <li key={label} className="spec__row">
                <span className="spec__icon">
                  <Icon aria-hidden="true" />
                </span>
                <span className="spec__label">{label}</span>
                <span className="spec__value">{value}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="panel">
          <div className="panel__head">
            <h2 className="panel__title">What this tool cannot do</h2>
            <p className="panel__sub">Stated plainly, because it matters more than the features.</p>
          </div>
          <div className="limits">
            {LIMITS.map(({ title, body }) => (
              <div key={title} className="limit">
                <h3 className="limit__title">{title}</h3>
                <p className="limit__body">{body}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="cta">
          <div>
            <h2 className="cta__title">Ready when you are</h2>
            <p className="cta__text">Two minutes, ten questions, no account required.</p>
          </div>
          <div className="cta__actions">
            <Link to="/predict" className="btn btn--primary btn--lg">
              Start assessment
            </Link>
            <Link to="/resources" className="btn btn--ghost btn--lg">
              Browse resources
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
