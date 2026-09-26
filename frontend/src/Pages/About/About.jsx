import { Link } from "react-router-dom";
import {
  FiArrowRight,
  FiCpu,
  FiDatabase,
  FiLayers,
  FiLock,
  FiServer,
  FiTrendingUp,
} from "react-icons/fi";
import { Card, CardHeader, Eyebrow, Page, PageContent, PageHeader } from "../../Components/ui/primitives";
import { buttonClass } from "../../Components/ui/styles";

const PILLARS = [
  {
    icon: FiCpu,
    title: "Ensemble modelling",
    body: "Five classifiers vote on every assessment. Averaging their probabilities is more stable than trusting one model.",
  },
  {
    icon: FiLock,
    title: "Private by default",
    body: "Responses are held only for the request. History, when enabled, stays inside your browser.",
  },
  {
    icon: FiTrendingUp,
    title: "Balanced evaluation",
    body: "The model is tuned on balanced accuracy so uncommon outcomes are not quietly ignored.",
  },
  {
    icon: FiLayers,
    title: "Student context",
    body: "The inputs reflect pressures that shape student wellbeing: sleep, workload, activity, and mood.",
  },
];

const STACK = [
  { icon: FiCpu, label: "Model", value: "Soft-voting ensemble", detail: "scikit-learn 1.6" },
  { icon: FiServer, label: "API", value: "Flask 3", detail: "Gunicorn runtime" },
  { icon: FiLayers, label: "Interface", value: "React 19", detail: "Vite + Tailwind CSS" },
  { icon: FiDatabase, label: "Training", value: "500 records", detail: "Anonymised dataset" },
];

const LIMITS = [
  {
    title: "Not a diagnosis",
    body: "A screening signal only. Diagnosis requires a clinician who can assess the full context.",
  },
  {
    title: "A small training sample",
    body: "The model learned from 500 records. Treat the result as a prompt to reflect, never a verdict.",
  },
  {
    title: "Confidence is not certainty",
    body: "High confidence means the classifiers agreed; it does not guarantee the outcome is correct.",
  },
  {
    title: "Emergencies need people",
    body: "If you are in crisis, call 911 or 988. Software is not the right tool for that moment.",
  },
];

export default function About() {
  return (
    <Page>
      <PageHeader title="About MindCare" description="How the assessment works, what it protects, and where it stops." />

      <PageContent className="space-y-6 sm:space-y-8">
        <section className="grid overflow-hidden rounded-2xl border border-line bg-surface lg:grid-cols-[minmax(0,1.35fr)_minmax(320px,0.65fr)]">
          <div className="flex flex-col justify-center px-5 py-8 sm:px-8 sm:py-10 lg:px-10 lg:py-12">
            <Eyebrow>Our approach</Eyebrow>
            <h2 className="mt-4 max-w-3xl font-display text-3xl font-semibold leading-[1.15] tracking-[-0.035em] text-strong sm:text-4xl lg:text-[42px]">
              Screening should be immediate, private, and honest about uncertainty.
            </h2>
            <p className="mt-5 max-w-2xl text-[15px] leading-7 text-body sm:text-base">
              MindCare turns ten routine indicators into a calibrated risk signal in about two
              minutes. It shortens the gap between “something feels off” and talking to someone who
              can help. It does not replace that conversation.
            </p>
          </div>

          <div className="grid grid-cols-3 border-t border-line bg-subtle lg:grid-cols-1 lg:border-l lg:border-t-0">
            {[
              ["10", "indicators"],
              ["5", "classifiers"],
              ["0", "server records"],
            ].map(([value, label]) => (
              <div
                key={label}
                className="flex flex-col justify-center border-r border-line px-4 py-6 last:border-r-0 lg:border-b lg:border-r-0 lg:last:border-b-0 lg:px-8"
              >
                <span className="font-display text-3xl font-semibold tabular-nums tracking-[-0.03em] text-accent-ink sm:text-4xl">
                  {value}
                </span>
                <span className="mt-1 text-xs font-semibold uppercase tracking-[0.08em] text-muted">
                  {label}
                </span>
              </div>
            ))}
          </div>
        </section>

        <section aria-labelledby="pillars-title">
          <div className="mb-4 sm:mb-5">
            <Eyebrow>Design principles</Eyebrow>
            <h2 id="pillars-title" className="mt-2 font-display text-xl font-semibold text-strong sm:text-2xl">
              Built around trust, not novelty
            </h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {PILLARS.map(({ icon: Icon, title, body }) => (
              <Card key={title} as="article" className="p-5 transition hover:border-line-strong hover:shadow-sm sm:p-6">
                <span className="grid size-10 place-items-center rounded-lg border border-accent/15 bg-accent-soft text-accent-ink">
                  <Icon className="size-[18px]" aria-hidden="true" />
                </span>
                <h3 className="mt-5 text-sm font-semibold text-strong">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-muted">{body}</p>
              </Card>
            ))}
          </div>
        </section>

        <div className="grid gap-6 xl:grid-cols-2">
          <Card>
            <CardHeader
              title="Under the hood"
              description="A transparent view of the production stack."
            />
            <ul className="divide-y divide-line-subtle px-5 sm:px-6">
              {STACK.map(({ icon: Icon, label, value, detail }) => (
                <li key={label} className="grid grid-cols-[36px_1fr] items-center gap-3 py-4 sm:grid-cols-[36px_110px_1fr_auto]">
                  <span className="grid size-9 place-items-center rounded-lg bg-subtle text-muted">
                    <Icon className="size-4" aria-hidden="true" />
                  </span>
                  <span className="text-xs font-semibold uppercase tracking-[0.08em] text-faint sm:text-sm sm:normal-case sm:tracking-normal sm:text-muted">
                    {label}
                  </span>
                  <span className="col-start-2 text-sm font-semibold text-strong sm:col-start-auto">{value}</span>
                  <span className="col-start-2 text-xs text-muted sm:col-start-auto sm:text-right">{detail}</span>
                </li>
              ))}
            </ul>
          </Card>

          <Card>
            <CardHeader
              title="What this tool cannot do"
              description="The limits matter more than the feature list."
            />
            <div className="grid gap-x-6 gap-y-5 p-5 sm:grid-cols-2 sm:p-6">
              {LIMITS.map(({ title, body }) => (
                <div key={title} className="border-l-2 border-warning pl-4">
                  <h3 className="text-sm font-semibold text-strong">{title}</h3>
                  <p className="mt-1 text-sm leading-6 text-muted">{body}</p>
                </div>
              ))}
            </div>
          </Card>
        </div>

        <section className="flex flex-col gap-5 rounded-xl border border-line bg-subtle px-5 py-6 sm:flex-row sm:items-center sm:justify-between sm:px-7">
          <div>
            <h2 className="font-display text-xl font-semibold text-strong">Ready when you are</h2>
            <p className="mt-1 text-sm text-muted">Two minutes, ten questions, no account required.</p>
          </div>
          <div className="flex flex-col gap-2 sm:flex-row">
            <Link to="/predict" className={buttonClass({ size: "lg" })}>
              Start assessment
              <FiArrowRight aria-hidden="true" />
            </Link>
            <Link to="/resources" className={buttonClass({ variant: "secondary", size: "lg" })}>
              Browse resources
            </Link>
          </div>
        </section>
      </PageContent>
    </Page>
  );
}
