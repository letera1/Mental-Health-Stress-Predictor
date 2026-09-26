import {
  FiArrowUpRight,
  FiBookOpen,
  FiHeart,
  FiMessageSquare,
  FiPhone,
  FiShield,
  FiUsers,
} from "react-icons/fi";
import { Badge, Card, Eyebrow, Page, PageContent, PageHeader } from "../../Components/ui/primitives";

const CRISIS = [
  {
    name: "988 Suicide & Crisis Lifeline",
    description: "Free, confidential support for anyone in distress. Available 24 hours a day.",
    contact: "Call or text 988",
    href: "tel:988",
    icon: FiPhone,
  },
  {
    name: "Crisis Text Line",
    description: "Text-based crisis counselling when speaking out loud feels like too much.",
    contact: "Text HOME to 741741",
    href: "sms:741741&body=HOME",
    icon: FiMessageSquare,
  },
];

const ORGANISATIONS = [
  {
    name: "National Alliance on Mental Illness",
    short: "NAMI",
    description: "Education, peer support groups, and advocacy across the US.",
    url: "https://www.nami.org/Home",
    icon: FiUsers,
  },
  {
    name: "MentalHealth.gov",
    short: "US Gov",
    description: "Government guidance on recognising symptoms and finding treatment.",
    url: "https://www.mentalhealth.gov/",
    icon: FiBookOpen,
  },
  {
    name: "Active Minds",
    short: "Students",
    description: "Student-led mental health awareness on hundreds of campuses.",
    url: "https://www.activeminds.org/",
    icon: FiHeart,
  },
  {
    name: "The Jed Foundation",
    short: "Young adults",
    description: "Emotional health and suicide prevention for teens and young adults.",
    url: "https://jedfoundation.org/",
    icon: FiShield,
  },
];

const CAMPUS = [
  {
    name: "Campus counselling services",
    description: "Most universities offer a set number of free sessions each term.",
    action: "Start at your student health centre",
  },
  {
    name: "Student wellness programmes",
    description: "Workshops, peer support groups, and stress-management sessions.",
    action: "Check your campus wellness centre",
  },
  {
    name: "Academic support services",
    description: "Advisors can arrange extensions and adjust workloads during difficult periods.",
    action: "Contact academic advising",
  },
];

function SectionHeading({ eyebrow, title, description }) {
  return (
    <div className="mb-4 sm:mb-5">
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2 className="mt-2 font-display text-xl font-semibold tracking-[-0.02em] text-strong sm:text-2xl">
        {title}
      </h2>
      {description && <p className="mt-1.5 max-w-2xl text-sm leading-6 text-muted">{description}</p>}
    </div>
  );
}

export default function Resource() {
  return (
    <Page>
      <PageHeader
        title="Support resources"
        description="Vetted services for immediate help, ongoing guidance, and campus support."
      />

      <PageContent className="space-y-10 sm:space-y-12">
        <section aria-labelledby="crisis-title">
          <SectionHeading
            eyebrow="Immediate help"
            title="Available right now, 24/7"
            description="If you are in crisis, you do not need to handle it alone. These services are free and confidential."
          />
          <div className="grid gap-4 lg:grid-cols-2">
            {CRISIS.map(({ name, description, contact, href, icon: Icon }) => (
              <a
                key={name}
                href={href}
                className="group relative flex min-h-40 gap-4 overflow-hidden rounded-xl border border-danger/65 bg-surface p-5 transition hover:border-danger hover:bg-danger-soft/35 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-danger sm:gap-5 sm:p-6"
              >
                <span className="absolute inset-y-0 left-0 w-1 bg-danger" aria-hidden="true" />
                <span className="grid size-11 shrink-0 place-items-center rounded-lg bg-danger-soft text-danger">
                  <Icon className="size-5" aria-hidden="true" />
                </span>
                <span className="flex min-w-0 flex-1 flex-col">
                  <span className="font-display text-base font-semibold text-strong sm:text-lg">{name}</span>
                  <span className="mt-1.5 text-sm leading-6 text-muted">{description}</span>
                  <span className="mt-auto pt-4 text-sm font-semibold text-danger">{contact}</span>
                </span>
                <FiArrowUpRight className="size-4 shrink-0 text-danger transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
              </a>
            ))}
          </div>
        </section>

        <section aria-labelledby="national-title">
          <SectionHeading
            eyebrow="National organisations"
            title="Ongoing support and education"
            description="Established organisations with free information, treatment directories, and peer communities."
          />
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {ORGANISATIONS.map(({ name, short, description, url, icon: Icon }) => (
              <a
                key={name}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex min-h-48 flex-col rounded-xl border border-line bg-surface p-5 transition hover:border-line-strong hover:shadow-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
              >
                <div className="flex items-start justify-between gap-3">
                  <span className="grid size-10 place-items-center rounded-lg bg-accent-soft text-accent-ink">
                    <Icon className="size-[18px]" aria-hidden="true" />
                  </span>
                  <Badge>{short}</Badge>
                </div>
                <h3 className="mt-5 flex items-start gap-1.5 text-sm font-semibold leading-5 text-strong">
                  {name}
                  <FiArrowUpRight className="mt-0.5 size-3.5 shrink-0 text-faint transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent-ink" aria-hidden="true" />
                </h3>
                <p className="mt-2 text-sm leading-6 text-muted">{description}</p>
              </a>
            ))}
          </div>
        </section>

        <section aria-labelledby="campus-title">
          <SectionHeading
            eyebrow="On campus"
            title="Support you may already have access to"
            description="Usually free, confidential, and often available without a referral."
          />
          <Card>
            <ul className="divide-y divide-line-subtle">
              {CAMPUS.map(({ name, description, action }, index) => (
                <li
                  key={name}
                  className="grid gap-3 px-5 py-5 sm:grid-cols-[36px_minmax(0,1fr)] sm:px-6 lg:grid-cols-[36px_minmax(0,1fr)_minmax(220px,auto)] lg:items-center"
                >
                  <span className="grid size-9 place-items-center rounded-lg bg-subtle font-mono text-xs font-semibold text-muted">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="text-sm font-semibold text-strong">{name}</h3>
                    <p className="mt-1 text-sm leading-6 text-muted">{description}</p>
                  </div>
                  <span className="col-start-2 text-sm font-semibold text-accent-ink lg:col-start-auto lg:text-right">
                    {action}
                  </span>
                </li>
              ))}
            </ul>
          </Card>
        </section>

        <aside className="flex gap-4 rounded-xl border border-warning/50 bg-warning-soft px-5 py-5 sm:items-center sm:px-6">
          <span className="grid size-10 shrink-0 place-items-center rounded-lg bg-surface/70 text-warning">
            <FiPhone className="size-[18px]" aria-hidden="true" />
          </span>
          <div>
            <h2 className="text-sm font-semibold text-strong">If someone is in immediate danger</h2>
            <p className="mt-1 text-sm leading-6 text-body">
              Call 911 or go to the nearest emergency department. Do not leave the person alone.
            </p>
          </div>
        </aside>
      </PageContent>
    </Page>
  );
}
