import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import BootLoader from './components/BootLoader';
import Cursor from './components/Cursor';
import Atmosphere from './components/Atmosphere';
import GlitchHeading from './components/GlitchHeading';
import Magnetic from './components/Magnetic';
import TiltCard from './components/TiltCard';
import AvatarBadge from './components/AvatarBadge';
import GlobeAccent from './components/GlobeAccent';
import MeshGradient from './components/MeshGradient';
import IndexNav from './components/IndexNav';
import logo from './assets/logoData';
import { Palette, Code2, Radio, BarChart3, Sparkles, LifeBuoy, ArrowUpRight, ShoppingCart, LayoutDashboard, Megaphone, Wrench, Database } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const SERVICES = [
  { id: '01', icon: Palette, title: 'Product Design', desc: 'Wireframes to pixel-perfect UI, backed by a design system that survives real content and real edge cases.' },
  { id: '02', icon: Code2, title: 'Web Development', desc: 'Fast, typed, tested front and back ends — built to be handed off and maintained, not just shipped once.' },
  { id: '03', icon: Radio, title: 'Infrastructure', desc: 'DNS, CDN, load balancing, and monitoring, configured correctly from day one instead of after an outage.' },
  { id: '04', icon: BarChart3, title: 'Data & Analytics', desc: 'Event tracking and dashboards that show you what visitors actually do, not just how many showed up.' },
  { id: '05', icon: Sparkles, title: 'Motion & Interaction', desc: 'Scroll-driven storytelling and micro-interactions, used with intent rather than decoration.' },
  { id: '06', icon: LifeBuoy, title: 'Ongoing Support', desc: 'A standing team on retainer for updates, fixes, and iteration — not a one-off build and a goodbye email.' },
];

const TEAM = [
  { role: 'UI / UX Designer', focus: 'Interface design & design systems', icon: Palette },
  { role: 'Full-Stack Developer', focus: 'Front-end and back-end engineering', icon: Code2 },
  { role: 'Network Engineer', focus: 'Hosting, DNS, security & uptime', icon: Radio },
  { role: 'Data Analyst', focus: 'Analytics, tracking & reporting', icon: BarChart3 },
];

const PROCESS = [
  { t: '1', title: 'Discovery', desc: 'We map goals, audience, and constraints before any pixel gets placed.' },
  { t: '2', title: 'Design', desc: 'Wireframes, then high-fidelity UI, reviewed with you at every stage.' },
  { t: '3–5', title: 'Build', desc: 'Development and infrastructure run in parallel, so hosting is ready on day one.' },
  { t: '6', title: 'Launch', desc: 'DNS cutover, monitoring, and analytics go live together — nothing bolted on after.' },
  { t: '7+', title: 'Iterate', desc: 'We watch the data with you for the first weeks and tune what it tells us to.' },
];

const CAPABILITIES = [
  { title: 'E-commerce & Storefronts', tag: 'Product pages, cart, checkout', color: '#C9A461', icon: ShoppingCart },
  { title: 'SaaS Dashboards', tag: 'Data-heavy product UI', color: '#8891FF', icon: LayoutDashboard },
  { title: 'Marketing & Landing Sites', tag: 'Fast, animated, conversion-focused', color: '#F4F2ED', icon: Megaphone },
  { title: 'Internal Tools', tag: 'Admin panels, ops dashboards', color: '#8891FF', icon: Wrench },
  { title: 'Data & Reporting Portals', tag: 'Dashboards, exports, analytics', color: '#C9A461', icon: Database },
];

const STACK = [
  { dir: 'frontend', items: ['React', 'Next.js', 'Tailwind'] },
  { dir: 'motion', items: ['GSAP', 'ScrollTrigger', 'Lottie'] },
  { dir: 'backend', items: ['Node', 'Postgres', 'Redis'] },
  { dir: 'infra', items: ['CDN', 'DNS', 'Zero-trust'] },
  { dir: 'data', items: ['Pipelines', 'Dashboards', 'SQL'] },
];

function useReveal(selector: string, opts: { stagger?: number } = {}) {
  useEffect(() => {
    const els = gsap.utils.toArray<HTMLElement>(selector);
    els.forEach((el, i) => {
      gsap.fromTo(
        el,
        { opacity: 0, y: 32 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: (opts.stagger || 0) * (i % 8),
          ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 88%', once: true },
        }
      );
    });
  }, [selector]);
}

export default function App() {
  const [booted, setBooted] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);
  const heroContentRef = useRef<HTMLDivElement>(null);
  const heroLayerR = useRef<HTMLDivElement>(null);
  const heroLayerB = useRef<HTMLDivElement>(null);
  const nextHintRef = useRef<HTMLDivElement>(null);
  const globeRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const processLineRef = useRef<HTMLDivElement>(null);
  const processSectionRef = useRef<HTMLDivElement>(null);
  const workSectionRef = useRef<HTMLDivElement>(null);
  const workTrackRef = useRef<HTMLDivElement>(null);

  useReveal('.reveal-item', { stagger: 0.08 });

  useEffect(() => {
    if (!booted) return;
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: heroRef.current,
        start: 'top top',
        end: '+=90%',
        pin: true,
        scrub: 0.6,
        onUpdate: (self) => {
          const p = self.progress;
          gsap.set(heroContentRef.current, {
            scale: 1 - p * 0.18,
            opacity: 1 - p * 0.9,
            filter: `blur(${p * 6}px)`,
          });
          gsap.set(heroLayerR.current, { x: p * 14, opacity: p * 0.5 });
          gsap.set(heroLayerB.current, { x: -p * 14, opacity: p * 0.5 });
          gsap.set(nextHintRef.current, { opacity: p > 0.5 ? (p - 0.5) * 2 : 0 });
        },
      });
    });
    return () => ctx.revert();
  }, [booted]);

  useEffect(() => {
    if (!booted) return;
    const moveGlobe = gsap.quickTo(globeRef.current, 'x', { duration: 0.8, ease: 'power3.out' });
    const moveGlobeY = gsap.quickTo(globeRef.current, 'y', { duration: 0.8, ease: 'power3.out' });
    const moveGrid = gsap.quickTo(gridRef.current, 'x', { duration: 1.1, ease: 'power3.out' });
    const moveGridY = gsap.quickTo(gridRef.current, 'y', { duration: 1.1, ease: 'power3.out' });
    const onMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      moveGlobe(x * -24);
      moveGlobeY(y * -24);
      moveGrid(x * 10);
      moveGridY(y * 10);
    };
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, [booted]);

  useEffect(() => {
    if (!booted) return;
    const st = ScrollTrigger.create({
      trigger: processSectionRef.current,
      start: 'top 65%',
      end: 'bottom 70%',
      scrub: 0.5,
      onUpdate: (self) => gsap.set(processLineRef.current, { scaleY: self.progress }),
    });
    return () => st.kill();
  }, [booted]);

  useEffect(() => {
    if (!booted) return;
    const track = workTrackRef.current;
    const section = workSectionRef.current;
    if (!track || !section) return;
    const ctx = gsap.context(() => {
      const getScrollAmount = () => track.scrollWidth - window.innerWidth + 96;
      ScrollTrigger.create({
        trigger: section,
        start: 'top top',
        end: () => `+=${getScrollAmount()}`,
        pin: true,
        scrub: 0.7,
        onUpdate: (self) => {
          gsap.set(track, { x: -getScrollAmount() * self.progress });
        },
      });
    });
    return () => ctx.revert();
  }, [booted]);

  useEffect(() => {
    ScrollTrigger.refresh();
  }, [booted]);

  return (
    <div className="bg-[var(--void)] min-h-screen relative">
      {!booted && <BootLoader onDone={() => setBooted(true)} />}
      <Cursor />
      <Atmosphere />
      <IndexNav />

      <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-[rgba(10,10,11,0.6)] border-b border-[var(--line)]">
        <nav className="max-w-[1320px] mx-auto flex items-center justify-between px-6 md:px-10 py-3.5">
          <a href="#hero" className="flex items-center gap-2.5 interactive">
            <img src={logo} alt="Nerdsinfotech" className="w-8 h-8 rounded-lg" />
            <span className="font-display font-bold text-base md:text-lg">
              Nerds<span className="text-[var(--gold)]">Infotech</span>
            </span>
          </a>
          <Magnetic href="#contact" strength={0.4} className="fill-btn font-sans text-[13.5px] font-semibold bg-[var(--gold)] text-[#0A0A0B] rounded-full px-5 py-2.5 transition">
            <span className="fill-btn-text">Start a project</span>
          </Magnetic>
        </nav>
      </header>

      <section id="hero" ref={heroRef} className="relative h-screen overflow-hidden flex items-center">
        <MeshGradient className="absolute inset-0 opacity-80 pointer-events-none" />
        <div ref={gridRef} className="absolute inset-0 opacity-[0.08]" style={{
          backgroundImage: 'linear-gradient(var(--line-bright) 1px, transparent 1px), linear-gradient(90deg, var(--line-bright) 1px, transparent 1px)',
          backgroundSize: '52px 52px',
          maskImage: 'radial-gradient(ellipse 70% 60% at 50% 40%, black 20%, transparent 75%)',
        }} />
        <div ref={globeRef}>
          <GlobeAccent className="hidden lg:block absolute -right-16 top-1/2 -translate-y-1/2 w-[420px] h-[420px] opacity-[0.22] pointer-events-none" />
        </div>
        <div ref={heroContentRef} className="relative z-10 max-w-[1320px] mx-auto px-6 md:px-10 w-full">
          <div className="reveal-item font-mono text-[11px] tracking-[0.15em] text-[var(--gold)] mb-7 flex items-center gap-2 uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--gold)] animate-pulse" />
            Now booking our founding client projects
          </div>
          <div className="relative">
            <div ref={heroLayerR} className="absolute inset-0 font-display font-medium text-[9vw] md:text-[4.4vw] leading-[1.06] text-[var(--violet)] opacity-0 pointer-events-none select-none">
              Websites engineered<br />as carefully as they're <span className="font-display-italic">designed</span>.
            </div>
            <div ref={heroLayerB} className="absolute inset-0 font-display font-medium text-[9vw] md:text-[4.4vw] leading-[1.06] text-[var(--gold)] opacity-0 pointer-events-none select-none">
              Websites engineered<br />as carefully as they're <span className="font-display-italic">designed</span>.
            </div>
            <h1 className="relative font-display font-medium text-[9vw] md:text-[4.4vw] leading-[1.06] max-w-[900px]">
              Websites engineered<br />as carefully as they're <span className="font-display-italic">designed</span>.
            </h1>
          </div>
          <p className="font-sans text-base md:text-lg text-[var(--fog)] mt-8 max-w-[520px] leading-relaxed">
            Nerdsinfotech is a small freelance studio — design, engineering, infrastructure, and data, working as one team so nothing gets lost between departments that don't exist.
          </p>
          <div className="flex gap-4 mt-10 flex-wrap items-center">
            <Magnetic href="#contact" className="fill-btn font-sans text-sm font-semibold bg-[var(--gold)] text-[#0A0A0B] px-7 py-4 rounded-full transition">
              <span className="fill-btn-text">Start a project</span>
            </Magnetic>
            <a href="#capabilities" className="interactive font-sans text-sm font-medium text-[var(--paper)] px-2 py-4 flex items-center gap-1.5 group">
              What we build
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </div>
        </div>
        <div className="absolute bottom-10 left-6 md:left-10 font-mono text-[10px] tracking-widest text-[var(--fog)] uppercase hidden md:block">
          Nerdsinfotech — Est. 2026
        </div>
        <div ref={nextHintRef} className="absolute bottom-10 left-0 right-0 text-center font-mono text-[11px] tracking-widest text-[var(--fog)] opacity-0 uppercase">
          Scroll to explore
        </div>
      </section>

      <div className="relative z-10 border-y border-[var(--line)] py-7 overflow-hidden bg-[var(--panel)]">
        <div className="flex gap-10 whitespace-nowrap w-max animate-[marquee_34s_linear_infinite]">
          {Array(2).fill(0).map((_, r) => (
            <div key={r} className="flex gap-10 items-center">
              {['Design', 'Development', 'Infrastructure', 'Data', 'Motion'].map((s) => (
                <span key={s} className="font-display font-medium text-3xl md:text-5xl text-transparent flex items-center gap-10" style={{ WebkitTextStroke: '1px var(--line-bright)' }}>
                  {s}
                  <span className="w-2 h-2 rounded-full bg-[var(--gold)] shrink-0" style={{ WebkitTextStroke: '0' }} />
                </span>
              ))}
            </div>
          ))}
        </div>
        <div className="flex gap-10 whitespace-nowrap w-max mt-4 animate-[marquee-rev_30s_linear_infinite] opacity-60">
          {Array(2).fill(0).map((_, r) => (
            <div key={r} className="flex gap-10 items-center">
              {['React', 'Next.js', 'GSAP', 'Postgres', 'CDN & DNS', 'Analytics', 'CI/CD'].map((s) => (
                <span key={s} className="font-mono text-xs tracking-[0.1em] uppercase text-[var(--fog)]">{s}</span>
              ))}
            </div>
          ))}
        </div>
      </div>

      <section id="services" className="relative z-10 py-28 md:py-36 px-6 md:px-10">
        <div className="max-w-[1320px] mx-auto">
          <div className="flex items-end justify-between mb-16 flex-wrap gap-8">
            <div>
              <div className="reveal-item font-mono text-[11px] tracking-[0.15em] text-[var(--gold)] mb-4 uppercase">01 — Services</div>
              <GlitchHeading text="Every discipline your site needs." as="h2" className="reveal-item font-display font-medium text-3xl md:text-5xl max-w-[560px]" />
            </div>
            <p className="reveal-item text-[var(--fog)] max-w-[280px] text-sm">Six capabilities under one accountable team — no vendor hand-offs.</p>
          </div>
          <div className="border-t border-[var(--line)]">
            {SERVICES.map((s) => {
              const Icon = s.icon;
              return (
                <div key={s.id} className="reveal-item group grid md:grid-cols-[70px_1fr_1fr_36px] items-center gap-4 md:gap-8 py-8 px-3 -mx-3 md:px-4 md:-mx-4 border-b border-[var(--line)] hover:bg-[var(--panel)] transition-colors duration-500 rounded-lg">
                  <span className="font-mono text-xs text-[var(--fog)]">{s.id}</span>
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg bg-[var(--panel-2)] border border-[var(--line-bright)] flex items-center justify-center shrink-0 group-hover:bg-[var(--gold)] transition-colors duration-500">
                      <Icon className="w-[18px] h-[18px] text-[var(--gold)] group-hover:text-[#0A0A0B] transition-colors duration-500" strokeWidth={1.75} />
                    </div>
                    <h3 className="font-display font-medium text-lg md:text-2xl">{s.title}</h3>
                  </div>
                  <p className="text-[var(--fog)] text-sm leading-relaxed">{s.desc}</p>
                  <ArrowUpRight className="w-4 h-4 text-[var(--fog)] opacity-0 group-hover:opacity-100 group-hover:text-[var(--gold)] group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-500 justify-self-end hidden md:block" />
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section id="team" className="relative z-10 py-28 md:py-36 px-6 md:px-10 bg-[var(--panel)] border-y border-[var(--line)]">
        <div className="max-w-[1320px] mx-auto">
          <div className="mb-16">
            <div className="reveal-item font-mono text-[11px] tracking-[0.15em] text-[var(--gold)] mb-4 uppercase">02 — Team</div>
            <GlitchHeading text="Four disciplines, no hand-off delay." as="h2" className="reveal-item font-display font-medium text-3xl md:text-5xl max-w-[640px]" />
            <p className="reveal-item text-[var(--fog)] max-w-[560px] mt-4">We stay small on purpose — the person designing your site is in the same call as the person deploying it.</p>
          </div>
          <div className="border-t border-[var(--line)]">
            {TEAM.map((m, i) => (
              <div key={m.role} className="reveal-item group flex items-center gap-6 md:gap-10 py-8 px-3 -mx-3 md:px-4 md:-mx-4 border-b border-[var(--line)] hover:bg-[var(--panel-2)] transition-colors duration-500 rounded-lg">
                <span className="font-mono text-xs text-[var(--fog)] w-6 shrink-0">0{i + 1}</span>
                <AvatarBadge Icon={m.icon} />
                <div className="flex-1 min-w-0">
                  <h4 className="font-display font-medium text-xl md:text-3xl transition-transform duration-500 group-hover:translate-x-2">{m.role}</h4>
                  <p className="text-[var(--fog)] text-sm mt-1">{m.focus}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="process" ref={processSectionRef} className="relative z-10 py-28 md:py-36 px-6 md:px-10">
        <div className="max-w-[1320px] mx-auto">
          <div className="reveal-item font-mono text-[11px] tracking-[0.15em] text-[var(--gold)] mb-4 uppercase">03 — Process</div>
          <GlitchHeading text="From first call to production." as="h2" className="reveal-item font-display font-medium text-3xl md:text-5xl mb-16 max-w-[640px]" />
          <div className="relative pl-10">
            <div className="absolute left-0 top-0 bottom-0 w-px bg-[var(--line-bright)]" />
            <div ref={processLineRef} className="absolute left-0 top-0 bottom-0 w-px bg-[var(--gold)] origin-top" style={{ transform: 'scaleY(0)' }} />
            {PROCESS.map((p) => (
              <div key={p.t} className="reveal-item relative pb-14 last:pb-0">
                <div className="absolute -left-[42px] top-1 w-2 h-2 rounded-full bg-[var(--gold)]" />
                <div className="font-mono text-[11px] text-[var(--fog)] mb-2 tracking-wide">Week {p.t}</div>
                <h3 className="font-display font-medium text-xl md:text-2xl">{p.title}</h3>
                <p className="text-[var(--fog)] text-sm mt-2 max-w-[520px] leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="capabilities" ref={workSectionRef} className="relative z-10 h-screen overflow-hidden bg-[var(--panel)] border-y border-[var(--line)] flex flex-col justify-center">
        <div className="px-6 md:px-10 mb-10">
          <div className="font-mono text-[11px] tracking-[0.15em] text-[var(--gold)] mb-4 uppercase">04 — What we build</div>
          <h2 className="font-display font-medium text-3xl md:text-5xl max-w-[640px]">We're new as a studio — not new at this.</h2>
          <p className="text-[var(--fog)] mt-4 max-w-[560px]">Every one of us has shipped this kind of work before. Here's what we're set up to build for you first.</p>
        </div>
        <div ref={workTrackRef} className="flex gap-6 px-6 md:px-10 w-max">
          {CAPABILITIES.map((w, i) => {
            const Icon = w.icon;
            return (
              <TiltCard key={w.title} data-cursor="View" className="interactive w-[78vw] md:w-[380px] h-[340px] rounded-2xl border border-[var(--line)] shrink-0 relative overflow-hidden group cursor-none bg-[var(--panel-2)] transition-shadow duration-500 hover:shadow-[0_30px_80px_-30px_rgba(0,0,0,0.6)]">
                <span className="absolute top-6 left-6 font-mono text-[11px] text-[var(--fog)]">0{i + 1}</span>
                <div className="absolute inset-0 opacity-40 group-hover:opacity-70 transition-opacity" style={{ background: `radial-gradient(circle at 30% 20%, ${w.color}33, transparent 60%)` }} />
                <div className="absolute inset-0 flex items-center justify-center">
                  <Icon className="w-16 h-16" style={{ color: w.color }} strokeWidth={1.25} />
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-[var(--void)] to-transparent">
                  <h4 className="font-display font-medium text-lg">{w.title}</h4>
                  <p className="text-[13px] text-[var(--fog)] mt-1">{w.tag}</p>
                </div>
              </TiltCard>
            );
          })}
          <div className="w-[78vw] md:w-[380px] h-[340px] rounded-2xl border border-dashed border-[var(--line-bright)] shrink-0 flex flex-col items-center justify-center text-center px-8">
            <span className="font-display font-medium text-lg">Your project could be first.</span>
            <p className="text-[var(--fog)] text-[13.5px] mt-2">Founding clients get closer attention and founding-client pricing.</p>
          </div>
          <div className="w-[10vw] shrink-0" />
        </div>
      </section>

      <section id="stack" className="relative z-10 py-28 md:py-36 px-6 md:px-10">
        <div className="max-w-[1320px] mx-auto">
          <div className="reveal-item font-mono text-[11px] tracking-[0.15em] text-[var(--gold)] mb-4 uppercase">05 — Stack</div>
          <GlitchHeading text="Our current stack, kept up to date." as="h2" className="reveal-item font-display font-medium text-3xl md:text-5xl mb-16 max-w-[640px]" />
          <div className="grid md:grid-cols-5 gap-8">
            {STACK.map((s) => (
              <div key={s.dir} className="reveal-item">
                <div className="font-display font-medium text-sm text-[var(--paper)] mb-4 pb-3 border-b border-[var(--line-bright)] capitalize">
                  {s.dir}
                </div>
                <div className="space-y-2.5">
                  {s.items.map((it) => (
                    <div key={it} className="text-[var(--fog)] text-[13.5px]">{it}</div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="relative z-10 min-h-screen flex flex-col items-center justify-center px-6 md:px-10 text-center border-t border-[var(--line)] overflow-hidden">
        <MeshGradient className="absolute inset-0 opacity-60 pointer-events-none" />
        <div className="relative z-10 max-w-[900px] reveal-item">
          <div className="font-mono text-[11px] tracking-[0.15em] text-[var(--gold)] mb-8 uppercase">06 — Contact</div>
          <h2 className="font-display font-medium text-4xl md:text-7xl leading-[1.05]">
            Let's build something<br /><span className="font-display-italic">exceptional</span>.
          </h2>
          <p className="text-[var(--fog)] mt-8 text-base md:text-lg max-w-[480px] mx-auto">
            Tell us what you're making. We'll reply with a scope and a realistic timeline — not a sales call.
          </p>
          <div className="mt-14">
            <Magnetic href="mailto:hello@nerdsinfotech.dev" strength={0.25} className="interactive font-display font-medium text-2xl md:text-4xl border-b border-[var(--line-bright)] hover:border-[var(--gold)] pb-2 transition-colors duration-500">
              hello@nerdsinfotech.dev
            </Magnetic>
          </div>
          <div className="mt-10">
            <Magnetic href="#" className="fill-btn inline-block font-sans text-sm font-medium border border-[var(--line-bright)] px-7 py-4 rounded-full transition">
              <span className="fill-btn-text">Book a call instead</span>
            </Magnetic>
          </div>
        </div>
      </section>

      <footer className="relative z-10 border-t border-[var(--line)] py-10 px-6 md:px-10">
        <div className="max-w-[1320px] mx-auto flex flex-wrap justify-between items-center gap-4 font-mono text-xs text-[var(--fog)]">
          <div className="flex items-center gap-2.5">
            <img src={logo} alt="Nerdsinfotech" className="w-6 h-6 rounded-md" />
            <span>© 2026 Nerdsinfotech</span>
          </div>
          <span>built by the team, for the team</span>
        </div>
      </footer>

      <style>{`
        @keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        @keyframes marquee-rev { from { transform: translateX(-50%); } to { transform: translateX(0); } }
      `}</style>
    </div>
  );
}
