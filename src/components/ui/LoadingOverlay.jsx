import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export default function LoadingOverlay({ isLoading, message = 'LOADING', showOnMount = true }) {
  const [show, setShow] = useState(showOnMount);
  const [mounted, setMounted] = useState(false);
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const startTimeRef = useRef(0);
  const percentRef = useRef(0);
  const reduceMotionRef = useRef(false);

  // Constants matching the original EXACTLY (but RUN=4s for 4-second animation)
  const N = 21; // grid size
  const C = 10; // center index
  const CYCLE = 4; // cycle duration in seconds
  const RUN = 4; // run duration in seconds - 4 second expansion
  const MAXR = Math.hypot(C, C) + 1; // EXACT from original

  useEffect(() => {
    setMounted(true);
    reduceMotionRef.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (showOnMount) {
      startTimeRef.current = performance.now();
      animate();
      const timer = setTimeout(() => setShow(false), RUN * 1000 + 100);
      return () => clearTimeout(timer);
    }
  }, [showOnMount]);

  useEffect(() => {
    if (!mounted) return;
    if (isLoading) {
      setShow(true);
      startTimeRef.current = performance.now();
      animate();
    } else {
      const timer = setTimeout(() => setShow(false), 300);
      return () => clearTimeout(timer);
    }
  }, [isLoading, mounted]);

  // Theme change listener
  useEffect(() => {
    const handleThemeChange = () => {
      // Force redraw on theme change
      if (canvasRef.current) {
        draw();
      }
    };
    const observer = new MutationObserver(handleThemeChange);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
    return () => observer.disconnect();
  }, [mounted]);

  const getColors = () => {
    const style = getComputedStyle(document.documentElement);
    return {
      ink: style.getPropertyValue('--ink').trim() || '#0c0c0c',
      line: style.getPropertyValue('--line').trim() || 'rgba(0,0,0,.18)',
      red: '#d71921',
    };
  };

  const draw = (timeSeconds) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const { ink, line, red } = getColors();
    const r = window.devicePixelRatio || 1;
    const S = canvas.clientWidth;
    canvas.width = S * r;
    canvas.height = S * r;
    ctx.setTransform(r, 0, 0, r, 0, 0);

    const ph = timeSeconds % CYCLE;
    const p = Math.min(1, ph / RUN);
    const e = 1 - Math.pow(1 - p, 3);
    const R = e * MAXR;
    const cell = S / N;

    percentRef.current = Math.floor(e * 100);

    ctx.clearRect(0, 0, S, S);

    for (let j = 0; j < N; j++) {
      for (let i = 0; i < N; i++) {
        const d = Math.hypot(i - C, j - C);
        const px = (i + 0.5) * cell;
        const py = (j + 0.5) * cell;
        let r = cell * 0.17;
        let fill = line;

        if (d <= R) {
          const edge = R - d;
          if (edge < 1.3 && p < 1) {
            fill = red;
            r = cell * (0.42 - edge * 0.12);
          } else {
            fill = ink;
            r = cell * 0.34;
          }
        } else if (!reduceMotionRef.current) {
          const w = Math.sin(d * 0.9 - ph * 5);
          if (w > 0.88) {
            fill = 'rgba(215, 25, 33, 0.55)';
            r = cell * 0.25;
          }
        }
        if (p >= 1 && ph > RUN + 0.6) {
          fill = red;
          r = cell * 0.34;
        }

        ctx.beginPath();
        ctx.arc(px, py, r, 0, 2 * Math.PI);
        ctx.fillStyle = fill;
        ctx.fill();
      }
    }
  };

  const animate = () => {
    const now = performance.now();
    const timeSeconds = (now - startTimeRef.current) / 1000;
    draw(timeSeconds);
    if (show) {
      animationRef.current = requestAnimationFrame(animate);
    }
  };

  const handleResize = () => {
    if (canvasRef.current) {
      draw();
    }
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  if (!show) return null;

  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 9999,
          background: 'var(--bg)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '24px',
          padding: '20px',
          fontFamily: '"Space Mono", ui-monospace, monospace',
        }}
        role="status"
        aria-live="polite"
        aria-label={message}
      >
        {/* Canvas loader - matches Nothing style */}
        <canvas
          ref={canvasRef}
          id="nothing-loader"
          role="img"
          aria-label="Dots filling from the center outward as loading progresses"
          style={{
            width: 'min(78vw, 400px)',
            aspectRatio: '1',
            display: 'block',
          }}
        />

        {/* Percentage counter */}
        <motion.div
          className="num"
          style={{
            fontFamily: 'Doto, "Courier New", monospace',
            fontWeight: 900,
            fontSize: 'clamp(4.5rem, 18vw, 7.5rem)',
            lineHeight: 0.85,
            color: 'var(--ink)',
          }}
        >
          {String(percentRef.current).padStart(3, '0')}
        </motion.div>

        {/* Loading label with blinking dot */}
        <motion.p
          className="lab"
          style={{
            fontSize: '0.8rem',
            color: 'var(--mute)',
            display: 'flex',
            alignItems: 'center',
            gap: '9px',
          }}
        >
          <motion.i
            style={{
              width: '9px',
              height: '9px',
              borderRadius: '50%',
              background: 'var(--red)',
            }}
            animate={{ opacity: [1, 0.2, 1] }}
            transition={{ duration: 1, repeat: Infinity, ease: 'steps(1)' }}
            aria-hidden="true"
          />
          {message}
        </motion.p>

        {/* Theme and replay buttons - top right */}
        <div
          style={{
            position: 'absolute',
            top: 'calc(16px + env(safe-area-inset-top, 0px))',
            right: '16px',
            display: 'flex',
            gap: '8px',
            zIndex: 10000,
          }}
        >
          <button
            type="button"
            onClick={() => {
              startTimeRef.current = performance.now();
              if (reduceMotionRef.current) draw();
            }}
            style={{
              fontFamily: '"Space Mono", ui-monospace, monospace',
              fontSize: '0.78rem',
              padding: '8px 14px',
              borderRadius: '99px',
              border: '1px solid var(--line)',
              background: 'transparent',
              color: 'var(--ink)',
              cursor: 'pointer',
              transition: 'background 0.25s, color 0.25s',
            }}
            onMouseEnter={(e) => {
              e.target.style.background = 'var(--ink)';
              e.target.style.color = 'var(--bg)';
            }}
            onMouseLeave={(e) => {
              e.target.style.background = 'transparent';
              e.target.style.color = 'var(--ink)';
            }}
          >
            Replay
          </button>
          <button
            type="button"
            onClick={() => {
              const dark = document.documentElement.getAttribute('data-theme') === 'dark' ||
                (!document.documentElement.getAttribute('data-theme') &&
                  window.matchMedia('(prefers-color-scheme: dark)').matches);
              document.documentElement.setAttribute('data-theme', dark ? 'light' : 'dark');
            }}
            aria-label="Switch light and dark theme"
            style={{
              fontFamily: '"Space Mono", ui-monospace, monospace',
              fontSize: '0.78rem',
              padding: '8px 14px',
              borderRadius: '99px',
              border: '1px solid var(--line)',
              background: 'transparent',
              color: 'var(--ink)',
              cursor: 'pointer',
              transition: 'background 0.25s, color 0.25s',
            }}
            onMouseEnter={(e) => {
              e.target.style.background = 'var(--ink)';
              e.target.style.color = 'var(--bg)';
            }}
            onMouseLeave={(e) => {
              e.target.style.background = 'transparent';
              e.target.style.color = 'var(--ink)';
            }}
          >
            Theme
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}