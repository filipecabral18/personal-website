'use client';

import { useEffect, useRef, useState } from 'react';
import { FiArrowDown } from 'react-icons/fi';

const roles = [
  'Software Engineer',
  'Full Stack Developer',
  'Backend Specialist',
  'Systems Architect',
];

function useTypewriter(words: string[], speed = 80, pause = 2000) {
  const [text, setText] = useState('');
  const [wordIdx, setWordIdx] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const current = words[wordIdx];
    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          setText(current.slice(0, text.length + 1));
          if (text.length + 1 === current.length) {
            setTimeout(() => setIsDeleting(true), pause);
          }
        } else {
          setText(current.slice(0, text.length - 1));
          if (text.length - 1 === 0) {
            setIsDeleting(false);
            setWordIdx((i) => (i + 1) % words.length);
          }
        }
      },
      isDeleting ? speed / 2 : speed,
    );
    return () => clearTimeout(timeout);
  }, [text, isDeleting, wordIdx, words, speed, pause]);

  return text;
}

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -9999, y: -9999 });
  const role = useTypewriter(roles);

  // Flow field: streams of light following a turbulent vector field,
  // with a mouse-driven vortex that bends nearby currents
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let animId: number;
    let w = 0;
    let h = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.fillStyle = '#060c1a';
      ctx.fillRect(0, 0, w, h);
    };
    resize();
    window.addEventListener('resize', resize);

    type Particle = {
      x: number;
      y: number;
      px: number;
      py: number;
      speed: number;
      hue: number;
      alpha: number;
      life: number;
    };

    const spawn = (): Particle => {
      const x = Math.random() * w;
      const y = Math.random() * h;
      return {
        x,
        y,
        px: x,
        py: y,
        speed: 0.6 + Math.random() * 1.4,
        hue: 200 + Math.random() * 40,
        alpha: 0.12 + Math.random() * 0.25,
        life: 120 + Math.random() * 280,
      };
    };

    const particles: Particle[] = Array.from({ length: 260 }, spawn);

    // Layered trig pseudo-noise — cheap, smooth, loops organically over time
    const fieldAngle = (x: number, y: number, t: number) => {
      const s = 0.0015;
      return (
        (Math.sin(x * s * 2.3 + t * 0.35) +
          Math.cos(y * s * 1.9 - t * 0.28) +
          Math.sin((x + y) * s * 0.7 + t * 0.18)) *
        Math.PI *
        0.7
      );
    };

    // Smoothed cursor so the vortex glides instead of teleporting
    const cursor = { x: -9999, y: -9999 };
    let t = 0;

    const draw = () => {
      t += 0.016;

      // Translucent wash instead of clear — this is what leaves the trails
      ctx.fillStyle = 'rgba(6, 12, 26, 0.07)';
      ctx.fillRect(0, 0, w, h);

      cursor.x += (mouseRef.current.x - cursor.x) * 0.08;
      cursor.y += (mouseRef.current.y - cursor.y) * 0.08;

      ctx.lineCap = 'round';

      for (const p of particles) {
        const angle = fieldAngle(p.x, p.y, t);
        let vx = Math.cos(angle) * p.speed;
        let vy = Math.sin(angle) * p.speed;

        // Vortex around the cursor: tangential swirl + slight inward pull
        const dx = p.x - cursor.x;
        const dy = p.y - cursor.y;
        const dist = Math.hypot(dx, dy);
        if (dist < 220 && dist > 1) {
          const f = (1 - dist / 220) ** 2;
          vx += (-dy / dist) * f * 4 - (dx / dist) * f * 0.6;
          vy += (dx / dist) * f * 4 - (dy / dist) * f * 0.6;
        }

        p.px = p.x;
        p.py = p.y;
        p.x += vx;
        p.y += vy;
        p.life -= 1;

        if (
          p.life <= 0 ||
          p.x < -20 ||
          p.x > w + 20 ||
          p.y < -20 ||
          p.y > h + 20
        ) {
          Object.assign(p, spawn());
          continue;
        }

        // Streams near the vortex glow brighter
        const boost = dist < 220 ? (1 - dist / 220) * 0.5 : 0;
        ctx.beginPath();
        ctx.moveTo(p.px, p.py);
        ctx.lineTo(p.x, p.y);
        ctx.strokeStyle = `hsla(${p.hue}, 90%, ${62 + boost * 25}%, ${p.alpha + boost})`;
        ctx.lineWidth = 1 + boost * 1.5;
        ctx.stroke();
      }

      animId = requestAnimationFrame(draw);
    };
    draw();

    const onPointerMove = (e: PointerEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    const onPointerLeave = () => {
      mouseRef.current = { x: -9999, y: -9999 };
    };
    window.addEventListener('pointermove', onPointerMove);
    document.documentElement.addEventListener('pointerleave', onPointerLeave);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('pointermove', onPointerMove);
      document.documentElement.removeEventListener(
        'pointerleave',
        onPointerLeave,
      );
    };
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#060c1a]">
      {/* Particle canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ zIndex: 1 }}
      />

      {/* Gradient overlays */}
      <div
        className="absolute inset-0 bg-radial from-blue-900/20 via-transparent to-transparent"
        style={{ zIndex: 2 }}
      />
      <div
        className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#060c1a] to-transparent"
        style={{ zIndex: 2 }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-4 tracking-tight leading-tight">
          Carlos <span className="gradient-text">Filipe</span>
          <br />
          <span className="text-slate-300">Cabral</span>
        </h1>

        <div className="h-10 flex items-center justify-center mb-6">
          <span className="font-mono text-lg md:text-xl text-blue-400">
            {role}
            <span className="animate-pulse text-blue-300">_</span>
          </span>
        </div>

        <p className="text-slate-400 text-base md:text-lg max-w-xl mx-auto mb-10 leading-relaxed">
          Construindo sistemas robustos do backend ao frontend. Apaixonado por
          arquitetura de software e aprendizado contínuo.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="#projetos"
            className="px-8 py-3 bg-blue-600 hover:bg-blue-500 text-white font-mono text-sm rounded border border-blue-500 transition-all duration-200 hover:shadow-lg hover:shadow-blue-500/25"
          >
            Ver projetos
          </a>
          <a
            href="#contato"
            className="px-8 py-3 bg-transparent hover:bg-blue-500/10 text-slate-300 hover:text-white font-mono text-sm rounded border border-slate-600 hover:border-blue-500 transition-all duration-200"
          >
            Entre em contato
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <a
        href="#sobre"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 text-slate-500 hover:text-blue-400 transition-colors animate-bounce"
        aria-label="Rolar para baixo"
      >
        <FiArrowDown size={20} />
      </a>
    </section>
  );
}
