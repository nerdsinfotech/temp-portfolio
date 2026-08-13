import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import logo from '../assets/logoData';

export default function BootLoader({ onDone }: { onDone: () => void }) {
  const [count, setCount] = useState(0);
  const overlayRef = useRef<HTMLDivElement>(null);
  const brandRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    const obj = { val: 0 };

    const tl = gsap.timeline({
      onComplete: () => {
        document.body.style.overflow = '';
        onDone();
      },
    });

    tl.fromTo(brandRef.current, { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' })
      .to(
        obj,
        {
          val: 100,
          duration: 1.6,
          ease: 'power2.inOut',
          onUpdate: () => setCount(Math.round(obj.val)),
        },
        '<0.1'
      )
      .to(barRef.current, { scaleX: 1, duration: 1.6, ease: 'power2.inOut' }, '<')
      .to(lineRef.current, { scaleX: 1, duration: 0.8, ease: 'power3.inOut' }, '-=0.3')
      .to([brandRef.current, barRef.current?.parentElement], { opacity: 0, duration: 0.4, ease: 'power2.in' }, '+=0.15')
      .to(overlayRef.current, { yPercent: -100, duration: 1, ease: 'power4.inOut' }, '-=0.1');

    return () => {
      tl.kill();
    };
  }, [onDone]);

  return (
    <div ref={overlayRef} className="fixed inset-0 z-[200] bg-[var(--void)] flex flex-col items-center justify-center gap-10">
      <div ref={brandRef} className="flex flex-col items-center gap-5 opacity-0">
        <img src={logo} alt="Nerdsinfotech" className="w-14 h-14 md:w-16 md:h-16 rounded-2xl" />
        <div className="font-display font-medium text-[var(--paper)] text-2xl md:text-3xl">
          Nerds<span className="font-display-italic" style={{ color: 'var(--gold)' }}>Infotech</span>
        </div>
      </div>
      <div className="flex flex-col items-center gap-3">
        <div className="font-mono text-xs text-[var(--fog)] tabular-nums">{count}%</div>
        <div className="w-[180px] h-px bg-[var(--line-bright)] overflow-hidden">
          <div ref={barRef} className="h-full bg-[var(--gold)] origin-left" style={{ transform: 'scaleX(0)' }} />
        </div>
      </div>
      <div ref={lineRef} className="absolute bottom-0 left-0 right-0 h-px bg-[var(--gold)] origin-left" style={{ transform: 'scaleX(0)' }} />
    </div>
  );
}
