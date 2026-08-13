import { useRef, ReactNode, HTMLAttributes } from 'react';
import { gsap } from 'gsap';

interface TiltCardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  className?: string;
  'data-cursor'?: string;
}

export default function TiltCard({ children, className = '', ...rest }: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    gsap.to(el, {
      rotateY: px * 10,
      rotateX: -py * 10,
      transformPerspective: 700,
      duration: 0.5,
      ease: 'power2.out',
    });
    rest.onMouseMove?.(e);
  };
  const onLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    gsap.to(ref.current, { rotateY: 0, rotateX: 0, duration: 0.6, ease: 'power3.out' });
    rest.onMouseLeave?.(e);
  };

  return (
    <div ref={ref} {...rest} onMouseMove={onMove} onMouseLeave={onLeave} className={`will-change-transform ${className}`}>
      {children}
    </div>
  );
}
