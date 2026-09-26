import { FiAlertCircle, FiAlertTriangle, FiArrowRight, FiCheck, FiPhone } from "react-icons/fi";
import { Link } from "react-router-dom";
import { Eyebrow } from "../ui/primitives";
import { buttonClass, join } from "../ui/styles";
import { OUTCOMES } from "../../lib/assessment";

const ICONS = {
  0: FiCheck,
  1: FiAlertTriangle,
  2: FiAlertCircle,
};

const TONES = {
  ok: {
    rail: "bg-success",
    badge: "bg-success-soft text-success",
    bar: "bg-success",
    check: "text-success",
  },
  warn: {
    rail: "bg-warning",
    badge: "bg-warning-soft text-warning",
    bar: "bg-warning",
    check: "text-warning",
  },
  bad: {
    rail: "bg-danger",
    badge: "bg-danger-soft text-danger",
    bar: "bg-danger",
    check: "text-danger",
  },
};

export default function ResultCard({ prediction, confidence, probabilities }) {
  const outcome = OUTCOMES[prediction];
  if (!outcome) return null;

  const Icon = ICONS[prediction];
  const tone = TONES[outcome.tone];
  const bars = probabilities
    ? Object.entries(probabilities).sort((a, b) => b[1] - a[1])
    : null;

  return (
    <section
      className="overflow-hidden rounded-2xl border border-line bg-surface shadow-sm"
      aria-live="polite"
    >
      <div className={join("h-1", tone.rail)} />

      <header className="flex flex-wrap items-center gap-4 border-b border-line-subtle px-5 py-5 sm:px-6">
        <span className={join("grid size-11 shrink-0 place-items-center rounded-xl", tone.badge)}>
          <Icon className="size-[21px]" aria-hidden="true" />
        </span>
        <div>
          <Eyebrow>Assessment result</Eyebrow>
          <h2 className="mt-1 font-display text-2xl font-semibold tracking-[-0.03em] text-strong">
            {outcome.label}
          </h2>
        </div>
        {typeof confidence === "number" && (
          <div className="ml-auto text-right">
            <span className="block font-display text-2xl font-semibold tabular-nums tracking-[-0.03em] text-strong">
              {Math.round(confidence * 100)}%
            </span>
            <span className="mt-1 block text-[11px] font-semibold uppercase tracking-[0.08em] text-muted">
              Model confidence
            </span>
          </div>
        )}
      </header>

      <div className="grid gap-6 p-5 sm:p-6 lg:grid-cols-[minmax(0,1.1fr)_minmax(300px,0.9fr)]">
        <div>
          <h3 className="font-display text-lg font-semibold text-strong">{outcome.headline}</h3>
          <p className="mt-2 max-w-2xl text-sm leading-7 text-body">{outcome.summary}</p>

          <div className="mt-6">
            <Eyebrow>Recommended next steps</Eyebrow>
            <ul className="mt-3 space-y-2.5">
              {outcome.actions.map((action) => (
                <li key={action} className="flex items-start gap-3 text-sm leading-6 text-body">
                  <FiCheck className={join("mt-1 size-4 shrink-0 stroke-[2.5]", tone.check)} aria-hidden="true" />
                  <span>{action}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {bars && (
          <div className="rounded-xl border border-line bg-inset p-4 sm:p-5">
            <Eyebrow>Probability distribution</Eyebrow>
            <div className="mt-4 space-y-4">
              {bars.map(([name, value]) => {
                const leading = name === outcome.label;
                return (
                  <div key={name}>
                    <div className="mb-1.5 flex items-center justify-between gap-3 text-xs">
                      <span className={leading ? "font-semibold text-strong" : "font-medium text-muted"}>{name}</span>
                      <span className="tabular-nums text-muted">{(value * 100).toFixed(1)}%</span>
                    </div>
                    <div className="h-1.5 overflow-hidden rounded-full bg-muted-surface">
                      <div
                        className={join("h-full rounded-full transition-[width] duration-300", leading ? tone.bar : "bg-line-strong")}
                        style={{ width: `${Math.max(value * 100, 1.5)}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      <div className="flex flex-col gap-4 border-t border-line-subtle bg-subtle px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <p className="max-w-2xl text-xs leading-5 text-muted">
          This is a screening aid, not a diagnosis. In an emergency, call 911 or 988.
        </p>
        <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
          <Link to="/resources" className={buttonClass({ variant: "secondary", size: "sm" })}>
            View resources
            <FiArrowRight aria-hidden="true" />
          </Link>
          {prediction === 2 && (
            <a href="tel:988" className={buttonClass({ variant: "danger", size: "sm" })}>
              <FiPhone aria-hidden="true" />
              Call 988 now
            </a>
          )}
        </div>
      </div>
    </section>
  );
}
