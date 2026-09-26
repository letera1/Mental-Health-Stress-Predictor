import { FiArrowUpRight, FiBookOpen, FiHeart, FiMessageSquare, FiPhone, FiShield, FiUsers } from "react-icons/fi";
import "./resource.css";

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
    description: "Text-based crisis counselling if speaking out loud feels like too much.",
    contact: "Text HOME to 741741",
    href: "sms:741741&body=HOME",
    icon: FiMessageSquare,
  },
];

const ORGANISATIONS = [
  {
    name: "National Alliance on Mental Illness",
    description: "Education, peer support groups, and advocacy across the US.",
    url: "https://www.nami.org/Home",
    icon: FiUsers,
  },
  {
    name: "MentalHealth.gov",
    description: "Government guidance on recognising symptoms and finding treatment.",
    url: "https://www.mentalhealth.gov/",
    icon: FiBookOpen,
  },
  {
    name: "Active Minds",
    description: "Student-led mental health awareness on hundreds of campuses.",
    url: "https://www.activeminds.org/",
    icon: FiHeart,
  },
  {
    name: "The Jed Foundation",
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

export default function Resource() {
  return (
    <div className="resources">
      <header className="page-head">
        <div className="page-head__inner">
          <div>
            <h1 className="page-head__title">Resources</h1>
            <p className="page-head__sub">
              Vetted support services. Reaching out early is a practical decision, not a last
              resort.
            </p>
          </div>
        </div>
      </header>

      <div className="page resources__body">
        <section className="crisis">
          <div className="crisis__head">
            <span className="tag tag--urgent">Immediate help</span>
            <h2 className="crisis__title">Available right now, 24/7</h2>
          </div>
          <div className="crisis__grid">
            {CRISIS.map(({ name, description, contact, href, icon: Icon }) => (
              <a key={name} href={href} className="crisis-card">
                <span className="crisis-card__icon">
                  <Icon aria-hidden="true" />
                </span>
                <div className="crisis-card__body">
                  <h3 className="crisis-card__name">{name}</h3>
                  <p className="crisis-card__desc">{description}</p>
                  <span className="crisis-card__contact">{contact}</span>
                </div>
              </a>
            ))}
          </div>
        </section>

        <section>
          <SectionHead
            eyebrow="National organisations"
            title="Ongoing support and education"
            sub="Established non-profits with free information, directories, and peer communities."
          />
          <div className="link-grid">
            {ORGANISATIONS.map(({ name, description, url, icon: Icon }) => (
              <a
                key={name}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="link-card"
              >
                <span className="link-card__icon">
                  <Icon aria-hidden="true" />
                </span>
                <div>
                  <h3 className="link-card__name">
                    {name}
                    <FiArrowUpRight aria-hidden="true" />
                  </h3>
                  <p className="link-card__desc">{description}</p>
                </div>
              </a>
            ))}
          </div>
        </section>

        <section>
          <SectionHead
            eyebrow="On campus"
            title="Support you already have access to"
            sub="Usually free, usually underused."
          />
          <ul className="campus">
            {CAMPUS.map(({ name, description, action }) => (
              <li key={name} className="campus__row">
                <div>
                  <h3 className="campus__name">{name}</h3>
                  <p className="campus__desc">{description}</p>
                </div>
                <span className="campus__action">{action}</span>
              </li>
            ))}
          </ul>
        </section>

        <aside className="notice">
          <FiPhone className="notice__icon" aria-hidden="true" />
          <div>
            <h3 className="notice__title">If someone is in immediate danger</h3>
            <p className="notice__text">
              Call 911 or go to the nearest emergency department. Do not leave the person alone.
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}

function SectionHead({ eyebrow, title, sub }) {
  return (
    <div className="section-head">
      <p className="eyebrow">{eyebrow}</p>
      <h2 className="section-head__title">{title}</h2>
      <p className="section-head__sub">{sub}</p>
    </div>
  );
}
