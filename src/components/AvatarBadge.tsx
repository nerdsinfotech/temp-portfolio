import { LucideIcon } from 'lucide-react';

export default function AvatarBadge({ Icon }: { Icon: LucideIcon }) {
  return (
    <div className="relative w-16 h-16 shrink-0">
      <svg className="absolute inset-0 w-full h-full animate-[spin_14s_linear_infinite]" viewBox="0 0 64 64">
        <circle cx="32" cy="32" r="30" fill="none" stroke="var(--line-bright)" strokeWidth="1" strokeDasharray="1 5" />
      </svg>
      <div
        className="absolute inset-[6px] rounded-full flex items-center justify-center border border-[var(--line-bright)]"
        style={{ background: 'radial-gradient(circle at 35% 30%, rgba(198,255,61,0.16), rgba(77,232,255,0.06) 60%, transparent 100%)' }}
      >
        <Icon className="w-6 h-6 text-[var(--paper)]" strokeWidth={1.5} />
      </div>
    </div>
  );
}
