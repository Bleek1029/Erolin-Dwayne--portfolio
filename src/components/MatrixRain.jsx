import { useEffect, useRef } from 'react';

// Nothing OS inspired matrix rain - dot matrix characters falling
// Uses Doto font glyphs for authentic feel

const CHARS = '01◆◇◈▣▢□■▪▫▬▭▮▯▰▱▲△▴▵▶▷▸▹►▻▼▽▾▿◀◁◂◃◄◅◆◇◈';
const FONT_SIZE = 14;
const COLUMNS = 80;

export default function MatrixRain({ density = 0.3, speed = 1, color = '#d71921' }) {
  const canvasRef = useRef(null);
  const rafRef = useRef(null);
  const columnsRef = useRef([]);
  const prefersReduced = useRef(false);

  useEffect(() => {
    prefersReduced.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let width = 0;
    let height = 0;
    let dpr = 1;

    const resize = () => {
      const rect = canvas.parentElement?.getBoundingClientRect() || { width: window.innerWidth, height: window.innerHeight };
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.font = `${FONT_SIZE}px 'Doto', monospace`;

      // Initialize columns
      const colCount = Math.floor(width / FONT_SIZE);
      columnsRef.current = Array.from({ length: colCount }, () => ({
        y: Math.random() * -height,
        speed: (0.5 + Math.random() * 1.5) * speed,
        length: Math.floor(5 + Math.random() * 15),
        chars: Array.from({ length: Math.floor(5 + Math.random() * 15) }, () => CHARS[Math.floor(Math.random() * CHARS.length)]),
        opacity: Math.random(),
      }));
    };

    const draw = (time) => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.15)';
      ctx.fillRect(0, 0, width, height);

      ctx.font = `${FONT_SIZE}px 'Doto', monospace`;
      ctx.textBaseline = 'top';

      columnsRef.current.forEach((col, i) => {
        const x = i * FONT_SIZE;

        // Draw trail
        col.chars.forEach((char, j) => {
          const y = col.y + j * FONT_SIZE;
          if (y > height) return;

          const progress = j / col.length;
          const alpha = (1 - progress) * col.opacity * 0.6;

          // Head character - bright accent
          if (j === 0) {
            ctx.fillStyle = color;
            ctx.globalAlpha = Math.min(alpha * 2, 1);
          } else {
            // Trail - dimmed
            ctx.fillStyle = '#ffffff';
            ctx.globalAlpha = alpha * 0.3;
          }

          ctx.fillText(char, x, y);
        });

        // Update position
        col.y += col.speed;

        // Reset when off screen
        if (col.y - col.length * FONT_SIZE > height) {
          col.y = Math.random() * -height;
          col.speed = (0.5 + Math.random() * 1.5) * speed;
          col.length = Math.floor(5 + Math.random() * 15);
          col.chars = Array.from({ length: col.length }, () => CHARS[Math.floor(Math.random() * CHARS.length)]);
          col.opacity = Math.random();
        }
      });

      ctx.globalAlpha = 1;
      rafRef.current = requestAnimationFrame(draw);
    };

    resize();
    window.addEventListener('resize', resize);
    rafRef.current = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(rafRef.current);
    };
  }, [density, speed, color]);

  if (prefersReduced.current) return null;

  return (
    <canvas
      ref={canvasRef}
      className="matrix-rain"
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: -1,
        pointerEvents: 'none',
        opacity: 0.4,
      }}
    />
  );
}