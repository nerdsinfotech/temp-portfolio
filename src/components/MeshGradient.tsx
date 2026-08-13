import { useEffect, useRef } from 'react';

interface Blob {
  x: number; y: number; r: number; vx: number; vy: number; color: string;
}

export default function MeshGradient({ className = '' }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let W = 0, H = 0;
    const DPR = Math.min(window.devicePixelRatio || 1, 1.5);

    const resize = () => {
      W = canvas.offsetWidth;
      H = canvas.offsetHeight;
      canvas.width = W * DPR;
      canvas.height = H * DPR;
      ctx.scale(DPR, DPR);
    };
    resize();
    window.addEventListener('resize', resize);

    const blobs: Blob[] = [
      { x: W * 0.25, y: H * 0.35, r: 260, vx: 0.12, vy: 0.08, color: '201,164,97' },
      { x: W * 0.75, y: H * 0.6, r: 220, vx: -0.09, vy: 0.11, color: '136,145,255' },
      { x: W * 0.5, y: H * 0.2, r: 180, vx: 0.06, vy: -0.07, color: '244,242,237' },
    ];

    let raf: number;
    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      for (const b of blobs) {
        b.x += b.vx;
        b.y += b.vy;
        if (b.x < -b.r || b.x > W + b.r) b.vx *= -1;
        if (b.y < -b.r || b.y > H + b.r) b.vy *= -1;
        const grad = ctx.createRadialGradient(b.x, b.y, 0, b.x, b.y, b.r);
        grad.addColorStop(0, `rgba(${b.color},0.16)`);
        grad.addColorStop(1, `rgba(${b.color},0)`);
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, W, H);
      }
      raf = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(raf);
    };
  }, []);

  return <canvas ref={canvasRef} className={className} style={{ filter: 'blur(50px)' }} />;
}
