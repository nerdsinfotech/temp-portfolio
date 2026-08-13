import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

export default function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [label, setLabel] = useState('');

  useEffect(() => {
    if (window.matchMedia('(max-width: 900px)').matches) return;
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    const moveDot = gsap.quickTo(dot, 'x', { duration: 0.05, ease: 'power2.out' });
    const moveDotY = gsap.quickTo(dot, 'y', { duration: 0.05, ease: 'power2.out' });
    const moveRing = gsap.quickTo(ring, 'x', { duration: 0.4, ease: 'power3.out' });
    const moveRingY = gsap.quickTo(ring, 'y', { duration: 0.4, ease: 'power3.out' });

    const onMove = (e: MouseEvent) => {
      moveDot(e.clientX);
      moveDotY(e.clientY);
      moveRing(e.clientX);
      moveRingY(e.clientY);
    };
    window.addEventListener('mousemove', onMove);

    const onEnterInteractive = (e: Event) => {
      const el = e.currentTarget as HTMLElement;
      const cursorLabel = el.getAttribute('data-cursor');
      gsap.to(ring, {
        scale: cursorLabel ? 3.4 : 2.2,
        opacity: cursorLabel ? 1 : 0.5,
        backgroundColor: cursorLabel ? 'var(--paper)' : 'transparent',
        duration: 0.35,
        ease: 'power2.out',
      });
      if (cursorLabel) setLabel(cursorLabel);
    };
    const onLeaveInteractive = () => {
      gsap.to(ring, { scale: 1, opacity: 1, backgroundColor: 'transparent', duration: 0.35, ease: 'power2.out' });
      setLabel('');
    };
    const interactive = document.querySelectorAll('a, button, .interactive');
    interactive.forEach((el) => {
      el.addEventListener('mouseenter', onEnterInteractive);
      el.addEventListener('mouseleave', onLeaveInteractive);
    });

    return () => {
      window.removeEventListener('mousemove', onMove);
      interactive.forEach((el) => {
        el.removeEventListener('mouseenter', onEnterInteractive);
        el.removeEventListener('mouseleave', onLeaveInteractive);
      });
    };
  }, []);

  return (
    <>
      <div ref={dotRef} className="fixed top-0 left-0 w-1.5 h-1.5 rounded-full bg-[var(--gold)] pointer-events-none z-[999] -translate-x-1/2 -translate-y-1/2 hidden md:block" />
      <div ref={ringRef} className="fixed top-0 left-0 w-8 h-8 rounded-full border border-[var(--gold)] pointer-events-none z-[999] -translate-x-1/2 -translate-y-1/2 hidden md:flex items-center justify-center mix-blend-difference">
        {label && <span className="font-sans text-[10px] font-semibold text-[#0A0A0B] whitespace-nowrap">{label}</span>}
      </div>
    </>
  );
}
