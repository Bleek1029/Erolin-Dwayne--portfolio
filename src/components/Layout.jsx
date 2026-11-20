import { useEffect, useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { motion } from 'motion/react';
import MatrixRain from './MatrixRain';
import GlyphStrip from './GlyphStrip';

const nav = [
  { to: '/', label: 'HOME' },
  { to: '/about', label: 'ABOUT' },
  { to: '/projects', label: 'WORK' },
  { to: '/contact', label: 'CONTACT' },
];

// Static year - avoids impure Date() call during render
const CURRENT_YEAR = 2025;

export default function Layout() {
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [glyphActive, setGlyphActive] = useState(true);

  // Scroll listener for nav background
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Reset scroll on route change
  useEffect(() => {
    window.scrollTo(0, 0);
    // Trigger glyph animation on page transition
    requestAnimationFrame(() => {
      setGlyphActive(false);
      requestAnimationFrame(() => setGlyphActive(true));
    });
  }, [pathname]);

  return (
    <>
      {/* Matrix Rain Background */}
      <MatrixRain density={0.15} speed={0.5} color="#d71921" opacity={0.1} />

      {/* Top Glyph Strip - Page Transition Indicator */}
      <div
        className="glyph-strip-top"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          height: '3px',
          zIndex: 9999,
          pointerEvents: 'none',
        }}
      >
        <GlyphStrip
          active={glyphActive}
          pattern="scan"
          speed={2}
          style={{ width: '100%', height: '100%' }}
        />
      </div>

      {/* Navigation */}
      <header
        className={`nav ${scrolled ? 'scrolled' : ''}`}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          background: scrolled ? 'rgba(0, 0, 0, 0.95)' : 'transparent',
          backdropFilter: scrolled ? 'blur(20px)' : 'none',
          borderBottom: scrolled ? '1px solid var(--color-hairline)' : 'none',
          transition: 'background var(--transition-base), border-color var(--transition-base)',
        }}
      >
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '64px' }}>
          {/* Logo */}
          <Link
            to="/"
            className="nav-logo"
            onClick={() => setOpen(false)}
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 700,
              fontSize: '1.25rem',
              letterSpacing: 'var(--tracking-tight)',
              textTransform: 'uppercase',
              color: 'var(--color-foreground)',
              display: 'flex',
              alignItems: 'center',
              gap: 'var(--space-3)',
            }}
          >
            <span style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              background: 'var(--color-accent)',
              boxShadow: '0 0 12px var(--color-accent-glow)',
              animation: 'glyph-pulse 2s ease-in-out infinite',
            }} />
            Dwayne
          </Link>

          {/* Desktop Nav */}
          <nav className="nav-menu desktop" style={{ display: 'flex', gap: 'var(--space-8)' }}>
            {nav.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                className={pathname === n.to ? 'active' : ''}
                onClick={() => setOpen(false)}
                style={{
                  fontFamily: 'var(--font-ui)',
                  fontSize: 'var(--text-xs)',
                  fontWeight: 500,
                  letterSpacing: 'var(--tracking-widest)',
                  textTransform: 'uppercase',
                  color: pathname === n.to ? 'var(--color-accent)' : 'var(--color-muted-foreground)',
                  padding: 'var(--space-2) 0',
                  position: 'relative',
                  transition: 'color var(--transition-fast)',
                }}
              >
                {n.label}
                {pathname === n.to && (
                  <span style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: '2px',
                    background: 'var(--color-accent)',
                    borderRadius: '2px',
                  }} />
                )}
              </Link>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="nav-burger"
            aria-label="Menu"
            aria-expanded={open}
            onClick={() => setOpen(!open)}
            style={{
              display: 'none',
              background: 'none',
              border: 'none',
              padding: 'var(--space-2)',
              cursor: 'pointer',
              color: 'var(--color-foreground)',
            }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              {open ? (
                <>
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </>
              ) : (
                <>
                  <line x1="3" y1="12" x2="21" y2="12" />
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <line x1="3" y1="18" x2="21" y2="18" />
                </>
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Nav */}
        <motion.nav
          className="nav-menu mobile"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: open ? 1 : 0, height: open ? 'auto' : 0 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
          style={{
            display: 'flex',
            flexDirection: 'column',
            padding: 'var(--space-4) var(--space-6)',
            borderTop: '1px solid var(--color-hairline)',
            background: 'rgba(0, 0, 0, 0.98)',
            backdropFilter: 'blur(20px)',
            overflow: 'hidden',
          }}
        >
          {nav.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              className={pathname === n.to ? 'active' : ''}
              onClick={() => setOpen(false)}
              style={{
                fontFamily: 'var(--font-ui)',
                fontSize: '1rem',
                fontWeight: 500,
                letterSpacing: 'var(--tracking-widest)',
                textTransform: 'uppercase',
                color: pathname === n.to ? 'var(--color-accent)' : 'var(--color-foreground)',
                padding: 'var(--space-3) 0',
                borderBottom: '1px solid var(--color-hairline)',
              }}
            >
              {n.label}
            </Link>
          ))}
        </motion.nav>
      </header>

      {/* Main Content */}
      <motion.main
        key={pathname}
        initial={{ opacity: 1, y: 0 }}
        animate={{ opacity: 1, y: 0 }}
        style={{ position: 'relative', zIndex: 10, minHeight: '100vh' }}
      >
        <Outlet />
      </motion.main>

      {/* Footer */}
      <footer className="foot" style={{
        position: 'relative',
        zIndex: 10,
        borderTop: '1px solid var(--color-border)',
        padding: 'var(--space-16) var(--space-6) var(--space-8)',
        background: 'var(--color-card)',
      }}>
        <div className="container" style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)', alignItems: 'center', textAlign: 'center' }}>
            <p style={{ fontFamily: 'var(--font-ui)', fontSize: 'var(--text-xs)', letterSpacing: 'var(--tracking-widest)', textTransform: 'uppercase', color: 'var(--color-muted-foreground)' }}>
              Erolin Prince Dwayne
            </p>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-xs)', color: 'var(--color-muted-foreground)' }}>
              © {CURRENT_YEAR}  Build v1.0.0  •  Nothing OS Portfolio
            </p>
            <div style={{ display: 'flex', gap: 'var(--space-6)', marginTop: 'var(--space-2)' }}>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--color-muted-foreground)', fontSize: 'var(--text-xs)', transition: 'color var(--transition-fast)' }} onMouseEnter={(e) => e.target.style.color = 'var(--color-accent)'} onMouseLeave={(e) => e.target.style.color = 'var(--color-muted-foreground)'}>GitHub</a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--color-muted-foreground)', fontSize: 'var(--text-xs)', transition: 'color var(--transition-fast)' }} onMouseEnter={(e) => e.target.style.color = 'var(--color-accent)'} onMouseLeave={(e) => e.target.style.color = 'var(--color-muted-foreground)'}>LinkedIn</a>
              <a href="mailto:erolindwayneee@gmail.com" style={{ color: 'var(--color-muted-foreground)', fontSize: 'var(--text-xs)', transition: 'color var(--transition-fast)' }} onMouseEnter={(e) => e.target.style.color = 'var(--color-accent)'} onMouseLeave={(e) => e.target.style.color = 'var(--color-muted-foreground)'}>Email</a>
            </div>
          </div>
        </div>
      </footer>

      <style jsx global>{`
        @keyframes glyph-pulse {
          0%, 100% { opacity: 0.5; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.2); }
        }

        @media (max-width: 768px) {
          .nav-menu.desktop { display: none !important; }
          .nav-burger { display: flex !important; }
        }
      `}</style>
    </>
  );
}