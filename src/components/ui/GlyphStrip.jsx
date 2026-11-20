import { useEffect, useRef } from 'react';
import { motion } from 'motion/react';

export default function GlyphStrip({
  active = true,
  // pattern is unused but kept for API compatibility
  _pattern = 'pulse',
  speed = 1,
  count = 20,
  style = {},
  className = '',
  'aria-label': ariaLabel = 'Decorative animation',
}) {
  const prefersReducedMotion = useRef(false);

  useEffect(() => {
    prefersReducedMotion.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion.current) return;

    let animationId = 0;
    const animate = () => {
      animationId = requestAnimationFrame(animate);
    };
    animationId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationId);
  }, [speed]);

  if (!active) {
    return (
      <div
        className={`flex gap-1 ${className}`}
        style={{ ...style, opacity: 0.2 }}
        aria-hidden="true"
        role="img"
        aria-label={ariaLabel}
      >
        {Array.from({ length: count }, (_, i) => (
          <div
            key={i}
            style={{
              flex: 1,
              height: '100%',
              minWidth: '4px',
              maxWidth: '8px',
              background: 'currentColor',
              borderRadius: 'var(--radius-sm)',
              opacity: 0.2,
            }}
          />
        ))}
      </div>
    );
  }

  return (
    <div
      className={`flex gap-1 ${className}`}
      style={style}
      aria-hidden="true"
      role="img"
      aria-label={ariaLabel}
    >
      {Array.from({ length: count }, (_, i) => (
        <motion.div
          key={i}
          style={{
            flex: 1,
            height: '100%',
            minWidth: '4px',
            maxWidth: '8px',
            background: 'currentColor',
            borderRadius: 'var(--radius-sm)',
          }}
          animate={{ opacity: [0.2, 1, 0.2] }}
          transition={{
            duration: 1 / speed,
            delay: i * 0.05,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
}