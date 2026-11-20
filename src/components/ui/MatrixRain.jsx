import { useEffect, useRef, useState } from 'react';

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*';

export default function MatrixRain({
  // density is unused but kept for API compatibility
  _density = 0.15,
  speed = 0.5,
  color = '#d71921',
  fontSize = 14,
  opacity = 0.15,
}) {
  const canvasRef = useRef(null);
  const columnsRef = useRef([]);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resize = () => {
      const rect = canvas.parentElement?.getBoundingClientRect();
      if (rect) {
        canvas.width = rect.width;
        canvas.height = rect.height;
        setDimensions({ width: rect.width, height: rect.height });
      }
    };

    resize();
    window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const { width, height } = dimensions;
    if (!width || !height) return;

    const colWidth = fontSize * 1.2;
    const numCols = Math.floor(width / colWidth);
    const maxDrops = Math.floor(height / fontSize) + 5;

    // Initialize columns
    columnsRef.current = Array.from({ length: numCols }, () => ({
      x: Math.random() * width,
      y: Math.random() * -height,
      speed: speed * (0.5 + Math.random() * 0.5),
      chars: Array.from({ length: Math.floor(Math.random() * maxDrops) + 5 }, () =>
        CHARS[Math.floor(Math.random() * CHARS.length)]
      ),
      opacity: Math.random() * opacity,
    }));

    let animationId = 0;

    const draw = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, width, height);

      ctx.font = `${fontSize}px 'JetBrains Mono', monospace`;
      ctx.fillStyle = color;

      columnsRef.current.forEach((col) => {
        col.chars.forEach((char, i) => {
          const y = col.y + i * fontSize;
          if (y > 0 && y < height) {
            const charOpacity = col.opacity * (1 - i / col.chars.length);
            ctx.globalAlpha = Math.max(0, charOpacity);
            ctx.fillText(char, col.x, y);
          }
        });

        col.y += col.speed;
        if (col.y > height + maxDrops * fontSize) {
          col.y = -maxDrops * fontSize;
          col.chars = col.chars.map(() => CHARS[Math.floor(Math.random() * CHARS.length)]);
        }
      });

      ctx.globalAlpha = 1;
      animationId = requestAnimationFrame(draw);
    };

    // Respect reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!prefersReducedMotion) {
      animationId = requestAnimationFrame(draw);
    }

    return () => cancelAnimationFrame(animationId);
  }, [dimensions, speed, color, fontSize, opacity]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 0,
        pointerEvents: 'none',
        opacity: opacity,
      }}
      aria-hidden="true"
    />
  );
}