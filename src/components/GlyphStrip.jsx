import { useEffect, useRef, useState } from 'react';

// Nothing OS Glyph Interface - LED strip animation
// Simulates the Nothing Phone's glyph lights

const LED_COUNT = 24;
const COLORS = {
  accent: '#d71921',
  white: '#ffffff',
  dim: '#4a4a4e',
};

export default function GlyphStrip({
  active = false,
  pattern = 'pulse',
  speed = 1,
  className = '',
}) {
  const canvasRef = useRef(null);
  const rafRef = useRef(null);
  const timeRef = useRef(0);
  const prefersReduced = useRef(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    prefersReduced.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }, []);

  useEffect(() => {
    if (!mounted || prefersReduced.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let width = 0;
    let height = 0;
    let dpr = 1;

    const resize = () => {
      const rect = canvas.parentElement?.getBoundingClientRect() || { width: 300, height: 4 };
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const draw = (now) => {
      const dt = (now - timeRef.current) / 1000;
      timeRef.current = now;

      ctx.clearRect(0, 0, width, height);

      const ledWidth = width / LED_COUNT;
      const ledHeight = height;
      const radius = Math.min(ledWidth, ledHeight) / 2.5;

      for (let i = 0; i < LED_COUNT; i++) {
        const x = i * ledWidth + ledWidth / 2;
        const y = height / 2;

        let intensity = 0;
        let hue = COLORS.white;

        if (active) {
          switch (pattern) {
            case 'pulse': {
              const phase = (now / 1000) * speed * 2;
              intensity = 0.3 + 0.7 * Math.sin(phase + i * 0.3);
              hue = COLORS.accent;
              break;
            }
            case 'wave': {
              const phase = (now / 1000) * speed * 3;
              intensity = 0.2 + 0.8 * Math.sin(phase - i * 0.4);
              hue = i % 2 === 0 ? COLORS.accent : COLORS.white;
              break;
            }
            case 'scan': {
              const pos = ((now / 1000) * speed * LED_COUNT) % LED_COUNT;
              const dist = Math.abs(i - pos);
              intensity = Math.max(0, 1 - dist / 3);
              hue = COLORS.accent;
              break;
            }
            case 'fill': {
              const progress = ((now / 1000) * speed) % 1;
              const fillCount = Math.floor(progress * LED_COUNT);
              intensity = i < fillCount ? 1 : 0.1;
              hue = i < fillCount ? COLORS.accent : COLORS.dim;
              break;
            }
            case 'binary': {
              // Random binary flicker
              intensity = Math.random() > 0.7 ? 1 : 0.15;
              hue = Math.random() > 0.5 ? COLORS.accent : COLORS.white;
              break;
            }
            default:
              intensity = 0.3;
              hue = COLORS.dim;
          }
        } else {
          intensity = 0.1;
          hue = COLORS.dim;
        }

        // Draw LED
        const alpha = Math.max(0, Math.min(1, intensity));
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.fillStyle = hue;
        ctx.globalAlpha = alpha;
        ctx.fill();

        // Glow effect for active LEDs
        if (intensity > 0.5 && hue === COLORS.accent) {
          ctx.shadowColor = COLORS.accent;
          ctx.shadowBlur = 8 * intensity;
          ctx.fill();
          ctx.shadowBlur = 0;
        }
      }

      ctx.globalAlpha = 1;
      rafRef.current = requestAnimationFrame(draw);
    };

    resize();
    window.addEventListener('resize', resize);
    timeRef.current = performance.now();
    rafRef.current = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(rafRef.current);
    };
  }, [active, pattern, speed, mounted]);

  if (!mounted || prefersReduced.current) return null;

  return (
    <canvas
      ref={canvasRef}
      className={`glyph-strip ${className}`}
      aria-hidden="true"
      style={{
        width: '100%',
        height: '100%',
        display: 'block',
      }}
    />
  );
}