import { useRef, useState } from "react";
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

const STORAGE_KEY = "mindcare.sidebarWidth";
const DEFAULT_WIDTH = 248;
const MIN_WIDTH = 216;
const MAX_WIDTH = 320;

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

const clampWidth = (value) => Math.round(Math.min(MAX_WIDTH, Math.max(MIN_WIDTH, value)));

function readWidth() {
  try {
    const stored = Number(localStorage.getItem(STORAGE_KEY));
    return Number.isFinite(stored) && stored > 0 ? clampWidth(stored) : DEFAULT_WIDTH;
  } catch {
    return DEFAULT_WIDTH;
  }
}

function BrandMark({ compact = false }) {
  const size = compact ? "size-6" : "size-7";
  return (
    <svg className={`${size} shrink-0 text-accent`} viewBox="0 0 28 28" aria-hidden="true">
      <rect width="28" height="28" rx="8" fill="currentColor" />
      <path
        d="M7 17.5c2.1 0 2.1-4 4.2-4s2.1 4 4.2 4 2.1-7 4.2-7"
        fill="none"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function Sidebar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [width, setWidth] = useState(readWidth);
  const drag = useRef(null);
  const menuButton = useRef(null);
  const { theme, toggleTheme } = useTheme();

  const closeMobile = ({ restoreFocus = false } = {}) => {
    setMobileOpen(false);
    if (restoreFocus) window.requestAnimationFrame(() => menuButton.current?.focus());
  };

  const persistWidth = (nextWidth) => {
    const clamped = clampWidth(nextWidth);
    setWidth(clamped);
    try {
      localStorage.setItem(STORAGE_KEY, String(clamped));
    } catch {
      // Persistence is optional when browser storage is unavailable.
    }
  };

  const startResize = (event) => {
    event.preventDefault();
    drag.current = { startX: event.clientX, startWidth: width };

    const move = (moveEvent) => {
      if (!drag.current) return;
      persistWidth(drag.current.startWidth + moveEvent.clientX - drag.current.startX);
    };

    const stop = () => {
      drag.current = null;
      document.body.style.removeProperty("cursor");
      document.body.style.removeProperty("user-select");
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", stop);
    };

    document.body.style.cursor = "col-resize";
    document.body.style.userSelect = "none";
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", stop, { once: true });
  };

  const resizeWithKeyboard = (event) => {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      persistWidth(width - 8);
    }
    if (event.key === "ArrowRight") {
      event.preventDefault();
      persistWidth(width + 8);
    }
    if (event.key === "Home") {
      event.preventDefault();
      persistWidth(MIN_WIDTH);
    }
    if (event.key === "End") {
      event.preventDefault();
      persistWidth(MAX_WIDTH);
    }
  };

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 flex h-14 items-center gap-3 border-b border-line bg-surface px-4 lg:hidden">
        <button
          ref={menuButton}
          type="button"
          onClick={() => setMobileOpen((open) => !open)}
          className="grid size-9 place-items-center rounded-lg border border-line text-muted transition hover:bg-subtle hover:text-strong focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          aria-label={mobileOpen ? "Close navigation" : "Open navigation"}
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <FiX className="size-4.5" /> : <FiMenu className="size-4.5" />}
        </button>
        <span className="flex items-center gap-2 font-display text-[15px] font-semibold text-strong">
          <BrandMark compact />
          MindCare
        </span>
      </header>

      {mobileOpen && (
        <button
          type="button"
          className="fixed inset-0 z-40 bg-slate-950/55 backdrop-blur-[2px] lg:hidden"
          onClick={() => closeMobile({ restoreFocus: true })}
          aria-label="Close navigation"
        />
      )}

      <aside
        style={{ "--sidebar-width": `${width}px` }}
        className={`fixed inset-y-0 left-0 z-50 flex w-[min(86vw,18rem)] shrink-0 flex-col border-r border-line bg-surface transition-transform duration-200 lg:sticky lg:top-0 lg:h-screen lg:w-(--sidebar-width) lg:translate-x-0 ${
          mobileOpen ? "translate-x-0 shadow-2xl" : "-translate-x-full"
        }`}
      >
        <div className="flex h-16 shrink-0 items-center gap-3 border-b border-line-subtle px-5">
          <BrandMark />
          <span className="font-display text-lg font-semibold tracking-[-0.015em] text-strong">
            MindCare
          </span>
          <button
            type="button"
            onClick={() => closeMobile({ restoreFocus: true })}
            className="ml-auto grid size-8 place-items-center rounded-md text-muted hover:bg-subtle hover:text-strong lg:hidden"
            aria-label="Close navigation"
          >
            <FiX className="size-4.25" />
          </button>
        </div>

        <nav className="flex flex-1 flex-col gap-7 overflow-y-auto px-3 py-6" aria-label="Primary">
          {SECTIONS.map((section) => (
            <div key={section.label}>
              <p className="mb-2 px-3 text-[11px] font-semibold uppercase tracking-[0.08em] text-faint">
                {section.label}
              </p>
              <ul className="space-y-1">
                {section.items.map(({ to, icon: Icon, label, end }) => (
                  <li key={to}>
                    <NavLink
                      to={to}
                      end={end}
                      onClick={() => closeMobile()}
                      className={({ isActive }) =>
                        `flex h-10 items-center gap-3 rounded-lg px-3 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${
                          isActive
                            ? "bg-accent-soft text-accent-ink"
                            : "text-muted hover:bg-subtle hover:text-strong"
                        }`
                      }
                    >
                      <Icon className="size-4.25 shrink-0" aria-hidden="true" />
                      <span className="truncate">{label}</span>
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>

        <div className="shrink-0 space-y-3 border-t border-line-subtle p-4">
          <button
            type="button"
            onClick={toggleTheme}
            className="flex h-10 w-full items-center gap-3 rounded-lg border border-line px-3 text-sm font-medium text-body transition hover:border-line-strong hover:bg-subtle hover:text-strong"
          >
            {theme === "dark" ? (
              <FiSun className="size-4" aria-hidden="true" />
            ) : (
              <FiMoon className="size-4" aria-hidden="true" />
            )}
            <span>{theme === "dark" ? "Light mode" : "Dark mode"}</span>
          </button>
          <p className="px-2 text-center text-xs leading-5 text-muted">
            Private by design. Nothing is stored on a server.
          </p>
        </div>

        <div
          role="separator"
          aria-label="Resize sidebar"
          aria-orientation="vertical"
          aria-valuemin={MIN_WIDTH}
          aria-valuemax={MAX_WIDTH}
          aria-valuenow={width}
          tabIndex={0}
          onPointerDown={startResize}
          onKeyDown={resizeWithKeyboard}
          onDoubleClick={() => persistWidth(DEFAULT_WIDTH)}
          className="group absolute inset-y-0 -right-1 hidden w-2 cursor-col-resize touch-none items-center justify-center outline-none lg:flex"
          title="Drag to resize; double-click to reset"
        >
          <span className="h-full w-px bg-transparent transition-colors group-hover:bg-accent group-focus-visible:bg-accent" />
        </div>
      </aside>
    </>
  );
}
