import { Link } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import gsap from 'gsap';
import { Button, GlyphStrip, TypedLine, Count, Card } from '../components/ui';

gsap.registerPlugin(ScrollTrigger);

const roles = ['FULL-STACK DEVELOPER', 'BACKEND ARCHITECT', 'SYSTEM BUILDER', 'FAST LEARNER'];

export default function Home() {
  const portraitRef = useRef(null);

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

  // 3D tilt effect for portrait
  useEffect(() => {
    const portrait = portraitRef.current;
    if (!portrait) return;

    const handleMove = (e) => {
      const r = portrait.getBoundingClientRect();
      const mx = (e.clientX - r.left) / r.width - 0.5;
      const my = (e.clientY - r.top) / r.height - 0.5;
      const rx = my * -6;
      const ry = mx * 8;
      portrait.style.transform = `perspective(1000px) rotateX(${rx}deg) rotateY(${ry}deg)`;
    };

    const handleLeave = () => {
      portrait.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
    };

    portrait.addEventListener('mousemove', handleMove);
    portrait.addEventListener('mouseleave', handleLeave);
    return () => {
      portrait.removeEventListener('mousemove', handleMove);
      portrait.removeEventListener('mouseleave', handleLeave);
    };
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
            <span className="label" style={{ color: 'var(--color-accent)' }}>BOOT SEQUENCE INITIATED</span>
          </div>

          <motion.h1
            className="display-hero"
            initial={{ opacity: 1, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            Erolin Prince Dwayne
          </motion.h1>

          <motion.p
            className="typed"
            initial={{ opacity: 1, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 500,
              fontSize: 'clamp(1.25rem, 3vw, 2rem)',
              lineHeight: 1.2,
              color: 'var(--color-accent)',
              marginTop: 'var(--space-4)',
              marginBottom: 'var(--space-6)',
              minHeight: '2.5rem',
              textTransform: 'uppercase',
              letterSpacing: 'var(--tracking-tight)',
            }}
          >
            I'm a <TypedLine strings={roles} />
          </motion.p>

          <motion.p
            className="body-lg"
            initial={{ opacity: 1, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
            style={{ maxWidth: '38rem', marginBottom: 'var(--space-8)' }}
          >
            I build digital experiences that blend creativity with technology: sleek, performant, user-centric applications from the database to the interface.
          </motion.p>

          <motion.div
            className="cta"
            initial={{ opacity: 1, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
            style={{ display: 'flex', gap: 'var(--space-4)', flexWrap: 'wrap' }}
          >
            <Button asChild variant="primary" size="lg">
              <Link to="/projects">View Work
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </Link>
            </Button>
            <Button asChild variant="ghost" size="lg">
              <Link to="/contact">Get in Touch</Link>
            </Button>
          </motion.div>
        </div>

        {/* Portrait Card */}
        <motion.figure
          ref={portraitRef}
          className="card"
          initial={{ opacity: 1, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
          style={{
            aspectRatio: '4/5',
            margin: 0,
            overflow: 'hidden',
            background: 'var(--color-card)',
            position: 'relative',
            border: '1px solid var(--color-border)',
            borderRadius: 'var(--radius-lg)',
            transformPerspective: 1000,
            transformStyle: 'preserve-3d',
          }}
        >
          <div className="portrait-bg" style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(135deg, var(--color-card) 0%, var(--color-background) 100%)',
            zIndex: 0,
          }}>
            {/* Glyph accent line */}
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '3px',
              background: 'linear-gradient(90deg, transparent, var(--color-accent), transparent)',
              opacity: 0.6,
            }} />
          </div>
          <div className="portrait-content" style={{ position: 'relative', zIndex: 1, height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{
              width: '100%',
              height: '100%',
              position: 'relative',
              overflow: 'hidden',
            }}>
              <img
                src="/images/me.2.jpeg"
                alt="Erolin Prince Dwayne"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  objectPosition: 'center top',
                }}
                loading="eager"
              />
              <div style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(180deg, transparent 40%, rgba(0,0,0,0.3) 100%)',
                pointerEvents: 'none',
              }} />
              <span className="label" style={{ position: 'absolute', bottom: 'var(--space-4)', left: 'var(--space-4)', color: 'var(--color-muted-foreground)', zIndex: 1 }}>PORTRAIT.MODULE</span>
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
              fontSize: 'var(--text-xs)',
              fontWeight: 500,
              letterSpacing: 'var(--tracking-wide)',
              textTransform: 'uppercase',
              background: 'rgba(10, 10, 10, 0.8)',
              backdropFilter: 'blur(8px)',
              color: 'var(--color-foreground)',
              border: '1px solid var(--color-border)',
              padding: 'var(--space-2) var(--space-4)',
              borderRadius: 'var(--radius-full)',
              cursor: 'pointer',
              transition: 'all var(--transition-fast)',
            }}
            onMouseEnter={(e) => { e.target.style.borderColor = 'var(--color-accent)'; e.target.style.color = 'var(--color-accent)'; }}
            onMouseLeave={(e) => { e.target.style.borderColor = 'var(--color-border)'; e.target.style.color = 'var(--color-foreground)'; }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
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
        initial={{ opacity: 1, y: 30 }}
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
        <Card variant="padded" hover data-stat style={{ background: 'var(--color-accent)', borderColor: 'var(--color-accent)', color: 'var(--color-on-accent)', display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
          <motion.b style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', lineHeight: 1, letterSpacing: 'var(--tracking-tighter)' }}>
            <Count to={5} />
          </motion.b>
          <span style={{ fontFamily: 'var(--font-ui)', fontSize: 'var(--text-xs)', color: 'rgba(15,23,42,0.7)', textTransform: 'uppercase', letterSpacing: 'var(--tracking-widest)' }}>PROJECTS SHIPPED</span>
        </Card>
        <Card variant="padded" hover data-stat style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
          <motion.b style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', lineHeight: 1, letterSpacing: 'var(--tracking-tighter)' }}>
            <Count to={2} suffix="+" />
          </motion.b>
          <span style={{ fontFamily: 'var(--font-ui)', fontSize: 'var(--text-xs)', color: 'var(--color-muted-foreground)', textTransform: 'uppercase', letterSpacing: 'var(--tracking-widest)' }}>YEARS EXPERIENCE</span>
        </Card>
        <Card variant="padded" hover data-stat style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
          <motion.b style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', lineHeight: 1, letterSpacing: 'var(--tracking-tighter)' }}>
            <Count to={10} />
          </motion.b>
          <span style={{ fontFamily: 'var(--font-ui)', fontSize: 'var(--text-xs)', color: 'var(--color-muted-foreground)', textTransform: 'uppercase', letterSpacing: 'var(--tracking-widest)' }}>MODULES BUILT</span>
        </Card>
      </motion.div>

      {/* Bottom Glyph Strip */}
      <div style={{ marginTop: 'auto', paddingTop: 'var(--space-12)' }}>
        <GlyphStrip active pattern="wave" speed={0.8} style={{ width: '100%', maxWidth: '600px', margin: '0 auto', height: '6px' }} />
      </div>
    </div>
  );
}