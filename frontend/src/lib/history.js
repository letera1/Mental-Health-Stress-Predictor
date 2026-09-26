const STORAGE_KEY = "mindcare.history";
const MAX_ENTRIES = 60;

/**
 * Assessment history never leaves the browser — it is written to localStorage
 * only so the dashboard can show real data instead of placeholders.
 */
export function readHistory() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function appendEntry(entry) {
  const history = readHistory();
  const next = [
    { id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`, at: Date.now(), ...entry },
    ...history,
  ].slice(0, MAX_ENTRIES);

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch {
    // Storage full or blocked — the assessment result itself is unaffected.
  }
  return next;
}

export function clearHistory() {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    // Nothing to do — the key may never have been written.
  }
  return [];
}

export function summarise(history) {
  if (!history.length) return null;

  const avg = (pick) => {
    const values = history.map(pick).filter((v) => typeof v === "number" && !Number.isNaN(v));
    if (!values.length) return null;
    return values.reduce((sum, v) => sum + v, 0) / values.length;
  };

  const counts = { 0: 0, 1: 0, 2: 0 };
  history.forEach((entry) => {
    if (entry.prediction in counts) counts[entry.prediction] += 1;
  });

  return {
    total: history.length,
    latest: history[0],
    avgStress: avg((e) => e.inputs?.Stress_Level),
    avgSleep: avg((e) => e.inputs?.Sleep_Hours),
    avgSteps: avg((e) => e.inputs?.Steps_Per_Day),
    avgSentiment: avg((e) => e.inputs?.Sentiment_Score),
    counts,
  };
}

export function formatWhen(timestamp) {
  const diff = Date.now() - timestamp;
  const minutes = Math.round(diff / 60000);
  if (minutes < 1) return "Just now";
  if (minutes < 60) return `${minutes} min ago`;
  const hours = Math.round(minutes / 60);
  if (hours < 24) return `${hours} hr ago`;
  const days = Math.round(hours / 24);
  if (days < 7) return `${days} d ago`;
  return new Date(timestamp).toLocaleDateString(undefined, { month: "short", day: "numeric" });
}
