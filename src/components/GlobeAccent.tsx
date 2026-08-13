export default function GlobeAccent({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 200" className={`animate-[spin_40s_linear_infinite] ${className}`} style={{ transformOrigin: '50% 50%' }}>
      <circle cx="100" cy="100" r="90" fill="none" stroke="var(--line-bright)" strokeWidth="1" />
      <ellipse cx="100" cy="100" rx="90" ry="32" fill="none" stroke="var(--line-bright)" strokeWidth="1" />
      <ellipse cx="100" cy="100" rx="90" ry="60" fill="none" stroke="var(--line)" strokeWidth="1" />
      <ellipse cx="100" cy="100" rx="32" ry="90" fill="none" stroke="var(--line-bright)" strokeWidth="1" />
      <ellipse cx="100" cy="100" rx="60" ry="90" fill="none" stroke="var(--line)" strokeWidth="1" />
      <line x1="10" y1="100" x2="190" y2="100" stroke="var(--line-bright)" strokeWidth="1" />
      <line x1="100" y1="10" x2="100" y2="190" stroke="var(--line-bright)" strokeWidth="1" />
      <circle cx="100" cy="100" r="3" fill="var(--gold)" />
    </svg>
  );
}
