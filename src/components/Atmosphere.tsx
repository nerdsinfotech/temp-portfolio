export default function Atmosphere() {
  return (
    <>
      <svg className="fixed inset-0 w-full h-full pointer-events-none z-[60] opacity-[0.025] mix-blend-overlay">
        <filter id="noiseFilter">
          <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" stitchTiles="stitch" />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#noiseFilter)" />
      </svg>
      <div
        className="fixed inset-0 pointer-events-none z-[61]"
        style={{
          background: 'radial-gradient(ellipse 130% 90% at 50% 0%, transparent 60%, rgba(0,0,0,0.4) 100%)',
        }}
      />
    </>
  );
}
