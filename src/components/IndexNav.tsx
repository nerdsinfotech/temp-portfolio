import { useEffect, useState } from 'react';

const SECTIONS = [
  { id: 'hero', label: 'Intro' },
  { id: 'services', label: 'Services' },
  { id: 'team', label: 'Team' },
  { id: 'process', label: 'Process' },
  { id: 'capabilities', label: 'Work' },
  { id: 'contact', label: 'Contact' },
];

export default function IndexNav() {
  const [active, setActive] = useState('hero');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { threshold: 0.5 }
    );
    SECTIONS.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <div className="hidden lg:flex fixed right-8 top-1/2 -translate-y-1/2 z-40 flex-col items-end gap-5">
      <span className="font-mono text-[10px] tracking-wider text-[var(--fog)] tabular-nums">
        {String(SECTIONS.findIndex((s) => s.id === active) + 1).padStart(2, '0')} / {String(SECTIONS.length).padStart(2, '0')}
      </span>
      <div className="flex flex-col items-end gap-4">
        {SECTIONS.map((s) => (
          <a
            key={s.id}
            href={`#${s.id}`}
            className="interactive group flex items-center gap-3"
          >
            <span
              className={`font-mono text-[10px] tracking-wider uppercase transition-all duration-400 ${
                active === s.id ? 'opacity-100 translate-x-0 text-[var(--paper)]' : 'opacity-0 translate-x-2 text-[var(--fog)]'
              } group-hover:opacity-100 group-hover:translate-x-0`}
            >
              {s.label}
            </span>
            <span
              className={`rounded-full transition-all duration-400 ${
                active === s.id ? 'w-2.5 h-2.5 bg-[var(--gold)]' : 'w-1.5 h-1.5 bg-[var(--line-bright)]'
              }`}
            />
          </a>
        ))}
      </div>
    </div>
  );
}
