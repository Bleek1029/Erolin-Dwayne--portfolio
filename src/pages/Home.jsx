import { Link } from 'react-router-dom';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import TypedLine from '../components/TypedLine';
import Count from '../components/Count';
import GlyphStrip from '../components/GlyphStrip';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import gsap from 'gsap';

gsap.registerPlugin(ScrollTrigger);

const roles = ['FULL-STACK DEVELOPER', 'BACKEND ARCHITECT', 'SYSTEM BUILDER', 'FAST LEARNER'];

export default function Home() {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-0.5, 0.5], [6, -6]), { stiffness: 120, damping: 16 });
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-8, 8]), { stiffness: 120, damping: 16 });

  const onMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };

  // Animate stats on scroll
  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.batch('[data-stat]', {
        start: 'top 85%',
        once: true,
        onEnter: (els) =>
          gsap.fromTo(els, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out', stagger: 0.1 }),
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <div className="page hero" style={{ paddingTop: '120px', paddingBottom: 'var(--space-20)', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Hero Grid */}
      <div className="hero-grid" style={{
        display: 'grid',
        gridTemplateColumns: '1.2fr 0.8fr',
        gap: 'var(--space-12)',
        alignItems: 'center',
        width: '100%',
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 var(--space-6)',
      }}>
        <div>
          {/* Boot Sequence Indicator */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)', marginBottom: 'var(--space-6)' }}>
            <GlyphStrip active pattern="pulse" speed={1.5} style={{ width: '120px', height: '4px' }} />
            <span className="label" style={{ color: 'var(--accent)' }}>BOOT SEQUENCE INITIATED</span>
          </div>

          <motion.h1
            className="display"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
            style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'clamp(3rem, 10vw, 7rem)', lineHeight: 0.95, letterSpacing: '-0.04em', textTransform: 'uppercase' }}
          >
            Erolin Prince Dwayne
          </motion.h1>

          <motion.p
            className="typed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 500,
              fontSize: 'clamp(1.25rem, 3vw, 2rem)',
              lineHeight: 1.2,
              color: 'var(--accent)',
              marginTop: 'var(--space-4)',
              marginBottom: 'var(--space-6)',
              minHeight: '2.5rem',
              textTransform: 'uppercase',
              letterSpacing: '-0.02em',
            }}
          >
            I'm a <TypedLine strings={roles} />
          </motion.p>

          <motion.p
            className="lead"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
            style={{
              fontFamily: 'var(--font-ui)',
              fontSize: '1.125rem',
              lineHeight: 1.7,
              color: 'var(--fg-muted)',
              maxWidth: '38rem',
              marginBottom: 'var(--space-8)',
            }}
          >
            I build digital experiences that blend creativity with technology: sleek, performant, user-centric applications from the database to the interface.
          </motion.p>

          <motion.div
            className="cta"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
            style={{ display: 'flex', gap: 'var(--space-4)', flexWrap: 'wrap' }}
          >
            <Link to="/projects" className="btn btn-primary">
              View Work
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </Link>
            <Link to="/contact" className="btn btn-ghost">Get in Touch</Link>
          </motion.div>
        </div>

        {/* Portrait Card */}
        <motion.figure
          className="portrait card"
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
          onMouseMove={onMove}
          onMouseLeave={() => { mx.set(0); my.set(0); }}
          style={{
            rotateX: rx,
            rotateY: ry,
            transformPerspective: 1000,
            aspectRatio: '4/5',
            margin: 0,
            overflow: 'hidden',
            background: 'var(--bg-elevated)',
            position: 'relative',
            border: '1px solid var(--border)',
            borderRadius: 'var(--radius-md)',
          }}
        >
          <div className="portrait-bg" style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(135deg, var(--bg-elevated) 0%, var(--bg) 100%)',
            zIndex: 0,
          }}>
            {/* Glyph accent line */}
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '3px',
              background: 'linear-gradient(90deg, transparent, var(--accent), transparent)',
              opacity: 0.6,
            }} />
          </div>
          <div className="portrait-content" style={{ position: 'relative', zIndex: 1, height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{
              width: '80%',
              height: '80%',
              background: 'var(--bg)',
              border: '1px solid var(--border)',
              borderRadius: 'var(--radius-sm)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
              overflow: 'hidden',
            }}>
              <svg width="120" height="120" viewBox="0 0 120 120" fill="none" style={{ opacity: 0.15 }}>
                <circle cx="60" cy="60" r="50" stroke="var(--accent)" strokeWidth="2" />
                <circle cx="60" cy="60" r="35" stroke="var(--fg-muted)" strokeWidth="1" strokeDasharray="4 4" />
                <polygon points="60,25 70,55 100,55 75,75 85,105 60,85 35,105 45,75 20,55 50,55" fill="var(--accent)" opacity="0.3" />
              </svg>
              <span className="label" style={{ position: 'absolute', bottom: 'var(--space-4)', color: 'var(--fg-subtle)' }}>PORTRAIT.MODULE</span>
            </div>
          </div>

          {/* Rebuild Button */}
          <button
            type="button"
            className="rebuild"
            style={{
              position: 'absolute',
              bottom: 'var(--space-4)',
              right: 'var(--space-4)',
              zIndex: 10,
              display: 'flex',
              alignItems: 'center',
              gap: 'var(--space-2)',
              fontFamily: 'var(--font-ui)',
              fontSize: '0.75rem',
              fontWeight: 500,
              letterSpacing: '0.05em',
              textTransform: 'uppercase',
              background: 'rgba(10, 10, 10, 0.8)',
              backdropFilter: 'blur(8px)',
              color: 'var(--fg)',
              border: '1px solid var(--border)',
              padding: 'var(--space-2) var(--space-4)',
              borderRadius: 'var(--radius-full)',
              cursor: 'pointer',
              transition: 'all var(--transition-fast)',
            }}
            onMouseEnter={(e) => { e.target.style.borderColor = 'var(--accent)'; e.target.style.color = 'var(--accent)'; }}
            onMouseLeave={(e) => { e.target.style.borderColor = 'var(--border)'; e.target.style.color = 'var(--fg)'; }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="23 4 23 10 17 10" />
              <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" />
            </svg>
            REBUILD
          </button>
        </motion.figure>
      </div>

      {/* Stats Bento Grid */}
      <motion.div
        className="bento"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 'var(--space-4)',
          width: '100%',
          maxWidth: '1200px',
          margin: 'var(--space-12) auto 0',
          padding: '0 var(--space-6)',
        }}
      >
        <div className="card card-hover" data-stat style={{ padding: 'var(--space-6)', display: 'flex', flexDirection: 'column', gap: 'var(--space-2)', background: 'var(--accent)', borderColor: 'var(--accent)', color: '#fff' }}>
          <motion.b style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', lineHeight: 1, letterSpacing: '-0.03em' }}>
            <Count to={5} />
          </motion.b>
          <span style={{ fontFamily: 'var(--font-ui)', fontSize: '0.875rem', color: 'rgba(255,255,255,0.7)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>PROJECTS SHIPPED</span>
        </div>
        <div className="card card-hover" data-stat style={{ padding: 'var(--space-6)', display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
          <motion.b style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', lineHeight: 1, letterSpacing: '-0.03em' }}>
            <Count to={2} suffix="+" />
          </motion.b>
          <span style={{ fontFamily: 'var(--font-ui)', fontSize: '0.875rem', color: 'var(--fg-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>YEARS EXPERIENCE</span>
        </div>
        <div className="card card-hover" data-stat style={{ padding: 'var(--space-6)', display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
          <motion.b style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', lineHeight: 1, letterSpacing: '-0.03em' }}>
            <Count to={10} />
          </motion.b>
          <span style={{ fontFamily: 'var(--font-ui)', fontSize: '0.875rem', color: 'var(--fg-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>MODULES BUILT</span>
        </div>
      </motion.div>

      {/* Bottom Glyph Strip */}
      <div style={{ marginTop: 'auto', paddingTop: 'var(--space-12)' }}>
        <GlyphStrip active pattern="wave" speed={0.8} style={{ width: '100%', maxWidth: '600px', margin: '0 auto', height: '6px' }} />
      </div>
    </div>
  );
}