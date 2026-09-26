import { join } from "./styles";

export function Page({ children, className = "" }) {
  return <div className={join("min-h-full", className)}>{children}</div>;
}

export function PageHeader({ title, description, actions, className = "" }) {
  return (
    <header
      className={join(
        "sticky top-14 z-30 border-b border-line bg-surface/95 backdrop-blur-md lg:top-0",
        className
      )}
    >
      <div className="flex min-h-20 w-full max-w-[1600px] flex-col justify-center gap-3 px-4 py-4 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8 xl:px-10">
        <div className="min-w-0">
          <h1 className="font-display text-xl font-semibold tracking-[-0.02em] text-strong sm:text-2xl">
            {title}
          </h1>
          {description && <p className="mt-1 text-sm leading-6 text-muted">{description}</p>}
        </div>
        {actions && <div className="flex shrink-0 flex-wrap items-center gap-2">{actions}</div>}
      </div>
    </header>
  );
}

export function PageContent({ children, className = "" }) {
  return (
    <div
      className={join(
        "w-full max-w-[1600px] px-4 py-6 sm:px-6 sm:py-8 lg:px-8 xl:px-10",
        className
      )}
    >
      {children}
    </div>
  );
}

export function Card({ as: Element = "section", children, className = "" }) {
  return (
    <Element
      className={join(
        "rounded-xl border border-line bg-surface shadow-[0_1px_2px_rgba(15,23,42,0.04)]",
        className
      )}
    >
      {children}
    </Element>
  );
}

export function CardHeader({ title, description, action, className = "" }) {
  return (
    <div className={join("flex items-start justify-between gap-4 border-b border-line-subtle px-5 py-4 sm:px-6", className)}>
      <div className="min-w-0">
        <h2 className="font-display text-base font-semibold tracking-[-0.01em] text-strong sm:text-lg">
          {title}
        </h2>
        {description && <p className="mt-1 text-sm leading-6 text-muted">{description}</p>}
      </div>
      {action}
    </div>
  );
}

export function Eyebrow({ children, className = "" }) {
  return (
    <p className={join("text-xs font-semibold uppercase tracking-[0.08em] text-muted", className)}>
      {children}
    </p>
  );
}

export function Badge({ children, tone = "neutral", className = "" }) {
  const tones = {
    neutral: "border-line bg-subtle text-muted",
    accent: "border-transparent bg-accent-soft text-accent-ink",
    success: "border-transparent bg-success-soft text-success",
    warning: "border-transparent bg-warning-soft text-warning",
    danger: "border-transparent bg-danger-soft text-danger",
  };

  return (
    <span
      className={join(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-semibold",
        tones[tone],
        className
      )}
    >
      {children}
    </span>
  );
}
