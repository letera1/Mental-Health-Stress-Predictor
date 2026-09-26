import { useEffect, useState } from "react";
import { FiCheck, FiCpu, FiMonitor, FiTrash2 } from "react-icons/fi";
import { Badge, Card, CardHeader, Page, PageContent, PageHeader } from "../../Components/ui/primitives";
import { buttonClass, join } from "../../Components/ui/styles";
import { clearHistory, readHistory } from "../../lib/history";
import { useTheme } from "../../theme/theme-context";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "/api";
const THEMES = [
  { value: "light", label: "Light", hint: "Best for bright and shared spaces" },
  { value: "dark", label: "Dark", hint: "Reduced glare for low-light use" },
];

function ThemePreview({ variant }) {
  const dark = variant === "dark";
  return (
    <span
      className={join(
        "flex h-24 gap-2 overflow-hidden rounded-lg border p-2",
        dark ? "border-[#26323d] bg-[#0b1117]" : "border-slate-200 bg-slate-50"
      )}
      aria-hidden="true"
    >
      <span
        className={join(
          "flex w-[29%] flex-col gap-1.5 rounded-md border p-2",
          dark ? "border-[#26323d] bg-[#121a22]" : "border-slate-200 bg-white"
        )}
      >
        <span className={join("size-3 rounded", dark ? "bg-teal-400" : "bg-teal-700")} />
        {["w-full", "w-4/5", "w-2/3"].map((width) => (
          <span
            key={width}
            className={join("h-1 rounded-full", width, dark ? "bg-slate-700" : "bg-slate-300")}
          />
        ))}
      </span>
      <span className="flex flex-1 flex-col gap-2 py-1">
        <span className={join("h-2 w-2/5 rounded", dark ? "bg-teal-400" : "bg-teal-700")} />
        <span
          className={join(
            "flex-1 rounded-md border",
            dark ? "border-[#26323d] bg-[#121a22]" : "border-slate-200 bg-white"
          )}
        />
        <span
          className={join(
            "flex-1 rounded-md border",
            dark ? "border-[#26323d] bg-[#121a22]" : "border-slate-200 bg-white"
          )}
        />
      </span>
    </span>
  );
}

function SettingRow({ title, description, children }) {
  return (
    <div className="flex flex-col gap-3 border-t border-line-subtle py-4 first:border-t-0 first:pt-0 last:pb-0 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
      <div className="min-w-0">
        <h3 className="text-sm font-semibold text-strong">{title}</h3>
        <p className="mt-1 max-w-2xl text-sm leading-6 text-muted">{description}</p>
      </div>
      <div className="shrink-0">{children}</div>
    </div>
  );
}

export default function Settings() {
  const { theme, setTheme } = useTheme();
  const [count, setCount] = useState(() => readHistory().length);
  const [cleared, setCleared] = useState(false);
  const [service, setService] = useState({ state: "loading" });

  useEffect(() => {
    let active = true;
    fetch(`${API_BASE_URL}/health`)
      .then((response) => (response.ok ? response.json() : Promise.reject(response)))
      .then((data) => active && setService({ state: "ok", ...data }))
      .catch(() => active && setService({ state: "down" }));
    return () => {
      active = false;
    };
  }, []);

  const handleClear = () => {
    clearHistory();
    setCount(0);
    setCleared(true);
    window.setTimeout(() => setCleared(false), 2600);
  };

  const statusTone = service.state === "ok" ? "success" : service.state === "down" ? "danger" : "neutral";

  return (
    <Page>
      <PageHeader title="Settings" description="Appearance, privacy, and service status." />

      <PageContent className="grid gap-6 xl:grid-cols-[minmax(0,1.25fr)_minmax(340px,0.75fr)]">
        <div className="space-y-6">
          <Card>
            <CardHeader
              title="Appearance"
              description="Your preference applies instantly and stays on this browser."
            />
            <div className="grid gap-3 p-4 sm:grid-cols-2 sm:p-6">
              {THEMES.map(({ value, label, hint }) => {
                const selected = theme === value;
                return (
                  <button
                    key={value}
                    type="button"
                    role="radio"
                    aria-checked={selected}
                    onClick={() => setTheme(value)}
                    className={join(
                      "relative rounded-xl border p-3 text-left transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent",
                      selected
                        ? "border-accent ring-2 ring-accent/15"
                        : "border-line hover:border-line-strong"
                    )}
                  >
                    <ThemePreview variant={value} />
                    <span className="mt-3 flex items-start justify-between gap-3 px-1">
                      <span>
                        <span className="block text-sm font-semibold text-strong">{label}</span>
                        <span className="mt-0.5 block text-xs leading-5 text-muted">{hint}</span>
                      </span>
                      <span
                        className={join(
                          "mt-0.5 grid size-5 place-items-center rounded-full bg-accent text-white transition",
                          selected ? "scale-100 opacity-100" : "scale-75 opacity-0"
                        )}
                      >
                        <FiCheck className="size-3 stroke-[3]" aria-hidden="true" />
                      </span>
                    </span>
                  </button>
                );
              })}
            </div>
          </Card>

          <Card>
            <CardHeader
              title="Your data"
              description="Assessment inputs are scored once and never written to a server-side database."
            />
            <div className="p-5 sm:p-6">
              <SettingRow
                title="Assessment history"
                description={
                  count === 0
                    ? "No assessments are stored on this device."
                    : `${count} assessment${count === 1 ? "" : "s"} stored in this browser.`
                }
              >
                <button
                  type="button"
                  onClick={handleClear}
                  disabled={count === 0}
                  className={buttonClass({ variant: "secondary", size: "sm" })}
                >
                  {cleared ? <FiCheck aria-hidden="true" /> : <FiTrash2 aria-hidden="true" />}
                  {cleared ? "Cleared" : "Clear history"}
                </button>
              </SettingRow>

              <SettingRow
                title="Server-side storage"
                description="The prediction endpoint is stateless and writes nothing to disk."
              >
                <Badge>
                  <FiMonitor className="size-3.5" aria-hidden="true" />
                  Device only
                </Badge>
              </SettingRow>
            </div>
          </Card>
        </div>

        <Card className="h-fit xl:sticky xl:top-28">
          <CardHeader
            title="Service status"
            description="Live health of the model that scores assessments."
          />
          <div className="p-5 sm:p-6">
            <SettingRow
              title="Prediction API"
              description={
                service.state === "loading"
                  ? "Checking the local service…"
                  : service.state === "ok"
                    ? "Reachable and responding normally."
                    : "Offline. Start Flask on port 5001."
              }
            >
              <Badge tone={statusTone}>
                <span className="size-1.5 rounded-full bg-current" />
                {service.state === "loading" ? "Checking" : service.state === "ok" ? "Online" : "Offline"}
              </Badge>
            </SettingRow>

            <SettingRow
              title="Active model"
              description={
                service.state === "ok" && service.model_loaded
                  ? "Soft-voting ensemble of five classifiers."
                  : "Unavailable until the service responds."
              }
            >
              <Badge className="max-w-full font-mono text-[11px]">
                <FiCpu className="size-3.5 shrink-0" aria-hidden="true" />
                <span className="max-w-52 truncate">
                  {service.state === "ok" && service.model_name ? service.model_name : "—"}
                </span>
              </Badge>
            </SettingRow>
          </div>
        </Card>
      </PageContent>
    </Page>
  );
}
