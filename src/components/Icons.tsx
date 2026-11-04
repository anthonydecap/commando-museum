type IconProps = { className?: string };

const base = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.75,
  strokeLinecap: "square" as const,
  "aria-hidden": true,
};

export function ArrowUpRight({ className = "size-4" }: IconProps) {
  return (
    <svg viewBox="0 0 16 16" className={className} {...base}>
      <path d="M4 12 12 4M5.5 4H12v6.5" />
    </svg>
  );
}

export function ArrowRight({ className = "size-4" }: IconProps) {
  return (
    <svg viewBox="0 0 16 16" className={className} {...base}>
      <path d="M2 8h11M9 4l4 4-4 4" />
    </svg>
  );
}

export function ArrowLeft({ className = "size-4" }: IconProps) {
  return (
    <svg viewBox="0 0 16 16" className={className} {...base}>
      <path d="M14 8H3M7 4 3 8l4 4" />
    </svg>
  );
}

export function ArrowDown({ className = "size-4" }: IconProps) {
  return (
    <svg viewBox="0 0 16 16" className={className} {...base}>
      <path d="M8 2v11M4 9l4 4 4-4" />
    </svg>
  );
}

export function Plus({ className = "size-4" }: IconProps) {
  return (
    <svg viewBox="0 0 16 16" className={className} {...base}>
      <path d="M8 2v12M2 8h12" />
    </svg>
  );
}

export function MapPin({ className = "size-4" }: IconProps) {
  return (
    <svg viewBox="0 0 16 16" className={className} {...base} strokeLinecap="round">
      <path d="M8 14.5s5-4.3 5-8.5a5 5 0 0 0-10 0c0 4.2 5 8.5 5 8.5Z" />
      <circle cx="8" cy="6" r="1.75" />
    </svg>
  );
}

export function Clock({ className = "size-4" }: IconProps) {
  return (
    <svg viewBox="0 0 16 16" className={className} {...base} strokeLinecap="round">
      <circle cx="8" cy="8" r="6.25" />
      <path d="M8 4.5V8l2.5 1.5" />
    </svg>
  );
}

export function Mail({ className = "size-4" }: IconProps) {
  return (
    <svg viewBox="0 0 16 16" className={className} {...base}>
      <path d="M1.75 3.25h12.5v9.5H1.75zM2 3.5l6 5 6-5" />
    </svg>
  );
}

export function Facebook({ className = "size-4" }: IconProps) {
  return (
    <svg viewBox="0 0 16 16" className={className} fill="currentColor" aria-hidden>
      <path d="M9.2 15V8.7h2.1l.3-2.5H9.2V4.7c0-.7.2-1.2 1.2-1.2h1.3V1.3c-.2 0-1-.1-1.9-.1-1.9 0-3.2 1.2-3.2 3.3v1.8H4.5v2.5h2.1V15h2.6Z" />
    </svg>
  );
}
