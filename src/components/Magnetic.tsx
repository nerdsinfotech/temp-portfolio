import { useRef, ReactNode } from 'react';
import { gsap } from 'gsap';

export default function Magnetic({ children, className = '', href, strength = 0.35 }: { children: ReactNode; className?: string; href?: string; strength?: number }) {
  const ref = useRef<HTMLAnchorElement>(null);

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left - r.width / 2) * strength;
    const y = (e.clientY - r.top - r.height / 2) * strength;
    gsap.to(el, { x, y, duration: 0.4, ease: 'power3.out' });
  };
  const onLeave = () => {
    gsap.to(ref.current, { x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1,0.4)' });
  };

  return (
    <a
      ref={ref}
      href={href}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={`interactive inline-block will-change-transform ${className}`}
    >
      {children}
    </a>
  );
}
