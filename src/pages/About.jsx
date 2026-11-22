import { useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import gsap from 'gsap';
import { GlyphStrip, Count, Card } from '../components/ui';

gsap.registerPlugin(ScrollTrigger);

const skills = [
  { icon: 'cpu', label: 'FRONTEND', desc: 'React, Vue.js, Next.js, TypeScript, Tailwind CSS', module: 'UI.ENGINE' },
  { icon: 'server', label: 'BACKEND', desc: 'Node.js, Express, Python, Django, REST APIs', module: 'CORE.LOGIC' },
  { icon: 'database', label: 'DATABASE', desc: 'PostgreSQL, MongoDB, MySQL, Firebase', module: 'DATA.STORE' },
  { icon: 'cloud', label: 'DEVOPS', desc: 'AWS, Docker, CI/CD, Git, Linux', module: 'DEPLOY.SYS' },
];

const SkillIcons = {
  cpu: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="4" y="4" width="16" height="16" rx="2" />
      <rect x="9" y="9" width="6" height="6" />
      <line x1="9" y1="1" x2="9" y2="4" />
      <line x1="15" y1="1" x2="15" y2="4" />
      <line x1="9" y1="20" x2="9" y2="23" />
      <line x1="15" y1="20" x2="15" y2="23" />
      <line x1="1" y1="9" x2="4" y2="9" />
      <line x1="20" y1="9" x2="23" y2="9" />
      <line x1="1" y1="15" x2="4" y2="15" />
      <line x1="20" y1="15" x2="23" y2="15" />
    </svg>
  ),
  server: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="2" width="20" height="8" rx="2" />
      <rect x="2" y="14" width="20" height="8" rx="2" />
      <line x1="6" y1="6" x2="6.01" y2="6" />
      <line x1="6" y1="18" x2="6.01" y2="18" />
      <line x1="12" y1="6" x2="12.01" y2="6" />
      <line x1="12" y1="18" x2="12.01" y2="18" />
      <line x1="18" y1="6" x2="18.01" y2="6" />
      <line x1="18" y1="18" x2="18.01" y2="18" />
    </svg>
  ),
  database: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <ellipse cx="12" cy="5" rx="9" ry="3" />
      <path d="M3 5V19A9 3 0 0 0 21 19V5" />
      <line x1="3" y1="12" x2="21" y2="12" />
    </svg>
  ),
  cloud: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" />
    </svg>
  ),
};

export default function About() {
  // Animate skills on scroll
  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.batch('[data-skill]', {
        start: 'top 85%',
        once: true,
        onEnter: (els) =>
          gsap.fromTo(els, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, ease: 'power3.out', stagger: 0.08 }),
      });
      ScrollTrigger.batch('[data-stat]', {
        start: 'top 85%',
        once: true,
        onEnter: (els) =>
          gsap.fromTo(els, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out', stagger: 0.1 }),
      });
    });
    return () => ctx.revert();
  }, []);

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
    <div className="page" style={{ paddingTop: '120px', paddingBottom: 'var(--space-20)', minHeight: '100vh' }}>
      <div className="container">
        {/* Header */}
        <motion.div
          className="rise"
          initial={{ opacity: 1, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)', marginBottom: 'var(--space-6)' }}>
            <GlyphStrip active pattern="pulse" speed={1.5} style={{ width: '120px', height: '4px' }} />
            <span className="label" style={{ color: 'var(--red)' }}>MODULE REGISTRY ACTIVE</span>
          </div>

          <motion.h1
            className="display-lg"
            initial={{ opacity: 1, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
            style={{ maxWidth: '28ch' }}
          >
            A developer who codes with passion.
          </motion.h1>
        </motion.div>

        {/* About Grid - 6 column grid */}
        <motion.div
          className="grid grid-cols-6 rise"
          initial={{ opacity: 1, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          style={{ marginTop: 'var(--space-8)', gap: '14px' }}
        >
          {/* Photo Card - s3 */}
          <figure className="card s3" style={{ margin: 0, aspectRatio: '3/4', overflow: 'hidden', position: 'relative', background: 'var(--surface)', maxWidth: '320px', marginLeft: 'auto', marginRight: 'auto', minHeight: 'auto', padding: '0' }}>
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, var(--surface) 0%, var(--bg) 100%)', zIndex: 0 }}>
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '3px',
                background: 'linear-gradient(90deg, transparent, var(--red), transparent)',
                opacity: 0.6,
              }} />
            </div>
            <div style={{ position: 'relative', zIndex: 1, height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
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
                  loading="lazy"
                />
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(180deg, transparent 40%, rgba(0,0,0,0.3) 100%)',
                  pointerEvents: 'none',
                }} />
                <span className="label" style={{ position: 'absolute', bottom: 'var(--space-4)', left: 'var(--space-4)', color: 'var(--mute)', zIndex: 1 }}>DEVELOPER.UNIT</span>
              </div>
            </div>
          </figure>

          {/* About Text & Stats - s2 */}
          <div className="card s2" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
            <div>
              <h2 className="h1">About</h2>
              <p style={{ marginTop: '10px', color: 'var(--mute)' }}>I'm a full-stack developer with expertise in creating modern web applications. My journey in tech started years ago, and since then I've been constantly learning and evolving to stay at the cutting edge of technology.</p>
            </div>
            <div className="bento tight" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '8px' }} role="list">
              <div className="card-padded" style={{ background: 'var(--bg)', borderRadius: 'var(--radius-xl)', textAlign: 'center', padding: 'var(--space-4)' }}>
                <motion.b style={{ fontFamily: 'var(--dot)', fontWeight: 900, fontSize: 'clamp(2rem, 5vw, 3rem)', lineHeight: 1 }}>
                  <Count to={2} />
                </motion.b>
                <span className="label">YEARS EXPERIENCE</span>
              </div>
              <div className="card-padded" style={{ background: 'var(--bg)', borderRadius: 'var(--radius-xl)', textAlign: 'center', padding: 'var(--space-4)' }}>
                <motion.b style={{ fontFamily: 'var(--dot)', fontWeight: 900, fontSize: 'clamp(2rem, 5vw, 3rem)', lineHeight: 1 }}>
                  <Count to={5} />
                </motion.b>
                <span className="label">PROJECTS DONE</span>
              </div>
              <div className="card-padded" style={{ background: 'var(--bg)', borderRadius: 'var(--radius-xl)', textAlign: 'center', padding: 'var(--space-4)' }}>
                <motion.b style={{ fontFamily: 'var(--dot)', fontWeight: 900, fontSize: 'clamp(2rem, 5vw, 3rem)', lineHeight: 1 }}>
                  <Count to={1} />
                </motion.b>
                <span className="label">ACTIVE CLIENT</span>
              </div>
              <div className="card-padded" style={{ background: 'var(--bg)', borderRadius: 'var(--radius-xl)', textAlign: 'center', padding: 'var(--space-4)' }}>
                <motion.b style={{ fontFamily: 'var(--dot)', fontWeight: 900, fontSize: 'clamp(2rem, 5vw, 3rem)', lineHeight: 1 }}>
                  <Count to={10} />
                </motion.b>
                <span className="label">MODULES BUILT</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Skills Section */}
        <motion.section
          className="rise"
          initial={{ opacity: 1, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          style={{ marginTop: 'var(--space-16)' }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 'var(--space-8)', flexWrap: 'wrap', gap: 'var(--space-4)' }}>
            <motion.h2 className="h1">What I work with</motion.h2>
            <GlyphStrip active pattern="binary" speed={1} style={{ width: '200px', height: '4px', flexShrink: 0 }} />
          </div>

          <div className="grid grid-cols-6" style={{ gap: '14px' }}>
            {skills.map((s) => (
              <motion.article
                key={s.label}
                className="card card-hover s3"
                data-skill
                role="listitem"
                whileHover={{ y: -8 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                style={{
                  padding: '24px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 'var(--space-4)',
                  position: 'relative',
                  overflow: 'hidden',
                  minHeight: 'auto',
                }}
              >
                {/* Top accent line */}
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  height: '2px',
                  background: 'linear-gradient(90deg, transparent, var(--red), transparent)',
                  opacity: 0,
                  transition: 'opacity var(--transition-base)',
                }} />

                <div style={{ display: 'grid', placeItems: 'center', width: '48px', height: '48px', borderRadius: 'var(--radius-md)', background: 'var(--bg)', border: '1px solid var(--line)', color: 'var(--red)' }}>
                  {SkillIcons[s.icon]}
                </div>

                <div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 'var(--space-2)' }}>
                    <h3 style={{ fontFamily: 'var(--sans)', fontWeight: 500, fontSize: 'var(--text-xl)', lineHeight: 1.2, textTransform: 'uppercase', letterSpacing: 'var(--tracking-tight)' }}>
                      {s.label}
                    </h3>
                    <span className="label" style={{ fontSize: 'var(--text-xs)', color: 'var(--red)' }}>{s.module}</span>
                  </div>
                  <p style={{ fontFamily: 'var(--sans)', fontSize: 'var(--text-sm)', lineHeight: 'var(--leading-normal)', color: 'var(--mute)' }}>{s.desc}</p>
                </div>
              </motion.article>
            ))}
          </div>
        </motion.section>
      </div>
    </div>
  );
}