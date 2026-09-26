import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  FiActivity,
  FiArrowRight,
  FiMoon,
  FiTrash2,
  FiTrendingUp,
  FiZap,
} from "react-icons/fi";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { OUTCOMES } from "../../lib/assessment";
import { clearHistory, formatWhen, readHistory, summarise } from "../../lib/history";
import "./Dashboard.css";

const TONE_VAR = { ok: "var(--ok)", warn: "var(--warn)", bad: "var(--bad)" };

export default function Dashboard() {
  const [history, setHistory] = useState(readHistory);
  const stats = useMemo(() => summarise(history), [history]);

  const trend = useMemo(
    () =>
      [...history]
        .reverse()
        .slice(-12)
        .map((entry, index) => ({
          index: index + 1,
          stress: entry.inputs?.Stress_Level ?? null,
          sleep: entry.inputs?.Sleep_Hours ?? null,
          label: new Date(entry.at).toLocaleDateString(undefined, {
            month: "short",
            day: "numeric",
          }),
        })),
    [history]
  );

  if (!stats) {
    return (
      <div className="dash">
        <header className="page-head">
          <div>
            <h1 className="page-head__title">Dashboard</h1>
            <p className="page-head__sub">Your assessment history, stored only on this device.</p>
          </div>
        </header>

        <div className="page">
          <div className="empty">
            <span className="empty__icon">
              <FiActivity aria-hidden="true" />
            </span>
            <h2 className="empty__title">No assessments yet</h2>
            <p className="empty__text">
              Once you complete an assessment, your results and trends appear here. Nothing is
              uploaded &mdash; history lives in this browser only and you can clear it at any time.
            </p>
            <Link to="/predict" className="btn btn--primary btn--lg">
              Start your first assessment
              <FiArrowRight aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const latestOutcome = OUTCOMES[stats.latest.prediction];

  return (
    <div className="dash">
      <header className="page-head">
        <div>
          <h1 className="page-head__title">Dashboard</h1>
          <p className="page-head__sub">
            {stats.total} assessment{stats.total === 1 ? "" : "s"} recorded on this device.
          </p>
        </div>
        <div className="page-head__actions">
          <button
            type="button"
            className="btn btn--ghost"
            onClick={() => setHistory(clearHistory())}
          >
            <FiTrash2 aria-hidden="true" />
            Clear history
          </button>
          <Link to="/predict" className="btn btn--primary">
            New assessment
          </Link>
        </div>
      </header>

      <div className="page dash__body">
        <section className="metrics">
          <article className="metric metric--status">
            <p className="eyebrow">Latest result</p>
            <p
              className="metric__value metric__value--status"
              style={{ color: TONE_VAR[latestOutcome.tone] }}
            >
              {latestOutcome.label}
            </p>
            <p className="metric__foot">
              {formatWhen(stats.latest.at)}
              {typeof stats.latest.confidence === "number" && (
                <>
                  {" · "}
                  <span className="tnum">{Math.round(stats.latest.confidence * 100)}%</span>{" "}
                  confidence
                </>
              )}
            </p>
          </article>

          <Metric
            icon={<FiZap aria-hidden="true" />}
            label="Average stress"
            value={stats.avgStress?.toFixed(1)}
            suffix="/ 5"
          />
          <Metric
            icon={<FiMoon aria-hidden="true" />}
            label="Average sleep"
            value={stats.avgSleep?.toFixed(1)}
            suffix="hrs"
          />
          <Metric
            icon={<FiTrendingUp aria-hidden="true" />}
            label="Average steps"
            value={stats.avgSteps ? Math.round(stats.avgSteps).toLocaleString() : null}
            suffix="/ day"
          />
        </section>

        <section className="panel">
          <div className="panel__head">
            <h2 className="panel__title">Stress and sleep over time</h2>
            <p className="panel__sub">
              Last {trend.length} assessment{trend.length === 1 ? "" : "s"}
            </p>
          </div>

          {trend.length < 2 ? (
            <p className="panel__placeholder">
              Complete at least two assessments to see a trend line.
            </p>
          ) : (
            <ResponsiveContainer width="100%" height={260}>
              <AreaChart data={trend} margin={{ top: 8, right: 8, bottom: 0, left: -20 }}>
                <defs>
                  <linearGradient id="stressFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--accent)" stopOpacity={0.18} />
                    <stop offset="100%" stopColor="var(--accent)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="var(--border-subtle)" vertical={false} />
                <XAxis
                  dataKey="label"
                  stroke="var(--text-faint)"
                  tickLine={false}
                  axisLine={false}
                  tick={{ fontSize: 11 }}
                />
                <YAxis
                  stroke="var(--text-faint)"
                  tickLine={false}
                  axisLine={false}
                  tick={{ fontSize: 11 }}
                />
                <Tooltip
                  contentStyle={{
                    background: "var(--bg-surface)",
                    border: "1px solid var(--border)",
                    borderRadius: "8px",
                    fontSize: "13px",
                    boxShadow: "var(--shadow-md)",
                  }}
                  labelStyle={{ color: "var(--text-muted)" }}
                />
                <Area
                  type="monotone"
                  dataKey="stress"
                  name="Stress (1-5)"
                  stroke="var(--accent)"
                  strokeWidth={2}
                  fill="url(#stressFill)"
                />
                <Area
                  type="monotone"
                  dataKey="sleep"
                  name="Sleep (hrs)"
                  stroke="var(--info)"
                  strokeWidth={2}
                  fill="none"
                />
              </AreaChart>
            </ResponsiveContainer>
          )}
        </section>

        <section className="panel">
          <div className="panel__head">
            <h2 className="panel__title">Recent assessments</h2>
          </div>
          <ul className="log">
            {history.slice(0, 8).map((entry) => {
              const outcome = OUTCOMES[entry.prediction];
              return (
                <li key={entry.id} className="log__row">
                  <span
                    className="log__dot"
                    style={{ background: TONE_VAR[outcome?.tone] }}
                    aria-hidden="true"
                  />
                  <span className="log__label">{outcome?.label ?? "Unknown"}</span>
                  <span className="log__meta tnum">
                    Stress {entry.inputs?.Stress_Level} · Sleep {entry.inputs?.Sleep_Hours}h
                  </span>
                  <span className="log__when">{formatWhen(entry.at)}</span>
                </li>
              );
            })}
          </ul>
        </section>
      </div>
    </div>
  );
}

function Metric({ icon, label, value, suffix }) {
  return (
    <article className="metric">
      <div className="metric__head">
        <span className="metric__icon">{icon}</span>
        <p className="eyebrow">{label}</p>
      </div>
      <p className="metric__value tnum">
        {value ?? "—"}
        {value && <span className="metric__suffix">{suffix}</span>}
      </p>
    </article>
  );
}
