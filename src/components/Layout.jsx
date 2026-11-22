import { useEffect, useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { motion } from 'motion/react';
import { LoadingOverlay } from './ui';

const nav = [
  { to: '/', label: 'Work' },
  { to: '/projects', label: 'Projects' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
];

const CURRENT_YEAR = 2025;

export default function Layout() {
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      return document.documentElement.getAttribute('data-theme') ||
        (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    }
    return 'light';
  });
  const [isLoading, setIsLoading] = useState(false);

  // Scroll listener for nav background
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Reset scroll on route change (no loading animation)
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  // Theme toggle
  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  return (
    <>
      <LoadingOverlay isLoading={isLoading} message="NAVIGATING..." showOnMount={true} />
      {/* Navigation */}
      <header
        className={`nav ${scrolled ? 'scrolled' : ''}`}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          background: scrolled ? 'rgba(242, 242, 240, 0.95)' : 'transparent',
          backdropFilter: scrolled ? 'blur(20px)' : 'none',
          borderBottom: scrolled ? '1px solid var(--line)' : 'none',
          transition: 'background var(--transition-base), border-color var(--transition-base)',
        }}
      >
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '56px' }}>
          {/* Logo */}
          <Link
            to="/"
            className="brand"
            onClick={() => setOpen(false)}
            aria-label="Dwayne Erolin - Home"
          >
            <i style={{ animation: 'blink 2s steps(1) infinite' }} />
            DE
          </Link>

          {/* Desktop Nav */}
          <nav className="nav-menu desktop" style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
            {nav.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                className={pathname === n.to ? 'active' : ''}
                onClick={() => setOpen(false)}
                style={{
                  fontFamily: 'var(--mono)',
                  fontSize: '.78rem',
                  textDecoration: 'none',
                  padding: '8px 14px',
                  border: '1px solid var(--line)',
                  borderRadius: '99px',
                  background: pathname === n.to ? 'var(--ink)' : 'transparent',
                  color: pathname === n.to ? 'var(--bg)' : 'var(--ink)',
                  cursor: 'pointer',
                  transition: 'background .25s var(--ease), color .25s var(--ease), border-color .25s var(--ease)',
                  minHeight: '44px',
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                {n.label}
              </Link>
            ))}
            <button
              className="tgl"
              type="button"
              aria-label="Switch light and dark theme"
              onClick={toggleTheme}
              style={{
                fontFamily: 'var(--mono)',
                fontSize: '.78rem',
                textDecoration: 'none',
                padding: '8px 14px',
                border: '1px solid var(--line)',
                borderRadius: '99px',
                background: 'transparent',
                color: 'var(--ink)',
                cursor: 'pointer',
                transition: 'background .25s var(--ease), color .25s var(--ease), border-color .25s var(--ease)',
                minHeight: '44px',
              }}
            >
              Theme
            </button>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="nav-burger"
            aria-label="Menu"
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen(!open)}
            style={{
              display: 'none',
              background: 'none',
              border: 'none',
              padding: 'var(--space-2)',
              cursor: 'pointer',
              color: 'var(--ink)',
              minHeight: '44px',
              minWidth: '44px',
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
          id="mobile-nav"
          className="nav-menu mobile"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: open ? 1 : 0, height: open ? 'auto' : 0 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
          style={{
            display: 'flex',
            flexDirection: 'column',
            padding: 'var(--space-4) var(--space-6)',
            borderTop: '1px solid var(--line)',
            background: scrolled ? 'rgba(242, 242, 240, 0.98)' : 'transparent',
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
                fontFamily: 'var(--mono)',
                fontSize: '1rem',
                fontWeight: 500,
                letterSpacing: 'var(--tracking-widest)',
                textTransform: 'uppercase',
                color: pathname === n.to ? 'var(--red)' : 'var(--ink)',
                padding: 'var(--space-4) 0',
                borderBottom: '1px solid var(--line)',
                minHeight: '48px',
                display: 'flex',
                alignItems: 'center',
              }}
            >
              {n.label}
            </Link>
          ))}
          <button
            className="tgl"
            type="button"
            aria-label="Switch light and dark theme"
            onClick={toggleTheme}
            style={{
              fontFamily: 'var(--mono)',
              fontSize: '.78rem',
              textDecoration: 'none',
              padding: '10px 16px',
              border: '1px solid var(--line)',
              borderRadius: '99px',
              background: 'transparent',
              color: 'var(--ink)',
              cursor: 'pointer',
              transition: 'background .25s var(--ease), color .25s var(--ease), border-color .25s var(--ease)',
              marginTop: 'var(--space-4)',
              alignSelf: 'flex-start',
              minHeight: '44px',
              minWidth: '44px',
            }}
          >
            Theme
          </button>
        </motion.nav>
      </header>

      {/* Main Content */}
      <motion.main
        key={pathname}
        initial={{ opacity: 1, y: 0 }}
        animate={{ opacity: 1, y: 0 }}
        style={{ position: 'relative', zIndex: 1, minHeight: '100vh' }}
      >
        <Outlet />
      </motion.main>

      {/* Footer */}
      <footer className="foot" style={{
        position: 'relative',
        zIndex: 1,
        textAlign: 'center',
        padding: '18px 20px 40px',
      }}>
        <p className="mono">Designed in dots. Olongapo City, PH.</p>
      </footer>
    </>
  );
}