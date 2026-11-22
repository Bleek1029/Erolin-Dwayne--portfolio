import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import GlyphStrip from './GlyphStrip';

export default function LoadingOverlay({ isLoading, message = 'LOADING...' }) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (isLoading) {
      setShow(true);
    } else {
      const timer = setTimeout(() => setShow(false), 300);
      return () => clearTimeout(timer);
    }
  }, [isLoading]);

  if (!show) return null;

  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 9999,
          background: 'var(--bg)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 'var(--space-6)',
        }}
        role="status"
        aria-live="polite"
        aria-label={message}
      >
        {/* Nothing OS Dot Matrix Loader */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--space-4)' }}>
          {/* Central glowing dot */}
          <motion.div
            style={{
              width: '12px',
              height: '12px',
              borderRadius: '50%',
              background: 'var(--red)',
              boxShadow: '0 0 20px var(--red), 0 0 40px var(--red)',
            }}
            animate={{ scale: [1, 1.5, 1], boxShadow: ['0 0 20px var(--red)', '0 0 40px var(--red), 0 0 60px var(--red)', '0 0 20px var(--red)'] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            aria-hidden="true"
          />

          {/* Glyph strips - horizontal */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)', alignItems: 'center' }}>
            <GlyphStrip active pattern="scan" speed={2} count={12} style={{ width: '120px', height: '3px', color: 'var(--red)' }} />
            <GlyphStrip active pattern="wave" speed={1.5} count={12} style={{ width: '100px', height: '3px', color: 'var(--mute)', opacity: 0.5 }} />
            <GlyphStrip active pattern="pulse" speed={1} count={12} style={{ width: '80px', height: '3px', color: 'var(--mute)', opacity: 0.3 }} />
          </div>

          {/* Loading message */}
          <motion.p
            className="mono"
            style={{ fontSize: 'var(--text-xs)', letterSpacing: 'var(--tracking-widest)', color: 'var(--mute)' }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            {message}
          </motion.p>

          {/* Progress dots - Nothing OS style */}
          <motion.div
            className="flex gap-1"
            style={{ marginTop: 'var(--space-2)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.4 }}
            aria-hidden="true"
          >
            {Array.from({ length: 5 }, (_, i) => (
              <motion.div
                key={i}
                style={{
                  width: '6px',
                  height: '6px',
                  borderRadius: '50%',
                  background: i === 0 ? 'var(--red)' : 'var(--line)',
                  transition: 'background 0.3s ease',
                }}
                animate={{
                  background: ['var(--line)', 'var(--red)', 'var(--line)'],
                }}
                transition={{
                  duration: 2,
                  delay: i * 0.15,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />
            ))}
          </motion.div>
        </div>

        {/* Corner dots - Nothing OS branding */}
        <div style={{ position: 'absolute', top: 'var(--space-6)', left: 'var(--space-6)', display: 'flex', gap: 'var(--space-2)' }}>
          {Array.from({ length: 3 }, (_, i) => (
            <motion.div
              key={i}
              style={{ width: '4px', height: '4px', borderRadius: '50%', background: 'var(--red)', opacity: 0.6 }}
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 1, delay: i * 0.2, repeat: Infinity, ease: 'easeInOut' }}
            />
          ))}
        </div>
        <div style={{ position: 'absolute', bottom: 'var(--space-6)', right: 'var(--space-6)', display: 'flex', gap: 'var(--space-2)' }}>
          {Array.from({ length: 3 }, (_, i) => (
            <motion.div
              key={i}
              style={{ width: '4px', height: '4px', borderRadius: '50%', background: 'var(--red)', opacity: 0.6 }}
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 1, delay: i * 0.2 + 0.5, repeat: Infinity, ease: 'easeInOut' }}
            />
          ))}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}