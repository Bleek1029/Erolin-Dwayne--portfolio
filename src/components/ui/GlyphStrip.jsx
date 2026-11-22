import { useEffect, useRef } from 'react';
import { motion } from 'motion/react';

export default function GlyphStrip({
  active = true,
  pattern = 'pulse',
  speed = 1,
  count = 20,
  style = {},
  className = '',
  'aria-label': ariaLabel = 'Decorative animation',
}) {
  const prefersReducedMotion = useRef(false);

  useEffect(() => {
    prefersReducedMotion.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }, []);

  // Define animation variants based on pattern
  const getVariants = (pattern, speed) => {
    const duration = 1 / speed;
    const delay = 0.05;

    switch (pattern) {
      case 'pulse':
        return {
          animate: { opacity: [0.2, 1, 0.2] },
          transition: { duration, delay: (i) => i * delay, repeat: Infinity, ease: 'easeInOut' },
        };
      case 'scan':
        return {
          animate: { opacity: [0.2, 1, 0.2] },
          transition: { duration: duration * 2, delay: (i) => i * delay, repeat: Infinity, ease: 'easeInOut' },
        };
      case 'wave':
        return {
          animate: { scaleY: [0.3, 1, 0.3] },
          transition: { duration, delay: (i) => i * delay, repeat: Infinity, ease: 'easeInOut' },
        };
      case 'binary':
        return {
          animate: { opacity: [0.2, 1, 0.2] },
          transition: { duration: duration * 1.5, delay: (i) => i * delay * 0.5, repeat: Infinity, ease: 'easeInOut' },
        };
      case 'fill':
        return {
          animate: { width: ['0%', '100%'] },
          transition: { duration: 3 / speed, repeat: Infinity, ease: 'linear' },
        };
      default:
        return {
          animate: { opacity: [0.2, 1, 0.2] },
          transition: { duration, delay: (i) => i * delay, repeat: Infinity, ease: 'easeInOut' },
        };
    }
  };

  const variants = getVariants(pattern, speed);

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
              flex: pattern === 'fill' ? 0 : 1,
              height: '100%',
              minWidth: pattern === 'fill' ? '0' : '4px',
              maxWidth: pattern === 'fill' ? '100%' : '8px',
              width: pattern === 'fill' ? `${(i / count) * 100}%` : undefined,
              background: 'currentColor',
              borderRadius: 'var(--radius-sm)',
              opacity: 0.2,
            }}
          />
        ))}
      </div>
    );
  }

  if (pattern === 'fill') {
    return (
      <div
        className={`relative overflow-hidden ${className}`}
        style={style}
        aria-hidden="true"
        role="img"
        aria-label={ariaLabel}
      >
        <motion.div
          style={{
            height: '100%',
            background: 'currentColor',
            borderRadius: 'var(--radius-sm)',
            width: '0%',
          }}
          animate={variants.animate}
          transition={variants.transition}
        />
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
            transformOrigin: pattern === 'wave' ? 'bottom' : 'center',
          }}
          animate={variants.animate}
          transition={variants.transition}
        />
      ))}
    </div>
  );
}