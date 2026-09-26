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
import { Card, CardHeader, Eyebrow, Page, PageContent, PageHeader } from "../../Components/ui/primitives";
import { buttonClass, join } from "../../Components/ui/styles";
import { OUTCOMES } from "../../lib/assessment";
import { clearHistory, formatWhen, readHistory, summarise } from "../../lib/history";

const TONES = {
  ok: { text: "text-success", dot: "bg-success" },
  warn: { text: "text-warning", dot: "bg-warning" },
  bad: { text: "text-danger", dot: "bg-danger" },
};

export default function Dashboard() {
  const [history, setHistory] = useState(readHistory);
  const stats = useMemo(() => summarise(history), [history]);

  const trend = useMemo(
    () =>
      [...history]
        .reverse()
        .slice(-12)
        .map((entry) => ({
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
      <Page>
        <PageHeader
          title="Dashboard"
          description="Your private assessment history, stored only on this device."
        />
        <PageContent>
          <div className="grid min-h-[460px] place-items-center rounded-2xl border border-dashed border-line-strong bg-surface px-5 py-16 text-center">
            <div className="flex max-w-lg flex-col items-center">
              <span className="grid size-14 place-items-center rounded-xl bg-accent-soft text-accent-ink">
                <FiActivity className="size-6" aria-hidden="true" />
              </span>
              <h2 className="mt-6 font-display text-2xl font-semibold tracking-[-0.025em] text-strong">
                No assessments yet
              </h2>
              <p className="mt-3 text-sm leading-7 text-muted sm:text-base">
                Complete an assessment to see real results and trends here. History remains inside
                this browser and can be cleared at any time.
              </p>
              <Link to="/predict" className={buttonClass({ size: "lg", className: "mt-6" })}>
                Start your first assessment
                <FiArrowRight aria-hidden="true" />
              </Link>
            </div>
          </div>
        </PageContent>
      </Page>
    );
  }

  const latestOutcome = OUTCOMES[stats.latest.prediction];
  const latestTone = TONES[latestOutcome.tone];

  return (
    <Page>
      <PageHeader
        title="Dashboard"
        description={`${stats.total} assessment${stats.total === 1 ? "" : "s"} stored on this device.`}
        actions={
          <>
            <button
              type="button"
              className={buttonClass({ variant: "secondary", size: "sm" })}
              onClick={() => setHistory(clearHistory())}
            >
              <FiTrash2 aria-hidden="true" />
              Clear history
            </button>
            <Link to="/predict" className={buttonClass({ size: "sm" })}>
              New assessment
            </Link>
          </>
        }
      />

      <PageContent className="space-y-6">
        <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4" aria-label="Wellness summary">
          <Card as="article" className="p-5 sm:p-6">
            <Eyebrow>Latest result</Eyebrow>
            <p className={join("mt-4 font-display text-2xl font-semibold tracking-[-0.03em]", latestTone.text)}>
              {latestOutcome.label}
            </p>
            <p className="mt-2 text-sm text-muted">
              {formatWhen(stats.latest.at)}
              {typeof stats.latest.confidence === "number" && (
                <>
                  {" · "}
                  <span className="tabular-nums">{Math.round(stats.latest.confidence * 100)}%</span>{" "}
                  confidence
                </>
              )}
            </p>
          </Card>

          <Metric
            icon={FiZap}
            label="Average stress"
            value={stats.avgStress?.toFixed(1)}
            suffix="/ 5"
          />
          <Metric
            icon={FiMoon}
            label="Average sleep"
            value={stats.avgSleep?.toFixed(1)}
            suffix="hrs"
          />
          <Metric
            icon={FiTrendingUp}
            label="Average steps"
            value={stats.avgSteps ? Math.round(stats.avgSteps).toLocaleString() : null}
            suffix="/ day"
          />
        </section>

        <div className="grid gap-6 xl:grid-cols-[minmax(0,1.6fr)_minmax(360px,0.8fr)]">
          <Card className="min-w-0">
            <CardHeader
              title="Stress and sleep over time"
              description={`Last ${trend.length} assessment${trend.length === 1 ? "" : "s"}`}
            />
            <div className="h-[300px] min-w-0 px-2 py-5 sm:px-5">
              {trend.length < 2 ? (
                <div className="grid h-full place-items-center px-4 text-center text-sm text-muted">
                  Complete at least two assessments to see a trend line.
                </div>
              ) : (
                <ResponsiveContainer width="100%" height="100%">
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
                        borderRadius: "10px",
                        color: "var(--text-body)",
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
            </div>
          </Card>

          <Card>
            <CardHeader title="Recent assessments" description="Most recent activity on this device." />
            <ul className="divide-y divide-line-subtle px-5 sm:px-6">
              {history.slice(0, 8).map((entry) => {
                const outcome = OUTCOMES[entry.prediction];
                const tone = TONES[outcome?.tone] ?? TONES.warn;
                return (
                  <li key={entry.id} className="grid grid-cols-[8px_minmax(0,1fr)_auto] items-center gap-x-3 gap-y-1 py-4">
                    <span className={join("size-2 rounded-full", tone.dot)} aria-hidden="true" />
                    <span className="text-sm font-semibold text-strong">{outcome?.label ?? "Unknown"}</span>
                    <span className="text-xs text-faint">{formatWhen(entry.at)}</span>
                    <span className="col-start-2 col-end-4 text-xs tabular-nums text-muted">
                      Stress {entry.inputs?.Stress_Level} · Sleep {entry.inputs?.Sleep_Hours}h
                    </span>
                  </li>
                );
              })}
            </ul>
          </Card>
        </div>
      </PageContent>
    </Page>
  );
}

function Metric({ icon: Icon, label, value, suffix }) {
  return (
    <Card as="article" className="p-5 sm:p-6">
      <div className="flex items-center gap-2.5">
        <span className="grid size-8 place-items-center rounded-lg bg-subtle text-muted">
          <Icon className="size-4" aria-hidden="true" />
        </span>
        <Eyebrow>{label}</Eyebrow>
      </div>
      <p className="mt-5 font-display text-3xl font-semibold tabular-nums tracking-[-0.035em] text-strong">
        {value ?? "—"}
        {value && <span className="ml-2 font-sans text-xs font-medium tracking-normal text-faint">{suffix}</span>}
      </p>
    </Card>
  );
}
