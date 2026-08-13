import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface GlitchHeadingProps {
  text: string;
  as?: 'h1' | 'h2' | 'h3';
  className?: string;
  trigger?: 'scroll' | 'mount';
  delay?: number;
}

export default function GlitchHeading({ text, as = 'h2', className = '', trigger = 'scroll', delay = 0 }: GlitchHeadingProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const Tag = as;
  const words = text.split(' ');

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;
    const spans = wrap.querySelectorAll('.word-inner');

    const run = () => {
      gsap.fromTo(
        spans,
        { yPercent: 110, opacity: 0 },
        { yPercent: 0, opacity: 1, duration: 0.9, stagger: 0.045, ease: 'power4.out' }
      );
    };

    if (trigger === 'mount') {
      const t = setTimeout(run, delay);
      return () => clearTimeout(t);
    } else {
      const st = ScrollTrigger.create({
        trigger: wrap,
        start: 'top 88%',
        once: true,
        onEnter: run,
      });
      return () => st.kill();
    }
  }, [text, trigger, delay]);

  return (
    <Tag ref={wrapRef as any} className={className}>
      {words.map((w, i) => (
        <span key={i} className="mask-reveal" style={{ paddingBottom: '0.08em', marginBottom: '-0.08em' }}>
          <span className="word-inner inline-block" style={{ opacity: 0 }}>
            {w}
            {i < words.length - 1 ? '\u00A0' : ''}
          </span>
        </span>
      ))}
    </Tag>
  );
}
