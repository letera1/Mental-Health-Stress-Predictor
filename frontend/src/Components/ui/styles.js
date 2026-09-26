const BUTTON_BASE =
  "inline-flex h-10 items-center justify-center gap-2 whitespace-nowrap rounded-lg border px-4 text-sm font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent disabled:pointer-events-none disabled:opacity-45";

const BUTTON_VARIANTS = {
  primary: "border-accent bg-accent text-white hover:bg-accent-hover",
  secondary:
    "border-line bg-surface text-body hover:border-line-strong hover:bg-subtle hover:text-strong",
  danger: "border-danger bg-danger text-white hover:opacity-90",
  quiet: "border-transparent bg-transparent text-muted hover:bg-subtle hover:text-strong",
};

const BUTTON_SIZES = {
  sm: "h-9 px-3 text-[13px]",
  md: "h-10 px-4",
  lg: "h-11 px-5 text-[15px]",
  icon: "size-10 p-0",
};

export function join(...classes) {
  return classes.filter(Boolean).join(" ");
}

export function buttonClass({ variant = "primary", size = "md", className = "" } = {}) {
  return join(BUTTON_BASE, BUTTON_VARIANTS[variant], BUTTON_SIZES[size], className);
}
