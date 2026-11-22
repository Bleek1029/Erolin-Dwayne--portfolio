import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import gsap from 'gsap';
import { GlyphStrip, Tag, Button } from '../components/ui';

gsap.registerPlugin(ScrollTrigger);

// Lightbox Modal Component
function Lightbox({ isOpen, onClose, src, alt }) {
  if (!isOpen) return null;

  // Handle Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 100,
        background: 'rgba(0, 0, 0, 0.95)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 'var(--space-4)',
        cursor: 'zoom-out',
      }}
      role="dialog"
      aria-modal="true"
      aria-label="Full size image"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ duration: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
        onClick={(e) => e.stopPropagation()}
        style={{ maxWidth: '95vw', maxHeight: '95vh', position: 'relative' }}
      >
        <img
          src={src}
          alt={alt}
          style={{
            maxWidth: '100%',
            maxHeight: '90vh',
            objectFit: 'contain',
            borderRadius: 'var(--radius-md)',
            boxShadow: '0 25px 50px -12px rgb(0 0 0 / 0.5)',
          }}
        />
        <button
          onClick={(e) => { e.stopPropagation(); onClose(); }}
          style={{
            position: 'absolute',
            top: '12px',
            right: '12px',
            width: '44px',
            height: '44px',
            borderRadius: '50%',
            background: 'rgba(0, 0, 0, 0.7)',
            border: '1px solid rgba(255, 255, 255, 0.3)',
            color: '#fff',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'background 0.2s, transform 0.2s',
            zIndex: 10,
          }}
          onMouseEnter={(e) => e.target.style.background = 'rgba(215, 25, 33, 0.9)'}
          onMouseLeave={(e) => e.target.style.background = 'rgba(0, 0, 0, 0.7)'}
          aria-label="Close full size image"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      </motion.div>
    </motion.div>
  );
}

const projectsData = [
  { title: 'BEST TRACK', desc: 'A fare computation and route tool for tricycles in Olongapo City. GPS fare matrix with A* routing.', tags: ['THESIS', 'GPS', 'ROUTING'], filter: 'web', img: '/images/1.png' },
  { title: 'HR MODULE', desc: 'Employees, applicants, interviews, training, disciplinary actions management system.', tags: ['SYSTEM', 'HR'], filter: 'web', img: '/images/2.png' },
  { title: 'OPERATIONS', desc: 'Deployments, timekeeping, leave requests, overtime tracking system.', tags: ['SYSTEM', 'OPERATIONS'], filter: 'web', img: '/images/3.png' },
  { title: 'PAYROLL', desc: 'Payroll runs, salary computations with government deductions (SSS, PhilHealth, BIR).', tags: ['SYSTEM', 'FINANCE'], filter: 'web', img: '/images/4.png' },
  { title: 'FINANCE & ACCOUNTING', desc: 'Budget, billing, accounts payable/receivable, general ledger, treasury management.', tags: ['SYSTEM', 'FINANCE'], filter: 'web', img: '/images/5.png' },
  { title: 'COMPLIANCE', desc: 'Tracking DOLE, SSS, BIR, and PhilHealth deadlines and requirements.', tags: ['SYSTEM', 'COMPLIANCE'], filter: 'web', img: '/images/6.png' },
  { title: 'CLIENTS', desc: 'Managing corporate client accounts and contracts with CRM features.', tags: ['SYSTEM', 'CRM'], filter: 'web', img: '/images/7.png' },
  { title: 'COMMUNICATIONS', desc: 'Internal memos, meeting minutes, DOLE/SBMA intelligence, job fair management.', tags: ['SYSTEM', 'COMMS'], filter: 'web', img: '/images/8.png' },
  { title: 'ANALYTICS', desc: 'AI-generated insights, KPI charts, and department breakdowns dashboard.', tags: ['SYSTEM', 'ANALYTICS'], filter: 'web', img: '/images/9.png' },
  { title: 'SYSTEM OVERVIEW', desc: 'Complete enterprise resource planning and management system overview.', tags: ['SYSTEM', 'OVERVIEW'], filter: 'web', img: '/images/10.png' },
];

const tabs = [
  { id: 'all', label: 'ALL MODULES' },
  { id: 'web', label: 'WEB APP' },
  { id: 'design', label: 'DESIGN' },
];

export default function Projects() {
  const [filter, setFilter] = useState('all');
  const [lightbox, setLightbox] = useState(null);
  const list = projectsData.filter((p) => filter === 'all' || p.filter === filter);
  const tabIndicatorRef = useRef(null);

  // Animate project cards on scroll
  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.batch('[data-project]', {
        start: 'top 85%',
        once: true,
        onEnter: (els) =>
          gsap.fromTo(els, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, ease: 'power3.out', stagger: 0.06 }),
      });
    });
    return () => ctx.revert();
  }, [filter]);

  // Scroll reveal
  useEffect(() => {
    const io = new IntersectionObserver((es) => {
      es.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('in');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.15 });
    document.querySelectorAll('.rise').forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <div className="page" style={{ paddingTop: '100px', paddingBottom: 'var(--space-16)', minHeight: '100vh' }}>
      <div className="container">
        {/* Header */}
        <motion.div
          className="rise"
          initial={{ opacity: 1, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
          style={{ marginBottom: 'var(--space-6)' }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', marginBottom: 'var(--space-3)' }}>
            <GlyphStrip active pattern="pulse" speed={1.5} style={{ width: '80px', height: '3px' }} />
            <span className="label" style={{ color: 'var(--red)' }}>PROJECT REGISTRY LOADED</span>
          </div>

          <motion.h1
            className="display-lg"
            initial={{ opacity: 1, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            Selected work
          </motion.h1>
        </motion.div>

        {/* Filter Tabs - Hardware Switch Style */}
        <motion.div
          className="tabs rise"
          initial={{ opacity: 1, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
          style={{
            display: 'inline-flex',
            gap: 'var(--space-1)',
            padding: 'var(--space-1)',
            background: 'var(--surface)',
            border: '1px solid var(--line)',
            borderRadius: '99px',
            marginBottom: 'var(--space-6)',
            position: 'relative',
          }}
        >
          {/* Active indicator */}
          <motion.div
            ref={tabIndicatorRef}
            style={{
              position: 'absolute',
              top: 'var(--space-2)',
              bottom: 'var(--space-2)',
              left: 'var(--space-2)',
              width: 'calc(100% / 3 - var(--space-4))',
              background: 'var(--red)',
              borderRadius: '99px',
              transition: 'transform var(--transition-base)',
              transform: filter === 'all' ? 'translateX(0)' : filter === 'web' ? 'translateX(100%)' : 'translateX(200%)',
            }}
          />
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={filter === tab.id ? 'active' : ''}
              onClick={() => setFilter(tab.id)}
              style={{
                position: 'relative',
                zIndex: 1,
                fontFamily: 'var(--mono)',
                fontSize: 'var(--text-xs)',
                fontWeight: 500,
                letterSpacing: 'var(--tracking-widest)',
                textTransform: 'uppercase',
                padding: '8px 14px',
                borderRadius: '99px',
                background: 'none',
                border: 'none',
                color: filter === tab.id ? '#fff' : 'var(--mute)',
                cursor: 'pointer',
                transition: 'color var(--transition-fast)',
              }}
            >
              {tab.label}
            </button>
          ))}
        </motion.div>

        {/* Projects Grid - 3 column grid for desktop */}
        <motion.div
          layout
          className="proj-grid grid grid-cols-6 rise"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.3 }}
          style={{ gap: '8px' }}
        >
          <AnimatePresence mode="popLayout">
            {list.map((p) => (
              <motion.article
                layout
                key={p.title}
                className="card card-hover s3"
                data-project
                initial={{ opacity: 1, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9, x: -20 }}
                whileHover={{ y: -4 }}
                transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                style={{
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column',
                  minHeight: '240px',
                }}
              >
                {/* Project Image */}
                <div className="proj-img" style={{ aspectRatio: '4/3', overflow: 'hidden', position: 'relative', background: 'var(--surface)' }}>
                  <img
                    src={p.img}
                    alt={p.title}
                    loading="lazy"
                    onClick={() => setLightbox({ src: p.img, alt: p.title })}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      objectPosition: 'center',
                      transition: 'transform 0.4s cubic-bezier(0.2, 0.7, 0.2, 1)',
                      cursor: 'zoom-in',
                    }}
                  />
                  {/* Overlay */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.2 }}
                    style={{
                      position: 'absolute',
                      inset: 0,
                      background: 'linear-gradient(180deg, transparent 50%, rgba(0,0,0,0.8) 100%)',
                      display: 'flex',
                      alignItems: 'flex-end',
                      padding: 'var(--space-4)',
                      pointerEvents: 'none',
                    }}
                  >
                    <div style={{ display: 'flex', gap: 'var(--space-2)', flexWrap: 'wrap' }}>
                      {p.tags.map((t) => (
                        <Tag key={t} variant="primary" style={{ fontSize: 'var(--text-xs)' }}>
                          {t}
                        </Tag>
                      ))}
                    </div>
                  </motion.div>
                </div>

                {/* Project Info */}
                <div className="proj-info" style={{ padding: '14px', display: 'flex', flexDirection: 'column', gap: 'var(--space-2)', flex: 1 }}>
                  <div className="tags" style={{ display: 'flex', gap: 'var(--space-1)', flexWrap: 'wrap' }}>
                    {p.tags.map((t) => (
                      <Tag key={t} style={{ fontSize: 'var(--text-xs)', padding: '2px 8px' }}>{t}</Tag>
                    ))}
                  </div>
                  <h3 style={{ fontFamily: 'var(--sans)', fontWeight: 500, fontSize: 'var(--text-base)', lineHeight: 1.2, letterSpacing: 'var(--tracking-tight)', textTransform: 'uppercase' }}>
                    {p.title}
                  </h3>
                  <p style={{ fontFamily: 'var(--sans)', fontSize: 'var(--text-xs)', lineHeight: 'var(--leading-normal)', color: 'var(--mute)' }}>
                    {p.desc}
                  </p>
                  <div style={{ marginTop: 'auto', paddingTop: 'var(--space-2)', borderTop: '1px dashed var(--line)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span className="label" style={{ color: 'var(--red)', fontSize: 'var(--text-xs)' }}>{p.filter === 'web' ? 'WEB.MODULE' : 'DESIGN.MODULE'}</span>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--mute)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ transition: 'stroke var(--transition-fast), transform var(--transition-fast)' }} aria-hidden="true">
                      <line x1="5" y1="12" x2="19" y2="12" />
                      <polyline points="12 5 19 12 12 19" />
                    </svg>
                  </div>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Empty State */}
        {list.length === 0 && (
          <motion.div
            className="rise"
            initial={{ opacity: 1, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: 'var(--space-20)',
              textAlign: 'center',
              color: 'var(--mute)',
            }}
          >
            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginBottom: 'var(--space-4)', opacity: 0.3 }} aria-hidden="true">
              <rect x="2" y="3" width="20" height="14" rx="2" />
              <path d="M8 21h8" />
              <path d="M12 17v4" />
            </svg>
            <p style={{ fontFamily: 'var(--dot)', fontWeight: 900, fontSize: 'clamp(1.5rem, 3vw, 2.25rem)', lineHeight: 1.15, letterSpacing: 'var(--tracking-tight)', textTransform: 'uppercase', marginBottom: 'var(--space-2)' }}>NO MODULES FOUND</p>
            <p style={{ fontFamily: 'var(--sans)', fontSize: 'var(--text-base)', lineHeight: 'var(--leading-normal)', color: 'var(--mute)' }}>Adjust your filter to view available projects.</p>
          </motion.div>
        )}

        {/* Lightbox Modal */}
        <Lightbox
          isOpen={!!lightbox}
          onClose={() => setLightbox(null)}
          src={lightbox?.src}
          alt={lightbox?.alt}
        />
      </div>
    </div>
  );
}