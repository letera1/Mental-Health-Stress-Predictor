import { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  FiActivity,
  FiBookOpen,
  FiGrid,
  FiInfo,
  FiMenu,
  FiMoon,
  FiSettings,
  FiSun,
  FiX,
} from "react-icons/fi";
import { useTheme } from "../../theme/theme-context";
import "./Sidebar.css";

const SECTIONS = [
  {
    label: "Overview",
    items: [
      { to: "/", icon: FiGrid, label: "Dashboard", end: true },
      { to: "/predict", icon: FiActivity, label: "Assessment" },
    ],
  },
  {
    label: "Support",
    items: [
      { to: "/resources", icon: FiBookOpen, label: "Resources" },
      { to: "/about", icon: FiInfo, label: "About" },
      { to: "/settings", icon: FiSettings, label: "Settings" },
    ],
  },
];

function BrandMark() {
  return (
    <svg className="brand__mark" viewBox="0 0 28 28" aria-hidden="true">
      <rect width="28" height="28" rx="8" fill="currentColor" />
      <path
        d="M7 17.5c2.1 0 2.1-4 4.2-4s2.1 4 4.2 4 2.1-7 4.2-7"
        fill="none"
        stroke="var(--bg-surface)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function Sidebar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  return (
    <>
      <header className="mobile-bar">
        <button
          type="button"
          className="icon-btn"
          onClick={() => setMobileOpen((open) => !open)}
          aria-label={mobileOpen ? "Close navigation" : "Open navigation"}
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <FiX /> : <FiMenu />}
        </button>
        <span className="mobile-bar__brand">
          <BrandMark />
          MindCare
        </span>
      </header>

      {mobileOpen && (
        <div className="sidebar-scrim" onClick={() => setMobileOpen(false)} aria-hidden="true" />
      )}

      <aside className={`sidebar${mobileOpen ? " sidebar--open" : ""}`}>
        <div className="sidebar__brand">
          <BrandMark />
          <span className="brand__name">MindCare</span>
        </div>

        <nav className="sidebar__nav" aria-label="Primary">
          {SECTIONS.map((section) => (
            <div key={section.label} className="nav-group">
              <p className="eyebrow nav-group__label">{section.label}</p>
              <ul className="nav-group__list">
                {section.items.map(({ to, icon: Icon, label, end }) => (
                  <li key={to}>
                    <NavLink
                      to={to}
                      end={end}
                      onClick={() => setMobileOpen(false)}
                      className={({ isActive }) => `nav-link${isActive ? " nav-link--active" : ""}`}
                    >
                      <Icon className="nav-link__icon" aria-hidden="true" />
                      <span>{label}</span>
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>

        <div className="sidebar__foot">
          <button type="button" className="theme-switch" onClick={toggleTheme}>
            {theme === "dark" ? <FiSun aria-hidden="true" /> : <FiMoon aria-hidden="true" />}
            <span>{theme === "dark" ? "Light mode" : "Dark mode"}</span>
          </button>
          <p className="sidebar__note">
            Assessments run in memory. Nothing is sent to a server for storage.
          </p>
        </div>
      </aside>
    </>
  );
}

export default Sidebar;
