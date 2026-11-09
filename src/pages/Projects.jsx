import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import GlyphStrip from '../components/GlyphStrip';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import gsap from 'gsap';

gsap.registerPlugin(ScrollTrigger);

const projectsData = [
  { title: 'DASHBOARD', desc: 'High-level metrics: Revenue, pending approvals, overdue items', tags: ['SYSTEM', 'ANALYTICS'], filter: 'web', img: '/images/1.png' },
  { title: 'HR MODULE', desc: 'Employees, applicants, interviews, training, disciplinary actions', tags: ['SYSTEM', 'HR'], filter: 'web', img: '/images/2.png' },
  { title: 'OPERATIONS', desc: 'Deployments, timekeeping, leave requests, overtime', tags: ['SYSTEM', 'OPERATIONS'], filter: 'web', img: '/images/3.png' },
  { title: 'PAYROLL', desc: 'Payroll runs, salary computations with government deductions', tags: ['SYSTEM', 'FINANCE'], filter: 'web', img: '/images/4.png' },
  { title: 'FINANCE & ACCOUNTING', desc: 'Budget, billing, accounts payable/receivable, general ledger, treasury', tags: ['SYSTEM', 'FINANCE'], filter: 'design', img: '/images/5.png' },
  { title: 'COMPLIANCE', desc: 'Tracking DOLE, SSS, BIR, and PhilHealth deadlines', tags: ['SYSTEM', 'COMPLIANCE'], filter: 'design', img: '/images/6.png' },
  { title: 'CLIENTS', desc: 'Managing corporate client accounts and contracts', tags: ['SYSTEM', 'CRM'], filter: 'web', img: '/images/7.png' },
  { title: 'COMMUNICATIONS', desc: 'Internal memos, meeting minutes, DOLE/SBMA intelligence, job fair management', tags: ['SYSTEM', 'COMMS'], filter: 'web', img: '/images/8.png' },
  { title: 'ANALYTICS', desc: 'AI-generated insights, KPI charts, and department breakdowns', tags: ['SYSTEM', 'ANALYTICS'], filter: 'design', img: '/images/9.png' },
  { title: 'SYSTEM OVERVIEW', desc: 'Complete enterprise resource planning and management system', tags: ['SYSTEM', 'OVERVIEW'], filter: 'web', img: '/images/10.png' },
];

const tabs = [
  { id: 'all', label: 'ALL MODULES' },
  { id: 'web', label: 'WEB APP' },
  { id: 'design', label: 'DESIGN' },
];

export default function Projects() {
  const [filter, setFilter] = useState('all');
  const list = projectsData.filter((p) => filter === 'all' || p.filter === filter);

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

  return (
    <div className="page" style={{ paddingTop: '120px', paddingBottom: 'var(--space-20)', minHeight: '100vh' }}>
      <div style={{ width: '100%', maxWidth: '1200px', margin: '0 auto', padding: '0 var(--space-6)' }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 1, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)', marginBottom: 'var(--space-6)' }}>
            <GlyphStrip active pattern="pulse" speed={1.5} style={{ width: '120px', height: '4px' }} />
            <span className="label" style={{ color: 'var(--accent)' }}>PROJECT REGISTRY LOADED</span>
          </div>

          <motion.h1
            className="display-sm"
            initial={{ opacity: 1, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
            style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 'clamp(2rem, 6vw, 3.5rem)', lineHeight: 1, letterSpacing: '-0.03em', textTransform: 'uppercase' }}
          >
            Selected work
          </motion.h1>
        </motion.div>

        {/* Filter Tabs - Hardware Switch Style */}
        <motion.div
          className="tabs"
          initial={{ opacity: 1, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
          style={{
            display: 'inline-flex',
            gap: 'var(--space-2)',
            padding: 'var(--space-2)',
            background: 'var(--bg-elevated)',
            border: '1px solid var(--border)',
            borderRadius: 'var(--radius-md)',
            marginBottom: 'var(--space-10)',
            position: 'relative',
          }}
        >
          {/* Active indicator */}
          <motion.div
            style={{
              position: 'absolute',
              top: 'var(--space-2)',
              bottom: 'var(--space-2)',
              left: 'var(--space-2)',
              width: 'calc(100% / 3 - var(--space-4))',
              background: 'var(--accent)',
              borderRadius: 'var(--radius-sm)',
              transition: 'transform var(--transition-base), left var(--transition-base)',
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
                fontFamily: 'var(--font-ui)',
                fontSize: '0.75rem',
                fontWeight: 500,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                padding: 'var(--space-2) var(--space-5)',
                borderRadius: 'var(--radius-sm)',
                background: 'none',
                border: 'none',
                color: filter === tab.id ? '#fff' : 'var(--fg-muted)',
                cursor: 'pointer',
                transition: 'color var(--transition-fast)',
              }}
            >
              {tab.label}
            </button>
          ))}
        </motion.div>

        {/* Glyph Progress Bar */}
        <motion.div
          initial={{ opacity: 1, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ delay: 0.3, duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          style={{ marginBottom: 'var(--space-10)' }}
        >
          <GlyphStrip active pattern="fill" speed={0.3} style={{ width: '100%', maxWidth: '400px', height: '4px' }} />
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          layout
          className="proj-grid"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.3 }}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 'var(--space-5)',
          }}
        >
          <AnimatePresence mode="popLayout">
            {list.map((p) => (
              <motion.article
                layout
                key={p.title}
                className="card card-hover"
                data-project
                initial={{ opacity: 1, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9, x: -20 }}
                whileHover={{ y: -8 }}
                transition={{ type: 'spring', stiffness: 300, damping: 22 }}
                style={{
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                {/* Project Image */}
                <div className="proj-img" style={{ aspectRatio: '16/9', overflow: 'hidden', position: 'relative', background: 'var(--bg-elevated)' }}>
                  <img
                    src={p.img}
                    alt={p.title}
                    loading="lazy"
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      objectPosition: 'top',
                      transition: 'transform 0.6s cubic-bezier(0.2, 0.7, 0.2, 1)',
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
                    }}
                  >
                    <div style={{ display: 'flex', gap: 'var(--space-2)', flexWrap: 'wrap' }}>
                      {p.tags.map((t) => (
                        <span key={t} className="tag tag-accent" style={{ fontSize: '0.625rem' }}>
                          {t}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                </div>

                {/* Project Info */}
                <div className="proj-info" style={{ padding: 'var(--space-5)', display: 'flex', flexDirection: 'column', gap: 'var(--space-3)', flex: 1 }}>
                  <div className="tags" style={{ display: 'flex', gap: 'var(--space-2)', flexWrap: 'wrap' }}>
                    {p.tags.map((t) => (
                      <span key={t} className="tag" style={{ fontSize: '0.625rem' }}>{t}</span>
                    ))}
                  </div>
                  <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 500, fontSize: '1.125rem', lineHeight: 1.2, letterSpacing: '-0.01em', textTransform: 'uppercase' }}>
                    {p.title}
                  </h3>
                  <p style={{ fontFamily: 'var(--font-ui)', fontSize: '0.875rem', lineHeight: 1.6, color: 'var(--fg-muted)' }}>
                    {p.desc}
                  </p>
                  <div style={{ marginTop: 'auto', paddingTop: 'var(--space-3)', borderTop: '1px solid var(--hairline)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span className="label" style={{ color: 'var(--accent)' }}>{p.filter === 'web' ? 'WEB.MODULE' : 'DESIGN.MODULE'}</span>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--fg-muted)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ transition: 'stroke var(--transition-fast), transform var(--transition-fast)' }}>
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
              color: 'var(--fg-muted)',
            }}
          >
            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginBottom: 'var(--space-4)', opacity: 0.3 }}>
              <rect x="2" y="3" width="20" height="14" rx="2" />
              <path d="M8 21h8" />
              <path d="M12 17v4" />
            </svg>
            <p className="h3" style={{ marginBottom: 'var(--space-2)' }}>NO MODULES FOUND</p>
            <p className="body">Adjust your filter to view available projects.</p>
          </motion.div>
        )}
      </div>
    </div>
  );
}