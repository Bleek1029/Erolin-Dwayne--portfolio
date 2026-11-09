import { useEffect, useRef, useState } from 'react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import gsap from 'gsap';

gsap.registerPlugin(ScrollTrigger);

// Nothing OS Glyph Progress - scroll-linked LED fill
// Shows reading progress or section progress as glyph LED fill

export default function GlyphProgress({
  trigger,
  start = 'top bottom',
  end = 'bottom top',
  scrub = true,
  className = '',
  color = '#d71921',
  height = 3,
}) {
  const canvasRef = useRef(null);
  const progressRef = useRef(0);
  const [mounted, setMounted] = useState(false);
  const prefersReduced = useRef(false);

  useEffect(() => {
    setMounted(true);
    prefersReduced.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }, []);

  useEffect(() => {
    if (!mounted || prefersReduced.current || !trigger) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let width = 0;
    let heightPx = 0;
    let dpr = 1;

    const resize = () => {
      const rect = canvas.parentElement?.getBoundingClientRect() || { width: 300, height: height };
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      heightPx = rect.height;
      canvas.width = width * dpr;
      canvas.height = heightPx * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${heightPx}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, heightPx);

      // Background track
      ctx.fillStyle = '#1a1a1e';
      ctx.fillRect(0, 0, width, heightPx);

      // Progress fill - segmented like glyph LEDs
      const segments = 20;
      const segmentWidth = width / segments;
      const gap = 2;
      const fillWidth = segmentWidth - gap;
      const filledSegments = Math.floor(progressRef.current * segments);

      for (let i = 0; i < segments; i++) {
        const x = i * segmentWidth + gap / 2;
        const y = gap / 2;
        const h = heightPx - gap;

        if (i < filledSegments) {
          // Filled segment
          const intensity = i === filledSegments - 1 ? progressRef.current * segments - i : 1;
          ctx.fillStyle = color;
          ctx.globalAlpha = intensity;
        } else {
          // Empty segment
          ctx.fillStyle = '#2a2a2e';
          ctx.globalAlpha = 0.5;
        }

        ctx.fillRect(x, y, fillWidth, h);
      }

      ctx.globalAlpha = 1;

      // Active segment glow
      if (filledSegments > 0 && filledSegments < segments) {
        const x = filledSegments * segmentWidth + gap / 2;
        const y = gap / 2;
        const h = heightPx - gap;
        ctx.shadowColor = color;
        ctx.shadowBlur = 8;
        ctx.fillStyle = color;
        ctx.globalAlpha = 0.6;
        ctx.fillRect(x, y, fillWidth, h);
        ctx.shadowBlur = 0;
        ctx.globalAlpha = 1;
      }
    };

    // ScrollTrigger to update progress
    const st = ScrollTrigger.create({
      trigger,
      start,
      end,
      scrub,
      onUpdate: (self) => {
        progressRef.current = self.progress;
        draw();
      },
    });

    resize();
    window.addEventListener('resize', () => {
      resize();
      draw();
    });
    draw();

    return () => {
      st.kill();
      window.removeEventListener('resize', draw);
    };
  }, [trigger, start, end, scrub, color, height, mounted]);

  if (!mounted || prefersReduced.current) return null;

  return (
    <canvas
      ref={canvasRef}
      className={`glyph-progress ${className}`}
      aria-hidden="true"
      style={{
        width: '100%',
        height: `${height}px`,
        display: 'block',
      }}
    />
  );
}